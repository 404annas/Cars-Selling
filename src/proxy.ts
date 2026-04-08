import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth.constants";

// Protect these path prefixes
// Explicitly exclude /api/auth/** so the internal fetch to /api/auth/me
// from inside this proxy does NOT get intercepted (which would cause a loop).
export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  // Allow the login page through — no auth needed
  if (pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // No cookie → redirect to login
  if (!token) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("from", normalizedPath);
    return NextResponse.redirect(loginUrl);
  }

  // ── Lightweight token check ──────────────────────────────────────────────
  // Middleware runs on the Edge — we can't call mongoose here.
  // Instead we call our own /api/auth/me endpoint which handles the DB check.
  // For /api/admin/** we return 401 JSON instead of redirecting.
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const meUrl = new URL("/api/auth/me", request.url);
    const meRes = await fetch(meUrl.toString(), {
      headers: { Cookie: `${SESSION_COOKIE}=${token}` },
    });

    if (!meRes.ok) {
      // API admin routes → 401 JSON
      if (normalizedPath.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Dashboard pages → redirect to login
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("from", normalizedPath);
      return NextResponse.redirect(loginUrl);
    }

    // Valid session — attach user id header for downstream route handlers
    const { user } = await meRes.json();
    const response = NextResponse.next();
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-role", user.role);
    return response;
  } catch {
    // On validation error, reject the request
    if (normalizedPath.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

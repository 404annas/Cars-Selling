/**
 * src/lib/auth.ts
 * Session cookie helpers — set, get, clear.
 * Used by API routes (login/logout/me) and middleware.
 */

import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Session from "@/lib/models/Session.model";
import User, { IUser } from "@/lib/models/User.model";
import { SESSION_COOKIE } from "@/lib/auth.constants";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// ── Write session cookie ───────────────────────────────────────────────────

export async function createSession(userId: string): Promise<string> {
  await connectDB();

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

  await Session.create({ userId, token, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

// ── Read & validate session cookie ────────────────────────────────────────

export async function getSessionUser(): Promise<IUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    await connectDB();

    const session = await Session.findOne({
      token,
      expiresAt: { $gt: new Date() },
    }).lean();

    if (!session) return null;

    const user = await User.findById(session.userId).lean();
    return user as IUser | null;
  } catch {
    return null;
  }
}

// ── Clear session cookie ───────────────────────────────────────────────────

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await connectDB();
    await Session.deleteOne({ token });
  }

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}

// ── Validate raw token (used in middleware — no cookies() API available) ───

export async function validateToken(token: string): Promise<boolean> {
  try {
    await connectDB();
    const session = await Session.findOne({
      token,
      expiresAt: { $gt: new Date() },
    }).lean();
    return !!session;
  } catch {
    return false;
  }
}

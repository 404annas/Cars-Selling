"use client";

import Link from "next/link";
import { useAdminLogin } from "@/hooks/useAdminLogin";

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#f23410]";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-zinc-400";
const buttonClass =
  "w-full rounded-lg bg-[#f23410] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d92c0d] disabled:cursor-not-allowed disabled:opacity-60";

export default function LoginClient() {
  const {
    checkingSession,
    email,
    handleLogin,
    message,
    password,
    setEmail,
    setPassword,
    submitting,
  } = useAdminLogin();

  if (checkingSession) {
    return <div className="min-h-screen bg-black px-4 py-16 text-white">Checking session...</div>;
  }

  return (
    <main className="min-h-screen bg-black px-4 py-16 text-white">
      <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-2xl border border-[#f23410] p-6">
        <p className="mb-2 text-sm text-zinc-400">Elite Motor Cars</p>
        <h1 className="orb mb-6 text-3xl font-bold text-[#f23410]">Admin Login</h1>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className={labelClass}>Email</span>
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className={labelClass}>Password</span>
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {message ? <p className="text-sm text-[#f23410]">{message}</p> : null}

          <button className={buttonClass} disabled={submitting} type="submit">
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <Link href="/" className="block text-center text-sm text-zinc-400 hover:text-[#f23410]">
            Back to website
          </Link>
        </div>
      </form>
    </main>
  );
}

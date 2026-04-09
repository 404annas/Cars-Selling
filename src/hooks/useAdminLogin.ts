"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, login } from "@/lib/api";

export function useAdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        await getCurrentUser();
        if (mounted) router.replace("/dashboard");
      } catch {
        if (mounted) setCheckingSession(false);
      }
    }

    void checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await login(email, password);
      setPassword("");
      router.replace("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    checkingSession,
    email,
    handleLogin,
    message,
    password,
    setEmail,
    setPassword,
    submitting,
  };
}

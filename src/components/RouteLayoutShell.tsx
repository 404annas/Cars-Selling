"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar2 from "@/components/Navbar2";
import Process from "@/components/Process";
import Assistance from "@/components/Assistance";
import Footer2 from "@/components/Footer2";
import Bot from "@/components/Bot";

export default function RouteLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar2 />
      </Suspense>
      {children}
      <Process />
      <Assistance />
      <Footer2 />
      <Bot />
    </>
  );
}

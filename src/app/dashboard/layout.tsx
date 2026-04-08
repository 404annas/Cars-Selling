import { getSessionUser } from "@/lib/auth";
import DashboardSidebar from "./DashboardSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login route is nested under /dashboard, so avoid redirecting here.
  // Route protection is handled by proxy + page-level guards.
  const user = await getSessionUser();
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <DashboardSidebar
        user={{ name: user.name, email: user.email, role: user.role }}
      />
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

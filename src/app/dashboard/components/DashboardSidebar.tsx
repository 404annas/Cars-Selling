import { ExternalLink, LayoutDashboard, LogOut, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpeg";
import { ghostButtonClass } from "./dashboardStyles";
import type { DashboardShellUser } from "./dashboardTypes";

type DashboardSidebarProps = {
  handleLogout: () => Promise<void>;
  openCreateForm: () => void;
  user: DashboardShellUser;
};

export function DashboardSidebar({
  handleLogout,
  openCreateForm,
  user,
}: DashboardSidebarProps) {
  return (
    <aside className="border-b border-zinc-800 bg-zinc-950 px-4 py-5 lg:border-b-0 lg:border-r">
      <div className="mb-8 flex items-center gap-3">
        <Image
          src={logo}
          alt="Elite Motor Cars Logo"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
          priority
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Elite Motor Cars
          </p>
          <h1 className="orb mt-1 text-2xl font-bold text-[#f23410]">
            Admin Panel
          </h1>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        <button className="flex items-center gap-3 rounded-lg bg-[#f23410] px-4 py-3 text-sm font-semibold text-white">
          <LayoutDashboard size={18} />
          Garage
        </button>
        <button
          className={ghostButtonClass + " flex items-center gap-3"}
          onClick={openCreateForm}
        >
          <Plus size={18} />
          Add Car
        </button>
        <Link className={ghostButtonClass + " flex items-center gap-3"} href="/">
          <ExternalLink size={18} />
          Back to Website
        </Link>
      </nav>

      <div className="mt-8 hidden rounded-xl border border-zinc-800 p-4 lg:block">
        <p className="text-xs text-zinc-500">Signed in as</p>
        <p className="mt-1 break-all text-sm text-zinc-200">{user.email}</p>
        <button
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-[#f23410]"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

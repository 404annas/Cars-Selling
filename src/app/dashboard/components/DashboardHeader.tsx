import { ExternalLink, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { buttonClass, ghostButtonClass } from "./dashboardStyles";
import type { DashboardStats } from "./dashboardTypes";

type DashboardHeaderProps = {
  handleLogout: () => Promise<void>;
  openCreateForm: () => void;
  stats: DashboardStats;
};

export function DashboardHeader({
  handleLogout,
  openCreateForm,
  stats,
}: DashboardHeaderProps) {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Dashboard</p>
          <h2 className="orb text-3xl font-bold text-[#f23410]">Garage</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={buttonClass + " flex items-center gap-2"}
            onClick={openCreateForm}
          >
            <Plus size={18} />
            Add New Car
          </button>
          <button
            className={ghostButtonClass + " flex items-center gap-2 lg:hidden"}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
          <Link
            className={ghostButtonClass + " flex items-center gap-2 lg:hidden"}
            href="/"
          >
            <ExternalLink size={16} />
            Website
          </Link>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Object.entries(stats).map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <p className="text-xs uppercase text-zinc-500">{label}</p>
            <p className="orb text-3xl font-bold text-[#f23410]">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

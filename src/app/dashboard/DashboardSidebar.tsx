"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Props {
  user: { name: string; email: string; role: string };
}

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/cars", label: "Car Listings", icon: Car },
  { href: "/dashboard/cars/new", label: "Add New Car", icon: PlusCircle },
];

export default function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <aside className="w-64 min-h-screen bg-white/3 border-r border-white/8 flex flex-col sticky top-0">
      {/* Brand */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
            <Image
              src="/assets/logo.jpeg"
              alt="EMC"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold leading-tight truncate">Elite Motor Cars</p>
            <p className="text-gray-500 text-xs">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${active
                  ? "bg-[#f23410] text-white shadow-lg shadow-[#f23410]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-70" />}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="pt-3 pb-1">
          <div className="border-t border-white/8" />
        </div>

        {/* View live site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="flex-1">View Live Site</span>
        </a>
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/8 space-y-2">
        <div className="px-3 py-2">
          <p className="text-white text-sm font-semibold truncate">{user.name}</p>
          <p className="text-gray-500 text-xs truncate">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#f23410] bg-[#f23410]/10 px-2 py-0.5 rounded-full">
            {user.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

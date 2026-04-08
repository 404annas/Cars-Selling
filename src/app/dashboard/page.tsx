import { getSessionUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Car as CarIcon,
  CheckCircle,
  XCircle,
  Star,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  await connectDB();
  const [total, available, sold, featured] = await Promise.all([
    Car.countDocuments(),
    Car.countDocuments({ status: "available" }),
    Car.countDocuments({ status: "sold" }),
    Car.countDocuments({ isFeatured: true }),
  ]);
  const recent = await Car.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name status priceAUD thumbnailUrl createdAt slug")
    .lean();
  return { total, available, sold, featured, recent };
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/dashboard/login");

  const stats = await getStats();

  const statCards = [
    {
      label: "Total Cars",
      value: stats.total,
      icon: CarIcon,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Available",
      value: stats.available,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Sold",
      value: stats.sold,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      label: "Featured",
      value: stats.featured,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, {user.name} 👋
          </p>
        </div>
        <Link
          href="/dashboard/cars/new"
          className="flex items-center gap-2 bg-[#f23410] hover:bg-[#d42d0d] text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-all duration-200 hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Car
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/8 rounded-2xl p-5"
          >
            <div
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}
            >
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Listings */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Listings</h2>
          <Link
            href="/dashboard/cars"
            className="text-[#f23410] text-sm hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {stats.recent.map((car) => (
            <div
              key={String(car._id)}
              className="px-6 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800">
                {car.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={car.thumbnailUrl}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <CarIcon className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {car.name}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {car.priceAUD
                    ? `AUD $${car.priceAUD.toLocaleString()}`
                    : "SOLD"}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`
                text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                ${car.status === "available" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}
              `}
              >
                {car.status}
              </span>

              {/* Edit link */}
              <Link
                href={`/dashboard/cars/${String(car._id)}/edit`}
                className="text-gray-500 hover:text-[#f23410] transition-colors ml-2"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/cars"
          className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:border-[#f23410]/30 hover:bg-white/8 transition-all duration-200 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Manage Listings</p>
              <p className="text-gray-400 text-sm mt-1">
                Edit, delete, toggle status
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#f23410] transition-colors" />
          </div>
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:border-[#f23410]/30 hover:bg-white/8 transition-all duration-200 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">View Live Site</p>
              <p className="text-gray-400 text-sm mt-1">
                See how the site looks publicly
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#f23410] transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
}

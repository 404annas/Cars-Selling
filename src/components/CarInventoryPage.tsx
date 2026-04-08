"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Cog, Settings } from "lucide-react";
import { useCars } from "@/features/cars/hooks/useCars";
import { getCarDetailRoute, type InventoryRouteType } from "@/lib/carRoutes";

type InventoryFilter = InventoryRouteType;

interface CarInventoryPageProps {
  mode: InventoryRouteType;
}

const getPageTitle = (mode: InventoryRouteType) => {
  if (mode === "available") return "AVAILABLE CARS";
  if (mode === "sold") return "SOLD CARS";
  return "ALL CARS";
};

const filterButtonBaseClass =
  "px-3 py-1 rounded-full border text-sm font-semibold transition-colors cursor-pointer";

export default function CarInventoryPage({ mode }: CarInventoryPageProps) {
  const [activeFilter, setActiveFilter] = useState<InventoryFilter>(
    mode === "all" ? "all" : mode
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [sort, setSort] = useState("sortOrder_asc");

  const statusParam =
    activeFilter === "all"
      ? undefined
      : (activeFilter as "available" | "sold");

  const { data, isLoading, error, isFetching } = useCars({
    status: statusParam,
    q: search || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    fromYear: fromYear ? Number(fromYear) : undefined,
    toYear: toYear ? Number(toYear) : undefined,
    page,
    limit: 9,
    sort,
  });

  const cars = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-orange-800">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-[#f23410] transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#f23410] font-semibold">{getPageTitle(mode)}</span>
        </div>
      </div>

      <section className="px-4 sm:px-10 py-10 bg-black">
        <div className="flex sm:flex-row flex-col gap-3 items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold orb text-[#f23410]">
            {getPageTitle(mode)}
          </h2>
          <div className="flex flex-row-reverse sm:items-center gap-2">
            <p className="text-[#f23410] underline text-sm">
              Showing {cars.length} of {pagination?.total ?? 0} vehicles
            </p>
            {mode === "all" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("all");
                    setPage(1);
                  }}
                  className={`${filterButtonBaseClass} ${
                    activeFilter === "all"
                      ? "bg-[#f23410] text-white border-[#f23410]"
                      : "text-[#f23410] border-[#f23410]/60 hover:border-[#f23410]"
                  }`}
                >
                  All Cars
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("available");
                    setPage(1);
                  }}
                  className={`${filterButtonBaseClass} ${
                    activeFilter === "available"
                      ? "bg-[#f23410] text-white border-[#f23410]"
                      : "text-[#f23410] border-[#f23410]/60 hover:border-[#f23410]"
                  }`}
                >
                  Available Cars
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("sold");
                    setPage(1);
                  }}
                  className={`${filterButtonBaseClass} ${
                    activeFilter === "sold"
                      ? "bg-[#f23410] text-white border-[#f23410]"
                      : "text-[#f23410] border-[#f23410]/60 hover:border-[#f23410]"
                  }`}
                >
                  Sold Cars
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-8">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name/tagline"
            className="lg:col-span-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <input
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            placeholder="Min price"
            type="number"
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <input
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            placeholder="Max price"
            type="number"
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <input
            value={fromYear}
            onChange={(e) => {
              setFromYear(e.target.value);
              setPage(1);
            }}
            placeholder="From year"
            type="number"
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <input
            value={toYear}
            onChange={(e) => {
              setToYear(e.target.value);
              setPage(1);
            }}
            placeholder="To year"
            type="number"
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="mb-8 flex items-center gap-3">
          <label className="text-sm text-gray-300">Sort</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
          >
            <option value="sortOrder_asc">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="year_desc">Year: Newest</option>
            <option value="year_asc">Year: Oldest</option>
            <option value="createdAt_desc">Recently Added</option>
          </select>
          {isFetching && <span className="text-xs text-gray-400">Updating...</span>}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="border border-[#E5E5E5] rounded-2xl p-4 mb-4 animate-pulse"
              >
                <div className="h-[450px] rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error instanceof Error ? error.message : "Failed to load inventory."}
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {cars.map((car) => {
                const sold = car.status === "sold" || car.priceAUD === null;
                const detailHref = getCarDetailRoute(car._id, sold);
                const imageUrl = car.thumbnailUrl || car.images[0] || "";

                return (
                  <div
                    key={car._id}
                    className="border border-[#E5E5E5] rounded-2xl p-4 mb-4 bg-black"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={car.name}
                            fill
                            className="object-cover object-center"
                          />
                        ) : null}
                      </div>
                      <div>
                        <h3 className="font-semibold orb text-base sm:text-lg leading-none text-white">
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-400">{car.tagline}</p>
                      </div>
                    </div>

                    <div className="relative h-[400px] sm:h-[450px] w-full mb-4 rounded-xl overflow-hidden group">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={car.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                        />
                      ) : null}
                    </div>

                    <div className="bg-black text-white rounded-xl p-0 space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-orange-950 rounded-xl py-3 pl-2 pr-1">
                        <div className="flex flex-col items-center gap-1">
                          <Gauge size={22} />
                          <span>{car.specs.mileageKm.toLocaleString()} km</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Cog size={22} />
                          <span>{car.specs.engineDisplacement}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Settings size={22} />
                          <span>{car.specs.transmission}</span>
                        </div>
                      </div>

                      <p className="text-xl orb font-semibold">
                        {sold || car.priceAUD === null
                          ? "SOLD"
                          : `AUD $${car.priceAUD.toLocaleString()}`}
                      </p>

                      <Link href={detailHref}>
                        <button className="w-full bg-[#f23410] text-white py-3 rounded-xl font-medium hover:bg-[#d92c0f] orb transition-all duration-300 cursor-pointer sm:text-base text-sm">
                          SEE DETAILS
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-300">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

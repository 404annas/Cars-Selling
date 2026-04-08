"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Cog, Settings, ShoppingCart, Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";
import { useCars } from "@/features/cars/hooks/useCars";
import type { PublicCar } from "@/features/cars/public.types";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useCars({ limit: 50, sort: "sortOrder_asc" });
  const allCars = useMemo(() => data?.data ?? [], [data]);

  const filteredCars = useMemo(() => {
    const make = searchParams.get("make") || "";
    const model = searchParams.get("model") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const fromYear = searchParams.get("fromYear") || "";
    const toYear = searchParams.get("toYear") || "";
    const searchQuery = searchParams.get("search") || "";

    const hasParams = make || model || minPrice || maxPrice || fromYear || toYear || searchQuery;
    if (!hasParams) return [];

    return allCars.filter((car) => {
      if (make && !car.name.toLowerCase().includes(make.toLowerCase())) return false;
      if (model && !car.name.toLowerCase().includes(model.toLowerCase())) return false;

      const carPrice = car.priceAUD ?? 0;
      if (minPrice && carPrice < Number(minPrice)) return false;
      if (maxPrice && carPrice > Number(maxPrice)) return false;

      const carYear = car.specs.year;
      if (fromYear && fromYear !== "Year" && fromYear !== "Below" && carYear < Number(fromYear)) {
        return false;
      }
      if (toYear && toYear !== "Year" && toYear !== "Below" && carYear > Number(toYear)) {
        return false;
      }

      if (
        searchQuery &&
        !car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !car.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [allCars, searchParams]);

  const hasSearched = useMemo(() => {
    return [
      "make",
      "model",
      "minPrice",
      "maxPrice",
      "fromYear",
      "toYear",
      "search",
    ].some((key) => Boolean(searchParams.get(key)));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-orange-800">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-[#f23410]">
          <Link href="/" className="hover:text-[#f23410] transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#f23410] font-semibold">Search Results</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="bg-black rounded-2xl p-6 border border-orange-800 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SearchIcon className="text-[#f23410]" size={24} />
            <h1 className="text-xl sm:text-2xl font-bold text-[#f23410]">Search Results</h1>
          </div>
          {hasSearched ? (
            <p className="text-gray-400">
              Found <span className="font-bold text-[#f23410]">{filteredCars.length}</span>{" "}
              {filteredCars.length === 1 ? "car" : "cars"} matching your criteria
            </p>
          ) : (
            <p className="text-gray-400">
              No filters applied. Use the search bar above to find your perfect car.
            </p>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-[380px] rounded-2xl border border-gray-300 bg-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-2xl p-6 text-center border border-red-500/40 bg-red-500/10 text-red-300">
            {error instanceof Error ? error.message : "Failed to load cars."}
          </div>
        )}

        {!isLoading && !error && hasSearched && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map((car) => (
              <SearchCard key={car._id} car={car} />
            ))}
          </div>
        )}

        {!isLoading && !error && hasSearched && filteredCars.length === 0 && (
          <div className="bg-black rounded-2xl p-12 text-center shadow-sm border border-orange-800">
            <SearchIcon size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#f23410] mb-2">No Cars Found</h3>
            <p className="text-gray-400 mb-6">
              No cars match your current filters. Try adjusting your search criteria.
            </p>
            <Link href="/cars/list">
              <button className="bg-[#f23410] hover:bg-[#d92c0d] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Browse All Cars
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

function SearchCard({ car }: { car: PublicCar }) {
  const imageUrl = car.thumbnailUrl || car.images[0] || "";
  const sold = car.status === "sold" || car.priceAUD === null;

  return (
    <div className="bg-black rounded-2xl overflow-hidden border border-gray-300">
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image src={imageUrl} alt={car.name} fill className="object-cover" />
        ) : null}
        <div className="absolute top-3 left-3 bg-[#f23410] text-white px-3 py-1 rounded-full text-xs font-bold">
          {sold ? "SOLD" : "In Stock"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#f23410] mb-1 truncate">{car.name}</h3>
        <p className="text-sm text-gray-400 mb-3 truncate">{car.tagline}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-[#f23410]">
            {sold || car.priceAUD === null ? "SOLD" : `AUD $${car.priceAUD.toLocaleString()}`}
          </span>
          {!sold && <span className="text-xs text-gray-400">Excl. Gov Charges</span>}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-orange-50 p-2 rounded-lg text-center">
            <Gauge size={16} className="mx-auto mb-1 text-gray-700" />
            <p className="text-xs text-gray-500 font-medium">
              {car.specs.mileageKm.toLocaleString()} km
            </p>
          </div>
          <div className="bg-orange-50 p-2 rounded-lg text-center">
            <Cog size={16} className="mx-auto mb-1 text-gray-700" />
            <p className="text-xs text-gray-500 font-medium">{car.specs.engineDisplacement}</p>
          </div>
          <div className="bg-orange-50 p-2 rounded-lg text-center">
            <Settings size={16} className="mx-auto mb-1 text-gray-700" />
            <p className="text-xs text-gray-500 font-medium">{car.specs.transmission}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/cars/${car._id}`} className="flex-1">
            <button className="w-full bg-[#f23410] hover:bg-[#d92c0d] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm">
              View Details
            </button>
          </Link>
          <button
            onClick={() => {
              const existingCart =
                typeof window !== "undefined"
                  ? JSON.parse(localStorage.getItem("cart") || "[]")
                  : [];
              const carExists = existingCart.some((item: { id: string }) => item.id === car._id);
              if (!carExists) {
                const updatedCart = [
                  ...existingCart,
                  {
                    id: car._id,
                    name: car.name,
                    price:
                      car.priceAUD === null
                        ? "SOLD"
                        : `AUD $${car.priceAUD.toLocaleString()}`,
                    images: car.images,
                    specs: {
                      year: String(car.specs.year),
                      mileage: `${car.specs.mileageKm.toLocaleString()} km`,
                      fuel: car.specs.fuelType,
                      engine: car.specs.engineDisplacement,
                    },
                  },
                ];
                if (typeof window !== "undefined") {
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                toast.success(`${car.name} has been added to your cart!`, {
                  action: {
                    label: "Go to Cart",
                    onClick: () => (window.location.href = "/cart"),
                  },
                });
              } else {
                toast.error(`${car.name} is already in your cart.`);
              }
            }}
            className="bg-white border-2 border-orange-200 hover:border-orange-500 hover:text-orange-600 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">Loading Search Results...</p>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

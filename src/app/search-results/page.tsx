"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Gauge,
    Cog,
    Settings,
    ShoppingCart,
    Search as SearchIcon
} from "lucide-react";
import { toast } from 'sonner';
import { useCars } from "@/hooks/useCars";
import { getCarDetailRoute, isSoldCar } from "@/lib/carRoutes";
import type { FrontendCar } from "@/types/car";

const SearchResultsContent = () => {
    const searchParams = useSearchParams();
    const filters = useMemo(() => {
        const make = searchParams.get("make") || "";
        const model = searchParams.get("model") || "";
        const minPrice = searchParams.get("minPrice") || "";
        const maxPrice = searchParams.get("maxPrice") || "";
        const fromYear = searchParams.get("fromYear") || "";
        const toYear = searchParams.get("toYear") || "";
        const searchQuery = searchParams.get("search") || "";

        const q = searchQuery || [make, model].filter(Boolean).join(" ");

        return {
            hasParams: Boolean(make || model || minPrice || maxPrice || fromYear || toYear || searchQuery),
            params: {
                status: "available" as const,
                q,
                minPrice,
                maxPrice,
                fromYear: fromYear && fromYear !== "Year" && fromYear !== "Below" ? fromYear : "",
                toYear: toYear && toYear !== "Year" && toYear !== "Below" ? toYear : "",
                limit: 50,
                sort: "sortOrder_asc",
            },
        };
    }, [searchParams]);
    const { data, isLoading, isError, error } = useCars(filters.hasParams ? filters.params : { status: "available", limit: 0 });
    const filteredCars = filters.hasParams ? data?.data ?? [] : [];

    return (
        <div className="min-h-screen bg-black">
            {/* Breadcrumb */}
            <div className="bg-black border-b border-orange-800">
                <div className="container mx-auto px-4 py-4 flex items-center text-sm text-[#f23410]">
                    <Link href="/" className="hover:text-[#f23410] transition">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#f23410] font-semibold">Search Results</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Search Info Header */}
                <div className="bg-black rounded-2xl p-6 border border-orange-800 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <SearchIcon className="text-[#f23410]" size={24} />
                        <h1 className="text-xl sm:text-2xl font-bold text-[#f23410]">Search Results</h1>
                    </div>
                    {filters.hasParams && (
                        <p className="text-gray-400">
                            Found <span className="font-bold text-[#f23410]">{filteredCars.length}</span> {filteredCars.length === 1 ? 'car' : 'cars'} matching your criteria
                        </p>
                    )}
                    {!filters.hasParams && (
                        <p className="text-gray-400">
                            No filters applied. Use the search bar above to find your perfect car.
                        </p>
                    )}
                </div>

                {isLoading && filters.hasParams ? (
                    <div className="rounded-2xl border border-orange-800 p-8 text-center text-gray-400">
                        Loading matching cars...
                    </div>
                ) : null}

                {isError ? (
                    <div className="rounded-2xl border border-orange-800 p-8 text-center">
                        <p className="text-[#f23410]">Unable to load search results.</p>
                        <p className="mt-2 text-sm text-gray-400">{error instanceof Error ? error.message : "Please try again shortly."}</p>
                    </div>
                ) : null}

                {/* Results Grid */}
                {filters.hasParams && !isLoading && !isError && filteredCars.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-black rounded-2xl overflow-hidden border border-gray-300"
                            >
                                {/* Car Image */}
                                <div className="relative h-48 w-full">
                                    <img
                                        src={car.images[0]}
                                        alt={car.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#f23410] text-white px-3 py-1 rounded-full text-xs font-bold">
                                        In Stock
                                    </div>
                                </div>

                                {/* Car Details */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-[#f23410] mb-1 truncate">{car.name}</h3>
                                    <p className="text-sm text-gray-400 mb-3 truncate">{car.tagline}</p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold text-[#f23410]">AUD ${car.price}</span>
                                        <span className="text-xs text-gray-400">Excl. Gov Charges</span>
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="bg-orange-50 p-2 rounded-lg text-center">
                                            <Gauge size={16} className="mx-auto mb-1 text-gray-700" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.mileage}</p>
                                        </div>
                                        <div className="bg-orange-50 p-2 rounded-lg text-center">
                                            <Cog size={16} className="mx-auto mb-1 text-gray-700" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.engine}</p>
                                        </div>
                                        <div className="bg-orange-50 p-2 rounded-lg text-center">
                                            <Settings size={16} className="mx-auto mb-1 text-gray-700" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.transmission}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link href={getCarDetailRoute(car.id, isSoldCar(car))} className="flex-1">
                                            <button className="w-full bg-[#f23410] hover:bg-[#d92c0d] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm">
                                                View Details
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as FrontendCar[];
                                                const carExists = existingCart.some((item) => item.id === car.id);
                                                if (!carExists) {
                                                    const updatedCart = existingCart.concat(car);
                                                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                                                    toast.success(`${car.name} has been added to your cart!`, {
                                                        action: {
                                                            label: 'Go to Cart',
                                                            onClick: () => window.location.href = '/cart',
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
                        ))}
                    </div>
                )}

                {/* No Results */}
                {filters.hasParams && !isLoading && !isError && filteredCars.length === 0 && (
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

export default function SearchResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">Loading Search Results...</p>
            </div>
        }>
            <SearchResultsContent />
        </Suspense>
    );
}

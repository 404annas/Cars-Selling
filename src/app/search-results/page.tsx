"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    Gauge,
    Cog,
    Settings,
    MapPin,
    Phone,
    ShieldCheck,
    ShoppingCart,
    Star,
    Check,
    Search as SearchIcon
} from "lucide-react";
import { toast } from 'sonner';
import { allCars } from "@/data/cars";

interface CarDetails {
    id: number;
    name: string;
    tagline: string;
    price: string;
    description: string;
    specs: {
        mileage: string;
        engine: string;
        transmission: string;
        fuel: string;
        year: string;
        color: string;
    };
    highlights: string[];
    images: any[];
    dealer: string;
    dealerLocation: string;
    license: string;
}

const SearchResultsContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [filteredCars, setFilteredCars] = useState<CarDetails[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const make = searchParams.get("make") || "";
        const model = searchParams.get("model") || "";
        const minPrice = searchParams.get("minPrice") || "";
        const maxPrice = searchParams.get("maxPrice") || "";
        const fromYear = searchParams.get("fromYear") || "";
        const toYear = searchParams.get("toYear") || "";
        const searchQuery = searchParams.get("search") || "";

        // Only filter if there are actual search params
        const hasParams = make || model || minPrice || maxPrice || fromYear || toYear || searchQuery;

        if (hasParams) {
            const filtered = allCars.filter((car) => {
                // Make filter
                if (make && !car.name.toLowerCase().includes(make.toLowerCase())) {
                    return false;
                }

                // Model filter
                if (model && !car.name.toLowerCase().includes(model.toLowerCase())) {
                    return false;
                }

                // Price filter
                const carPrice = parseFloat(car.price.replace(/,/g, ""));
                if (minPrice && carPrice < parseFloat(minPrice)) {
                    return false;
                }
                if (maxPrice && carPrice > parseFloat(maxPrice)) {
                    return false;
                }

                // Year filter
                const carYear = parseInt(car.specs.year);
                if (fromYear && fromYear !== "Year" && fromYear !== "Below") {
                    if (carYear < parseInt(fromYear)) {
                        return false;
                    }
                }
                if (toYear && toYear !== "Year" && toYear !== "Below") {
                    if (carYear > parseInt(toYear)) {
                        return false;
                    }
                }

                // Search query filter (searches in name and tagline)
                if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    !car.tagline.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }

                return true;
            });

            setFilteredCars(filtered);
            setHasSearched(true);
        } else {
            setFilteredCars([]);
            setHasSearched(false);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-semibold">Search Results</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Search Info Header */}
                <div className="bg-white rounded-2xl p-6 border border-gray-300 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <SearchIcon className="text-blue-500" size={24} />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Search Results</h1>
                    </div>
                    {hasSearched && (
                        <p className="text-gray-600">
                            Found <span className="font-bold text-blue-600">{filteredCars.length}</span> {filteredCars.length === 1 ? 'car' : 'cars'} matching your criteria
                        </p>
                    )}
                    {!hasSearched && (
                        <p className="text-gray-600">
                            No filters applied. Use the search bar above to find your perfect car.
                        </p>
                    )}
                </div>

                {/* Results Grid */}
                {hasSearched && filteredCars.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-300"
                            >
                                {/* Car Image */}
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={car.images[0]}
                                        alt={car.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        In Stock
                                    </div>
                                </div>

                                {/* Car Details */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{car.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3 truncate">{car.tagline}</p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold text-blue-600">USD ${car.price}</span>
                                        <span className="text-xs text-gray-400">Excl. Gov Charges</span>
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                                            <Gauge size={16} className="mx-auto mb-1 text-gray-600" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.mileage}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                                            <Cog size={16} className="mx-auto mb-1 text-gray-600" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.engine}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                                            <Settings size={16} className="mx-auto mb-1 text-gray-600" />
                                            <p className="text-xs text-gray-500 font-medium">{car.specs.transmission}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link href={`/cars/${car.id}`} className="flex-1">
                                            <button className="w-full bg-[#050c4e] hover:bg-[#030835] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm">
                                                View Details
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                const existingCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
                                                const carExists = existingCart.some((item: any) => item.id === car.id);
                                                if (!carExists) {
                                                    const updatedCart = [...existingCart, car];
                                                    if (typeof window !== 'undefined') {
                                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                                    }
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
                                            className="bg-white border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 cursor-pointer"
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
                {hasSearched && filteredCars.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                        <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Cars Found</h3>
                        <p className="text-gray-600 mb-6">
                            No cars match your current filters. Try adjusting your search criteria.
                        </p>
                        <Link href="/">
                            <button className="bg-[#050c4e] hover:bg-[#030835] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
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

"use client";

import Link from "next/link";
import {
  Check,
  MapPin,
  Phone,
  ShieldCheck,
  Calendar,
  Gauge,
  Cog,
  Settings,
  Fuel,
  ChevronRight,
  Star,
} from "lucide-react";
import { useCarById } from "@/hooks/useCars";
import { isSoldCar } from "@/lib/carRoutes";
import AddToCartButton from "./AddToCartButton";
import ImageGallery from "./ImageGallery";

export default function CarDetailsContent({ id }: { id: string }) {
  const { data: carData, isLoading, isError, error } = useCarById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pb-10 px-4 pt-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-[500px] rounded-2xl border border-[#f23410] bg-zinc-900" />
            <div className="h-64 rounded-2xl border border-[#f23410] bg-zinc-900" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-96 rounded-2xl border border-[#f23410] bg-zinc-900" />
            <div className="h-52 rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || carData == null) {
    return (
      <div className="h-96 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f23410]">Car Not Found</h2>
          <p className="text-gray-400 mt-3">{error instanceof Error ? error.message : "The requested vehicle could not be loaded."}</p>
        </div>
      </div>
    );
  }

  const sold = isSoldCar(carData);

  return (
    <div className="min-h-screen bg-black pb-10">
      <div className="bg-black border-b border-[#f23410] orb">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-[#f23410] transition">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-[#f23410] font-semibold truncate">{carData.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <ImageGallery images={carData.images} carName={carData.name} isSold={sold} />

            <div className="bg-black rounded-2xl p-6 sm:p-8 shadow-sm border border-[#f23410] mt-8">
              <h3 className="text-xl font-bold orb text-[#f23410] mb-4 flex items-center gap-2">
                Vehicle Overview
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">{carData.description}</p>

              <h4 className="font-bold text-[#f23410] mb-4 orb">Vehicle Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {carData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#f23410]">
                    <span className="mt-1 text-[#f23410] shrink-0">
                      <Check size={18} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black rounded-2xl p-6 sm:p-8 shadow-sm border border-[#f23410]">
              <div className="mb-2 flex items-center gap-3">
                <span className="bg-orange-50 text-[#f23410] px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider">
                  Used / Import
                </span>
                <span className={sold
                  ? "px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider bg-gray-700 text-gray-400"
                  : "px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700"}>
                  {sold ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl orb font-extrabold text-[#f23410] leading-none mb-2">
                {carData.name}
              </h1>
              <p className="text-gray-400 text-sm mb-6">{carData.tagline}</p>

              <div className="flex items-center gap-2 mb-6 border-b border-orange-100 pb-6">
                <h2 className="text-2xl font-bold text-[#f23410] orb">
                  {sold ? "SOLD" : "AUD \u0024" + carData.price}
                </h2>
                {sold ? null : <span className="text-gray-400 font-medium text-sm">Excl. Gov Charges</span>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700"><Gauge size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Mileage</p>
                    <p className="font-semibold orb text-[#f23410]">{carData.specs.mileage}</p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700"><Cog size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Engine</p>
                    <p className="font-semibold orb text-[#f23410]">{carData.specs.engine}</p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700"><Settings size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Transmission</p>
                    <p className="font-semibold orb text-[#f23410]">{carData.specs.transmission}</p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Year</p>
                    <p className="font-semibold orb text-[#f23410]">{carData.specs.year}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 orb">
                <button
                  disabled={sold}
                  className={sold
                    ? "flex-1 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer bg-gray-800 text-gray-500 hover:cursor-not-allowed"
                    : "flex-1 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer bg-[#f23410] hover:bg-[#d92c0d] text-white shadow-sm shadow-orange-200 active:scale-95"}
                >
                  {sold ? "Reserved" : "Reserve Now"}
                </button>
                <AddToCartButton carData={carData} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#241a0b] to-[#4d1f00] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1 orb">{carData.dealer}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star fill="currentColor" size={14} />
                    <Star fill="currentColor" size={14} />
                    <Star fill="currentColor" size={14} />
                    <Star fill="currentColor" size={14} />
                    <Star fill="currentColor" size={14} />
                    <span className="ml-1 text-gray-400">(48+ Reviews)</span>
                  </div>
                </div>
                <div className="bg-white/10 p-3 rounded-full">
                  <ShieldCheck size={32} className="text-[#f23410]" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="shrink-0 text-[#f23410]" size={18} />
                  <p>{carData.dealerLocation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="shrink-0 text-[#f23410]" size={18} />
                  <p>Dealer Licence: {carData.license}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="shrink-0 text-[#f23410]" size={18} />
                  <p>Meticulously Inspected & Fully Compliant</p>
                </div>
              </div>

              <button className="w-full bg-[#f23410]/10 hover:bg-[#f23410]/20 text-white border border-[#f23410]/20 font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 orb">
                <Phone size={18} />
                Contact Dealer
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col items-center text-center">
                <ShieldCheck className="text-[#f23410] mb-2" size={24} />
                <span className="text-xs font-bold text-[#f23410] uppercase orb">3 Year Warranty</span>
                <span className="text-[10px] text-orange-600">Included in price</span>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col items-center text-center">
                <Fuel className="text-orange-500 mb-2" size={24} />
                <span className="text-xs font-bold text-orange-800 uppercase orb">Full Tank</span>
                <span className="text-[10px] text-orange-600">On delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

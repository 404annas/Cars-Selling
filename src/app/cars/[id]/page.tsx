import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
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
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";
import AddToCartButton from "./AddToCartButton";
import ImageGallery from "./ImageGallery";
import type { PublicCar } from "@/features/cars/public.types";

export const revalidate = 120;

type CarParams = {
  params: Promise<{ id: string }>;
};

async function getCar(id: string) {
  await connectDB();
  const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
  return Car.findOne(query).select("-__v").lean();
}

function normalizeCar(raw: Record<string, unknown>): PublicCar {
  return {
    ...(raw as Omit<PublicCar, "_id" | "createdAt" | "updatedAt">),
    _id: String(raw._id),
    createdAt: String(raw.createdAt),
    updatedAt: String(raw.updatedAt),
  };
}

export async function generateMetadata({ params }: CarParams): Promise<Metadata> {
  const { id } = await params;
  const carData = await getCar(id);

  if (!carData) {
    return {
      title: "Car Not Found | Elite Motor Cars",
      description: "This car listing is unavailable.",
    };
  }

  const priceLabel =
    carData.priceAUD === null ? "SOLD" : `AUD $${carData.priceAUD.toLocaleString()}`;
  const description = `${carData.name} - ${carData.tagline}. ${priceLabel}. ${carData.specs.year} ${carData.specs.fuelType}, ${carData.specs.transmission}.`;
  const image = carData.thumbnailUrl || carData.images?.[0] || "";

  return {
    title: `${carData.name} | Elite Motor Cars`,
    description,
    openGraph: {
      title: `${carData.name} | Elite Motor Cars`,
      description,
      images: image ? [{ url: image }] : [],
      type: "website",
    },
  };
}

export default async function CarDetailsPage({ params }: CarParams) {
  const { id } = await params;
  const carData = await getCar(id);

  if (!carData) {
    notFound();
  }

  const car = normalizeCar(carData as Record<string, unknown>);
  const isSold = car.status === "sold" || car.priceAUD === null;

  return (
    <div className="min-h-screen bg-black pb-10">
      <div className="bg-black border-b border-[#f23410] orb">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-[#f23410] transition">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-[#f23410] font-semibold truncate">{car.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <ImageGallery images={car.images} carName={car.name} isSold={isSold} />

            <div className="bg-black rounded-2xl p-6 sm:p-8 shadow-sm border border-[#f23410] mt-8">
              <h3 className="text-xl font-bold orb text-[#f23410] mb-4 flex items-center gap-2">
                Vehicle Overview
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">{car.description}</p>

              <h4 className="font-bold text-[#f23410] mb-4 orb">Vehicle Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(car.highlights ?? []).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#f23410]"
                  >
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
                <span
                  className={`px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider ${
                    isSold ? "bg-gray-700 text-gray-400" : "bg-green-100 text-green-700"
                  }`}
                >
                  {isSold ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl orb font-extrabold text-[#f23410] leading-none mb-2">
                {car.name}
              </h1>
              <p className="text-gray-400 text-sm mb-6">{car.tagline}</p>

              <div className="flex items-center gap-2 mb-6 border-b border-orange-100 pb-6">
                <h2 className="text-2xl font-bold text-[#f23410] orb">
                  {isSold || car.priceAUD === null
                    ? "SOLD"
                    : `AUD $${car.priceAUD.toLocaleString()}`}
                </h2>
                {!isSold && (
                  <span className="text-gray-400 font-medium text-sm">Excl. Gov Charges</span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700">
                    <Gauge size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Mileage</p>
                    <p className="font-semibold orb text-[#f23410]">
                      {car.specs.mileageKm.toLocaleString()} km
                    </p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700">
                    <Cog size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Engine</p>
                    <p className="font-semibold orb text-[#f23410]">
                      {car.specs.engineDisplacement}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700">
                    <Settings size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Transmission</p>
                    <p className="font-semibold orb text-[#f23410]">
                      {car.specs.transmission}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-orange-300 p-2 rounded-lg shadow-sm text-gray-700">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Year</p>
                    <p className="font-semibold orb text-[#f23410]">{car.specs.year}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 orb">
                <button
                  disabled={isSold}
                  className={`flex-1 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
                    isSold
                      ? "bg-gray-800 text-gray-500 hover:cursor-not-allowed"
                      : "bg-[#f23410] hover:bg-[#d92c0d] text-white shadow-sm shadow-orange-200 active:scale-95"
                  }`}
                >
                  {isSold ? "Reserved" : "Reserve Now"}
                </button>
                <AddToCartButton carData={car} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#241a0b] to-[#4d1f00] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1 orb">{car.dealer}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} fill="currentColor" size={14} />
                    ))}
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
                  <p>{car.dealerLocation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="shrink-0 text-[#f23410]" size={18} />
                  <p>Dealer Licence: {car.licenseNumber}</p>
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
                <span className="text-xs font-bold text-[#f23410] uppercase orb">
                  3 Year Warranty
                </span>
                <span className="text-[10px] text-orange-600">Included in price</span>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col items-center text-center">
                <Fuel className="text-orange-500 mb-2" size={24} />
                <span className="text-xs font-bold text-orange-800 uppercase orb">
                  Full Tank
                </span>
                <span className="text-[10px] text-orange-600">On delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

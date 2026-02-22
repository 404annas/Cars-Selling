import Link from "next/link";
import {
  Check,
  MapPin,
  Phone,
  ShieldCheck,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  ChevronRight,
  Star
} from "lucide-react";

// Import the data
import { allCars } from "@/data/cars";
import AddToCartButton from "./AddToCartButton";
import ImageGallery from "./ImageGallery";

// Generate static params for all cars
export function generateStaticParams() {
  return allCars.map((car) => ({
    id: car.id.toString(),
  }));
}

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarPageProps) {
  const { id } = await params;
  const carData = allCars.find((c) => c.id === Number(id));
  const isSold = carData?.price === "SOLD";

  // Handle case where car is not found
  if (!carData) {
    return (
      <div className="h-96 flex items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400">Car Not Found</h2>
      </div>
    );
  }

  const mainImage = carData.images[0];

  return (
    <div className="min-h-screen bg-black pb-10">

      {/* Breadcrumb */}
      <div className="bg-black border-b border-red-800 orb">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-red-600 font-semibold truncate">{carData.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN: IMAGES (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">

            <ImageGallery images={carData.images} carName={carData.name} isSold={isSold} />

            {/* Description Block */}
            <div className="bg-black rounded-2xl p-6 sm:p-8 shadow-sm border border-red-800 mt-8">
              <h3 className="text-xl font-bold orb text-red-600 mb-4 flex items-center gap-2">
                Vehicle Overview
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {carData.description}
              </p>

              <h4 className="font-bold text-red-600 mb-4 orb">Vehicle Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {carData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-red-700">
                    <span className="mt-1 text-red-500 shrink-0">
                      <Check size={18} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & ACTIONS (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Title & Price Card */}
            <div className="bg-black rounded-2xl p-6 sm:p-8 shadow-sm border border-red-800">
              <div className="mb-2 flex items-center gap-3">
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider">
                  Used / Import
                </span>
                <span className={`px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider ${
                  isSold 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {isSold ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl orb font-extrabold text-red-600 leading-none mb-2">
                {carData.name}
              </h1>
              <p className="text-gray-400 text-sm mb-6">{carData.tagline}</p>

              <div className="flex items-center gap-2 mb-6 border-b border-red-100 pb-6">
                <h2 className="text-2xl font-bold text-red-600 orb">
                  {isSold ? "SOLD" : `AUD $${carData.price}`}
                </h2>
                {!isSold && <span className="text-gray-400 font-medium text-sm">Excl. Gov Charges</span>}
              </div>

              {/* Key Specs Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-red-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-red-300 p-2 rounded-lg shadow-sm text-gray-700"><Gauge size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Mileage</p>
                    <p className="font-semibold orb text-red-600">{carData.specs.mileage}</p>
                  </div>
                </div>
                <div className="bg-red-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-red-300 p-2 rounded-lg shadow-sm text-gray-700"><Cog size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Engine</p>
                    <p className="font-semibold orb text-red-600">{carData.specs.engine}</p>
                  </div>
                </div>
                <div className="bg-red-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-red-300 p-2 rounded-lg shadow-sm text-gray-700"><Fuel size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Fuel</p>
                    <p className="font-semibold orb text-red-600">{carData.specs.fuel}</p>
                  </div>
                </div>
                <div className="bg-red-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-red-300 p-2 rounded-lg shadow-sm text-gray-700"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Year</p>
                    <p className="font-semibold orb text-red-600">{carData.specs.year}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 orb">
                <button
                  disabled={isSold}
                  className={`flex-1 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
                    isSold
                      ? 'bg-gray-800 text-gray-500 hover:cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-200 active:scale-95'
                  }`}
                >
                  {isSold ? "Reserved" : "Reserve Now"}
                </button>
                <AddToCartButton carData={carData} />
              </div>
            </div>

            {/* Dealer / Company Info Card */}
            <div className="bg-gradient-to-br from-[#240b0b] to-[#1a0707] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
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
                  <ShieldCheck size={32} className="text-red-400" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="shrink-0 text-red-600" size={18} />
                  <p>{carData.dealerLocation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="shrink-0 text-red-600" size={18} />
                  <p>Dealer Licence: {carData.license}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="shrink-0 text-red-600" size={18} />
                  <p>Meticulously Inspected & Fully Compliant</p>
                </div>
              </div>

              <button className="w-full bg-red/10 hover:bg-red/20 text-white border border-red/20 font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 orb">
                <Phone size={18} />
                Contact Dealer
              </button>
            </div>

            {/* Warranty / Trust Badges */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex flex-col items-center text-center">
                <ShieldCheck className="text-red-600 mb-2" size={24} />
                <span className="text-xs font-bold text-red-800 uppercase orb">3 Year Warranty</span>
                <span className="text-[10px] text-red-600">Included in price</span>
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
};
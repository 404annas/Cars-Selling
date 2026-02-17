"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  ChevronRight,
  Star
} from "lucide-react";
import { toast } from 'sonner';

// Import the data
import { allCars } from "@/data/cars"; // Adjust path if you put the folder elsewhere

const CarDetailsPage = () => {
  const params = useParams();

  // Find the car based on the URL ID
  // Note: params.id comes as a string, so we convert it to Number
  const carData = allCars.find((c) => c.id === Number(params.id));

  // State for Image Gallery
  const [mainImage, setMainImage] = useState(carData ? carData.images[0] : null);

  // Effect: Update main image when carData loads or changes
  useEffect(() => {
    if (carData) {
      setMainImage(carData.images[0]);
    }
  }, [carData]);

  // Handle case where car is not found (optional: show 404 or loading)
  if (!carData || !mainImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-400">Car Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 orb">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-semibold truncate">{carData.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN: IMAGES (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Main Image Stage */}
            <div className="relative w-full h-[510px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <Image
                src={mainImage}
                alt={carData.name}
                fill
                
                className="object-cover object-center transition-all duration-500"
                priority
              />
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md orb">
                In Stock
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {carData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-16 h-26 sm:w-18 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
                    ${mainImage === img ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent opacity-70 hover:opacity-100"}
                  `}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 25vw, 15vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description Block */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mt-8">
              <h3 className="text-xl font-bold orb text-gray-900 mb-4 flex items-center gap-2">
                Vehicle Overview
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {carData.description}
              </p>

              <h4 className="font-bold text-gray-900 mb-4 orb">Vehicle Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {carData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="mt-1 text-blue-500 shrink-0">
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="mb-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md orb text-xs font-bold uppercase tracking-wider">
                  Used / Import
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl orb font-extrabold text-gray-900 leading-none mb-2">
                {carData.name}
              </h1>
              <p className="text-gray-500 text-sm mb-6">{carData.tagline}</p>

              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-blue-600 orb">
                  USD ${carData.price}
                </h2>
                <span className="text-gray-400 font-medium text-sm">Excl. Gov Charges</span>
              </div>

              {/* Key Specs Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-gray-700"><Gauge size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Mileage</p>
                    <p className="font-semibold orb text-gray-900">{carData.specs.mileage}</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-gray-700"><Cog size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Engine</p>
                    <p className="font-semibold orb text-gray-900">{carData.specs.engine}</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-gray-700"><Fuel size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Fuel</p>
                    <p className="font-semibold orb text-gray-900">{carData.specs.fuel}</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-gray-700"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Year</p>
                    <p className="font-semibold orb text-gray-900">{carData.specs.year}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 orb">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 cursor-pointer">
                  Reserve Now
                </button>
                <button 
                  onClick={() => {
                    // Get existing cart items from localStorage or initialize empty array
                    const existingCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
                    
                    // Check if the car is already in the cart
                    const carExists = existingCart.some((item: any) => item.id === carData.id);
                    
                    if (!carExists) {
                      // Add the car to the cart
                      const updatedCart = [...existingCart, carData];
                      
                      // Save updated cart to localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                      }
                      
                      toast.success(`${carData.name} has been added to your cart!`, {
                        action: {
                          label: 'Go to Cart',
                          onClick: () => window.location.href = '/cart',
                        },
                      });
                    } else {
                      toast.error(`${carData.name} is already in your cart.`);
                    }
                  }}
                  className="flex-1 bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-bold py-4 rounded-lg transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Dealer / Company Info Card */}
            <div className="bg-gradient-to-br from-[#0B1324] to-[#070E1A] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
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
                  <ShieldCheck size={32} className="text-blue-400" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="shrink-0 text-blue-500" size={18} />
                  <p>{carData.dealerLocation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="shrink-0 text-blue-500" size={18} />
                  <p>Dealer Licence: {carData.license}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="shrink-0 text-blue-500" size={18} />
                  <p>Meticulously Inspected & Fully Compliant</p>
                </div>
              </div>

              <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 orb">
                <Phone size={18} />
                Contact Dealer
              </button>
            </div>

            {/* Warranty / Trust Badges */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col items-center text-center">
                <ShieldCheck className="text-blue-600 mb-2" size={24} />
                <span className="text-xs font-bold text-blue-800 uppercase orb">3 Year Warranty</span>
                <span className="text-[10px] text-blue-600">Included in price</span>
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

export default CarDetailsPage;
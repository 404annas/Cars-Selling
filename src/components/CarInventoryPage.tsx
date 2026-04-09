"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Cog, Settings } from "lucide-react";
import { allCars } from "@/data/cars";
import {
  getCarDetailRoute,
  isSoldCar,
  type InventoryRouteType,
} from "@/lib/carRoutes";

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
  const availableCars = allCars
    .filter((car) => !isSoldCar(car.price))
    .sort((a, b) => a.id - b.id);
  const soldCars = allCars
    .filter((car) => isSoldCar(car.price))
    .sort((a, b) => a.id - b.id);
  const [activeFilter, setActiveFilter] = useState<InventoryFilter>(
    mode === "all" ? "all" : mode,
  );

  const filteredCars =
    activeFilter === "available"
      ? availableCars
      : activeFilter === "sold"
        ? soldCars
        : [...availableCars, ...soldCars];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-orange-800">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-[#f23410] transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#f23410] font-semibold">
            {getPageTitle(mode)}
          </span>
        </div>
      </div>

      <section className="px-4 sm:px-10 py-10 bg-black">
        <div className="flex sm:flex-row flex-col gap-3 items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold orb text-[#f23410]">
            {getPageTitle(mode)}
          </h2>
          <div className="flex flex-row-reverse sm:items-center gap-2">
            <p className="text-[#f23410] underline text-sm">
              Showing all {filteredCars.length} vehicles
            </p>
            {mode === "all" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
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
                  onClick={() => setActiveFilter("available")}
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
                  onClick={() => setActiveFilter("sold")}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {filteredCars.map((car) => {
            const sold = isSoldCar(car.price);
            const detailHref = getCarDetailRoute(car.id, sold);

            return (
              <div
                key={car.id}
                className="border border-[#E5E5E5] rounded-2xl p-4 mb-4 bg-black"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold orb text-base sm:text-lg leading-none text-white">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-400">{car.tagline}</p>
                  </div>
                </div>

                <div className="relative h-[400px] sm:h-[450px] w-full mb-4 rounded-xl overflow-hidden group">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                  />
                </div>

                <div className="bg-black text-white rounded-xl p-0 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-orange-950 rounded-xl py-3 pl-2 pr-1">
                    <div className="flex flex-col items-center gap-1">
                      <Gauge size={22} />
                      <span>{car.specs.mileage}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Cog size={22} />
                      <span>{car.specs.engine}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Settings size={22} />
                      <span>{car.specs.transmission}</span>
                    </div>
                  </div>

                  <p className="text-xl orb font-semibold">
                    {sold ? "SOLD" : `AUD $${car.price}`}
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
      </section>
    </div>
  );
}

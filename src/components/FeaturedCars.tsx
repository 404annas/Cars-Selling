"use client";

import Link from "next/link";
import { Gauge, Settings, Cog } from "lucide-react";
import { useFeaturedCars } from "@/hooks/useCars";
import { getCarDetailRoute, getInventoryRoute, isSoldCar } from "@/lib/carRoutes";

const cardClassName = "border border-[#E5E5E5] rounded-2xl p-4 mb-4";

export default function FeaturedCars() {
  const { data: cars = [], isLoading, isError, error } = useFeaturedCars();

  return (
    <section className="px-4 sm:px-10 py-10 bg-black">
      <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold orb text-[#f23410]">
          FEATURED CARS
        </h2>

        <Link href={getInventoryRoute("all")}>
          <button className="bg-[#f23410] text-white px-6 py-3 rounded-lg font-medium hover:scale-98 transition-all duration-300 cursor-pointer orb sm:text-base text-sm w-full sm:w-fit">
            SHOW ALL
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={cardClassName + " animate-pulse"}>
              <div className="h-16 rounded-xl bg-zinc-900 mb-4" />
              <div className="h-[400px] sm:h-[450px] rounded-xl bg-zinc-900 mb-4" />
              <div className="h-28 rounded-xl bg-zinc-900" />
            </div>
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="border border-[#E5E5E5] rounded-2xl p-6 text-white">
          <p className="text-lg orb text-[#f23410] mb-2">Unable to load featured cars.</p>
          <p className="text-sm text-gray-400">{error instanceof Error ? error.message : "Please try again shortly."}</p>
        </div>
      ) : null}

      {isLoading === false && isError === false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {cars.slice(0, 6).map((car) => {
            const sold = isSoldCar(car);
            const detailHref = getCarDetailRoute(car.id, sold);

            return (
              <div key={car.id} className={cardClassName}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                    <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover object-center" />
                  </div>
                  <div>
                    <h3 className="font-semibold orb text-base sm:text-lg leading-none text-white">{car.name}</h3>
                    <p className="text-sm text-gray-400">{car.tagline}</p>
                  </div>
                </div>

                <div className="relative h-[400px] sm:h-[450px] w-full mb-4 rounded-xl overflow-hidden group bg-zinc-900">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                  />
                </div>

                <div className="bg-black text-white rounded-xl p-0 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-orange-950 rounded-xl py-3 pl-2 pr-1">
                    <div className="flex flex-col items-center gap-1">
                      <Gauge className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-sm mt-0">{car.specs.mileage}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Cog className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-sm mt-0">{car.specs.engine}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Settings className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-sm mt-0">{car.specs.transmission}</span>
                    </div>
                  </div>

                  <p className="text-xl orb font-semibold">{sold ? "SOLD" : "AUD $" + car.price}</p>

                  <Link href={detailHref}>
                    <button className="w-full bg-[#f23410] text-white py-3 rounded-xl font-medium hover:bg-[#d92c0d] orb transition-all duration-300 cursor-pointer sm:text-base text-sm">
                      SEE DETAILS
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

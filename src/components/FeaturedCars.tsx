"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Settings, Cog } from "lucide-react";
import { getCarDetailRoute, getInventoryRoute } from "@/lib/carRoutes";
import { useFeaturedCars } from "@/features/cars/hooks/useFeaturedCars";

const FeaturedCars = () => {
  const { data: cars = [], isLoading, error } = useFeaturedCars();

  const availableCars = cars.filter((car) => car.status !== "sold").slice(0, 6);

  return (
    <section className="px-4 sm:px-10 py-10 bg-black">
      {/* Header */}
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

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="border border-[#E5E5E5] rounded-2xl p-4 mb-4 animate-pulse"
            >
              <div className="h-[450px] w-full rounded-xl bg-white/10" />
              <div className="mt-4 h-4 w-1/2 rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="border border-red-400/40 bg-red-500/10 text-red-300 rounded-xl p-4">
          {error instanceof Error ? error.message : "Failed to load featured cars."}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {availableCars.map((car) => {
            const detailHref = getCarDetailRoute(
              car._id,
              car.status === "sold" || car.priceAUD === null
            );
            const imageUrl = car.thumbnailUrl || car.images[0] || "";

            const specs = [
              { icon: Gauge, label: `${car.specs.mileageKm.toLocaleString()} km` },
              { icon: Cog, label: car.specs.engineDisplacement },
              { icon: Settings, label: car.specs.transmission },
            ];

            return (
              <div
                key={car._id}
                className="border border-[#E5E5E5] rounded-2xl p-4 mb-4"
              >
                {/* Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
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

                {/* Image */}
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

                {/* Specs */}
                <div className="bg-black text-white rounded-xl p-0 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-orange-950 rounded-xl py-3 pl-2 pr-1">
                    {specs.map((spec, i) => {
                      const Icon = spec.icon;
                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span className="text-sm mt-0">{spec.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price */}
                  <p className="text-xl orb font-semibold">
                    {car.priceAUD === null ? "SOLD" : `AUD $${car.priceAUD.toLocaleString()}`}
                  </p>

                  {/* Button */}
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
      )}
    </section>
  );
};

export default FeaturedCars;

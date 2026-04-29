"use client";
import { useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import carsData from "../../../browse_all_cars.json";

const Page = () => {
  const [displayCount, setDisplayCount] = useState(20);

  const displayedCars = carsData.slice(0, displayCount);
  const hasMoreCars = displayCount < carsData.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 20, carsData.length));
  };

  
  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 md:px-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-none uppercase mb-4 text-[#F23410]">
          Import Cars From Australia
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-normal md:leading-6">
          Elite Motor Cars The Most Trusted Way to Buy and Sell Used Cars in
          Australia Choose from over 10,000 fully inspected second-hand car
          models at Elite Motor Cars.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCars.map((car, index) => (
          <a
            key={index}
            // href={car.link}
            // target="_blank"
            className="group relative bg-zinc-950 border border-zinc-800 hover:border-[#F23410] transition-colors duration-500 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
              <img
                loading="lazy"
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Status Badge */}
              <div className="absolute top-0 right-0 bg-[#F23410] text-black font-bold text-[10px] px-3 py-1 uppercase">
                Available
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-base md:text-lg font-bold leading-tight group-hover:text-[#F23410] transition-colors duration-300">
                  {car.name}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#F23410] transition-all" />
              </div>

              <div className="flex items-center gap-2 text-zinc-500 mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">
                  {car.dates}
                </span>
              </div>

              {/* Bottom Decorative Line */}
              <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-[#F23410]/30 transition-colors" />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider group-hover:text-white transition-colors">
                  View Details
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800 group-hover:bg-[#F23410] transition-colors" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreCars && (
        <div className="max-w-7xl mx-auto flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            className="px-10 py-3 bg-[#F23410] text-white cursor-pointer font-semibold uppercase tracking-wide hover:bg-[#E01D00] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Load More Cars
          </button>
        </div>
      )}

      {/* All Loaded Message */}
      {/* {!hasMoreCars && carsData.length > 0 && (
        <div className="max-w-7xl mx-auto flex justify-center mt-16">
          <p className="text-zinc-500 text-lg uppercase font-semibold">
            All {carsData.length} cars loaded
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Page;

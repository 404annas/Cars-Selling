"use client";
import Image from "next/image";

import heroBottomImg1 from "@/assets/heroB1.svg"; // EV
import heroBottomImg2 from "@/assets/heroB2.svg"; // SUV
import heroBottomImg3 from "@/assets/heroB3.svg"; // Truck
import heroBottomImg4 from "@/assets/heroB4.svg"; // Sedan
import heroBottomImg5 from "@/assets/heroB5.svg"; // Hybrid

const HeroBottom = () => {
  const types = [
    { id: 1, label: "EV", img: heroBottomImg1 },
    { id: 2, label: "SUV", img: heroBottomImg2 },
    { id: 3, label: "Truck", img: heroBottomImg3 },
    { id: 4, label: "Sedan", img: heroBottomImg4 },
    { id: 5, label: "Hybrid", img: heroBottomImg5 },
  ];

  return (
    <section className="bg-white pt-12 pb-10 w-full">
      <div className="container mx-auto px-4 max-w-[1200px]">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-black mb-8 text-center sm:text-left">
          We Deal Into
        </h2>

        {/* Content Wrapper */}
        <div className="relative w-full mt-4">

          {/* THE SHADOW / PLATFORM EFFECT */}
          {/* This div creates the curved light blue ground behind the cars */}
          <div className="absolute bottom-[20%] left-[2%] w-[95%] lg:block hidden h-16 bg-[#fdeaea] rounded-[100%] -z-0 blur-[2px] opacity-80 scale-y-75"></div>

          {/* Icons Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {types.map((type) => (
              <div
                key={type.id}
                className="group flex flex-col items-center justify-end cursor-pointer gap-3 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-16 w-full flex items-end justify-center">
                  <Image
                    src={type.img}
                    alt={type.label}
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* Label */}
                <span className="text-red-700 font-bold text-sm md:text-base border-b-2 border-transparent group-hover:border-red-700 transition-all pb-0.5 duration-300">
                  {type.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBottom;
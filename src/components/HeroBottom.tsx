"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee"; // Import the marquee library

import heroBottomImg1 from "@/assets/audi.png";
import heroBottomImg2 from "@/assets/bmw.png";
import heroBottomImg3 from "@/assets/lexus.png";
import heroBottomImg4 from "@/assets/mercedes.png";
import heroBottomImg5 from "@/assets/mitsubishi.png";
import heroBottomImg6 from "@/assets/honda.png";
import heroBottomImg7 from "@/assets/toyota.png";
import heroBottomImg8 from "@/assets/crown2.png";
import heroBottomImg9 from "@/assets/msports.png";
import heroBottomImg10 from "@/assets/sti.png";

const HeroBottom = () => {
  const types = [
    { id: 1, label: "Audi", img: heroBottomImg1, sizeClass: "w-[120px] h-[90px]" },
    { id: 2, label: "BMW", img: heroBottomImg2, sizeClass: "w-[100px] h-[80px]" },
    { id: 3, label: "Lexus", img: heroBottomImg3, sizeClass: "w-[140px] h-[90px]" },
    { id: 4, label: "Mercedes", img: heroBottomImg4, sizeClass: "w-[100px] h-[80px]", extra: "invert brightness-200" },
    { id: 5, label: "Mitsubishi", img: heroBottomImg5, sizeClass: "w-[130px] h-[90px]" },
    { id: 6, label: "Honda", img: heroBottomImg6, sizeClass: "w-[110px] h-[80px]" },
    { id: 7, label: "Toyota", img: heroBottomImg7, sizeClass: "w-[120px] h-[100px]", extra: "translate-y-2"  },
    { id: 8, label: "Crown", img: heroBottomImg8, sizeClass: "w-[100px] h-[90px]"},
    { id: 9, label: "M Sports", img: heroBottomImg9, sizeClass: "w-[120px] h-[90px]" },
    { id: 10, label: "Sti", img: heroBottomImg10, sizeClass: "w-[150px] h-[100px]" },
  ];

  return (
    <section className="bg-black pt-10 pb-10 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-2 max-w-7xl">
        <h2 className="text-2xl font-bold text-[#f23410] mb-8 text-center sm:text-left">
          We Deal Into
        </h2>

        <div className="relative w-full">
          {/* Shadow platform - Commented out as requested */}
          {/* <div className="absolute bottom-[18%] lg:-translate-x-16 w-[110%] lg:block hidden h-16 bg-[#ff9868] rounded-[100%] -z-0 blur-[2px] opacity-80 scale-y-75"></div> */}

          {/* Marquee Slider */}
          <Marquee 
            speed={60} 
            gradient={false} 
            pauseOnHover={false} 
            direction="left"
          >
            {types.map((type) => (
              <div
                key={type.id}
                className="group flex flex-col items-center justify-end cursor-pointer gap-3 transition-transform duration-300 hover:-translate-y-2 mx-6 sm:mx-8 md:mx-10"
              >
                {/* 1. This container controls the OVERALL height area for the logo */}
                <div className="relative h-28 md:h-30 w-full flex items-end justify-center">
                  
                  {/* 2. This container controls the SPECIFIC size of each car logo */}
                  <div className={`relative ${type.sizeClass}`}>
                    <Image
                      src={type.img}
                      alt={type.label}
                      fill 
                      className={`object-contain transition-all duration-300 ${type.extra || ""}`}
                      sizes="(max-width: 768px) 50vw, 10vw"
                    />
                  </div>
                </div>

                <span className="text-[#f23410] font-bold text-xs md:text-base border-b-2 border-transparent group-hover:border-[#f23410] transition-all pb-0.5 duration-300 lg:mt-2 uppercase">
                  {type.label}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default HeroBottom;
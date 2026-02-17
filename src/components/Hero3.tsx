"use client";
import Image from "next/image";
import heroImg1 from "@/assets/hero1.webp"; // MUST BE RED TRUCK
import heroImg2 from "@/assets/hero2.webp"; // MUST BE LIGHT BLUE SUV
import heroImg3 from "@/assets/hero3.webp"; // MUST BE DARK BLUE SUV

const Hero3 = () => {
    return (
        <section className="bg-[#F7F8FA] pt-10 pb-10 overflow-hidden w-full">
            <div className="w-full flex flex-col items-center">

                {/* --- Heading --- */}
                <div className="container px-4 text-center mb-12 md:mb-10 z-20 relative">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.1]">
                        End-to-End <span className="text-red-600">Imports.</span> Zero Stress. Absolute Confidence. 
                    </h1>
                    <p className="mx-auto max-w-5xl font-medium text-gray-800 pt-4">We don’t just sell cars; we understand the culture behind them. We specialize in importing high-grade vehicles directly from Japan and Europe.</p>
                </div>

                {/* --- Images Row --- */}
                {/* We use w-[120%] to force the side images to bleed off the screen slightly on smaller devices */}
                <div className="flex items-end justify-center w-[120%] md:w-full max-w-[1600px] relative -mb-4">

                    {/* Left Car (Red Truck) - Aligned to the Right of its box */}
                    <div className="flex-1 flex justify-end relative z-0 translate-x-8 md:-translate-x-30">
                        <Image
                            src={heroImg1}
                            alt="Red Truck"
                            className="w-auto h-auto max-w-[150%] sm:max-w-[120%] md:max-w-none md:h-[280px] lg:h-[280px] object-contain object-right scale-x-[-1]"
                            priority
                        />
                    </div>

                    {/* Center Car (Light Blue SUV) - Front and Center */}
                    <div className="shrink-0 w-[45%] md:w-[50%] z-10 relative px-0 md:-translate-x-20">
                        <Image
                            src={heroImg2}
                            alt="Cyan SUV"
                            className="w-auto h-auto max-w-[110%] sm:max-w-[120%] md:max-w-none md:h-[280px] lg:h-[310px] object-contain drop-shadow-xl scale-x-[-1]"
                            priority
                        />
                    </div>

                    {/* Right Car (Dark Blue SUV) - Aligned to the Left of its box */}
                    <div className="flex-1 flex justify-start relative z-0 -translate-x-8 md:translate-x-30">
                        <Image
                            src={heroImg3}
                            alt="Blue SUV"
                            className="w-auto h-auto max-w-[150%] sm:max-w-[120%] md:max-w-none md:h-[280px] lg:h-[280px] object-contain object-left scale-x-[-1]"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero3;
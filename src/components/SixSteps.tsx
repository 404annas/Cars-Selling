"use client";
import React from "react";
import Image from "next/image";
import sixBgImg from "@/assets/sixBg.jpg";
import Link from "next/link";

const SixSteps = () => {
    const steps = [
        { id: 1, title: "The Personal Consultation" },
        { id: 2, title: "Global Search & Selection" },
        { id: 3, title: "Forensic Inspection & Bidding" },
        { id: 4, title: "Secure Shipping & Logistics" },
        { id: 5, title: "Australian Customs & Compliance" },
        { id: 6, title: "Final Detailing & Handover" },
    ];

    return (
        <section className="relative w-full py-10 md:pt-20 pb-14 px-4 2xl:px-10 bg-black overflow-hidden">
            {/* Background Image with Overlay */}
            {/* <div className="absolute inset-0 z-0">
                <Image
                    src={sixBgImg}
                    alt="Background Pattern"
                    fill
                    priority
                    className="object-cover"
                />
            </div> */}

            <div className="px-4 relative z-10">

                {/* Main Heading */}
                <div className="text-center mb-10 2xl:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-[#f23410]">
                        Your Dream Car, Delivered: The 6-Step Sourcing Roadmap
                    </h2>
                </div>

                {/* Steps Row */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 2xl:gap-10 items-center justify-center">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center w-full group">

                            {/* Large Number */}
                            <span className="text-5xl md:text-6xl 2xl:text-7xl font-bold text-[#ff6c3f] mr-3 shrink-0 leading-none">
                                {step.id}
                            </span>

                            {/* The Arrow Box */}
                            {/* We use filter: drop-shadow to apply shadow to the custom shape */}
                            <div
                                className="relative bg-white h-20 w-full flex items-center justify-center px-4 py-2 text-center transition-transform duration-300 hover:-translate-y-1"
                                style={{
                                    clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
                                    filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.05))"
                                }}
                            >
                                <p className="text-[#333] text-xs md:text-[11px] lg:text-xs 2xl:text-4xl font-medium leading-tight pr-2">
                                    {step.title}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
                <Link href={"how-we-deliver"} className="flex items-center justify-center mt-16">
                    <button className="bg-gradient-to-r from-[#f63b3b] to-[#c2411a] text-white font-semibold tracking-wide px-8 2xl:px-14 py-3 2xl:py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer text-base 2xl:text-4xl">
                        How We Deliver
                    </button>
                </Link>
            </div>

        </section>
    );
};

export default SixSteps;
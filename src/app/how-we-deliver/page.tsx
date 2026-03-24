import type { Metadata } from "next";
import React from 'react';
import Image from "next/image";

// Assets import
import work1 from "@/assets/work1.svg";
import work2 from "@/assets/work2.svg";
import work3 from "@/assets/work3.svg";
import work4 from "@/assets/work4.svg";
import work5 from "@/assets/work5.svg";
import line1 from "@/assets/line1.svg";
import line2 from "@/assets/line2.svg";
import Numbers from '@/components/Numbers';

export const metadata: Metadata = {
    title: "How We Deliver – Elite Motor Cars | Safe & Hassle-Free Car Imports to Australia",
    description: "Discover how Elite Motor Cars makes importing cars to Australia simple and secure. From global sourcing to shipping, customs, and delivery, enjoy hassle-free, fully verified car imports with expert support at every step.",
};

const WorkSection = () => {
    const steps = [
        {
            id: "1",
            title: "We Unlock Global Vehicle Access – Find Cars Beyond Australia",
            desc: "Your options are never limited to what’s sitting in Sydney. We tap into wholesale auctions in Japan, specialist dealers in the UK, and exclusive private networks across Europe to source imported cars and rare European vehicles unavailable in the local market.",
            img: work1,
        },
        {
            id: "2",
            title: "We De-Risk Your Car Import – Safe, Transparent, and Fully Compliant",
            desc: "We turn the uncertainty of the grey market into a secure and transparent car import experience. Every vehicle undergoes forensic inspections, auction sheet translations, odometer verification, and full Australian Design Rules (ADR) compliance. This ensures you import cars from Japan, Europe, or the UK with complete confidence, knowing every used car is fully verified and safe to drive in Australia.",
            img: work3,
        },
        {
            id: "3",
            title: "We Handle Logistics & Red Tape – Hassle-Free Car Import to Australia",
            desc: "From the auction floors in Tokyo to your driveway in Australia, Elite Motor Cars manages every step of the process. We take care of shipping, customs clearance, import taxes, insurance, and provide secure door-to-door delivery nationwide. Enjoy a truly hassle-free car import experience, whether you’re bringing in a luxury European vehicle or a specialized import car.",
            img: work2,
        },
        {
            id: "4",
            title: "Expert Curation of Local Stock – Reliable Used Cars You Can Trust",
            desc: "Every vehicle meets the Elite Standard. We conduct rigorous mechanical and cosmetic inspections and leverage real-time market data to ensure transparent, competitive pricing. Whether you’re looking to buy used cars or secure a reliable second-hand vehicle, our carefully curated local stock guarantees quality, value, and peace of mind.",
            img: work4,
        },
        {
            id: "5",
            title: "Post-Sale Support & Community – Protect Your Vehicle’s Long-Term Value",
            desc: "Our relationship with you continues well beyond the sale. We provide expert guidance on maintenance, assist with sourcing OEM and aftermarket parts, and ensure your vehicle retains its long-term value. Whether you’ve purchased a used car, a luxury European vehicle, or a specialized import, our dedicated support and community keep your car performing at its best for years to come.",
            img: work5,
        }
    ];

    return (
        <>
            <section className="py-10 px-4 bg-black overflow-hidden">
                {/* --- Heading Part --- */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f23410] mb-4">
                        More Than Just a Dealership: Your Trusted Automotive Partners
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        At <span className="text-gray-200">Elite Motor Cars</span>, we redefine value by combining access, peace of mind, and simplicity. Whether you want to buy used cars, import cars from Japan or Europe, or invest in a luxury European vehicle, we make the process seamless and risk-free. Our expert team handles all the complexity so you can focus on enjoying the drive of your dream car. Experience hassle-free used car buying with confidence, backed by our trusted service and comprehensive support.
                    </p>
                    <button className="mt-8 border-2 border-[#f23410] text-[#f23410] font-bold py-2 px-8 rounded-lg hover:bg-[#f23410] hover:text-white transition-all text-sm cursor-pointer duration-300">
                        Experience the Elite Difference &gt;
                    </button>
                </div>

                {/* --- Steps Container --- */}
                <div className="max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col">
                            {/* Main Content Row */}
                            {/* md:flex-row aur reverse logic ko lg tak maintain rakha hai, usse niche stacking improve ki hai */}
                            <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24 
                                ${index % 2 !== 0 ? "lg:flex-row-reverse" : "text-center lg:text-left"}`}>

                                {/* Text Side with Hollow Number */}
                                <div className="flex-1 relative group w-full">
                                    {/* Responsive Numbers: Mobile par size chhota aur center, LG par wapis apni position par */}
                                    <span
                                        className={`absolute top-[-30px] lg:top-[-20px] text-[100px] md:text-[140px] lg:text-[160px] font-black leading-none select-none z-0 opacity-20 lg:opacity-100
                                            ${index % 2 !== 0
                                                ? "right-0 lg:right-15"
                                                : "left-0 lg:left-15"}
                                        `}
                                        style={{
                                            WebkitTextStroke: "1px #f63b3b",
                                            color: "transparent",
                                        }}
                                    >
                                        {step.id}
                                    </span>

                                    {/* Content spacing fix for smaller screens */}
                                    <div className={`relative z-10 pt-8 lg:pt-0 
                                        ${index % 2 !== 0
                                            ? "lg:right-24 text-center lg:text-left"
                                            : "lg:left-50 text-center lg:text-left"}`}>
                                        <h3 className="text-lg sm:text-xl font-bold text-[#f23410] mb-4">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-normal max-w-sm mx-auto lg:mx-0">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="flex-1 flex justify-center z-10 w-full mt-4 lg:mt-0">
                                    <div className="relative w-full max-w-[280px] md:max-w-[320px] h-[200px] md:h-[250px]">
                                        <Image
                                            src={step.img}
                                            alt={step.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dotted Lines: Inhe LG se niche hide kar diya hai kyunki stack mein ye layout kharab karti hain */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:flex w-full justify-center">
                                    <div className="w-[80%] opacity-60">
                                        <Image
                                            src={index % 2 === 0 ? line1 : line2}
                                            alt="separator"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Mobile/Tablet Spacer */}
                            {index < steps.length - 1 && (
                                <div className="lg:hidden h-12 md:h-24" />
                            )}

                        </div>
                    ))}
                </div>
            </section>
            <Numbers />
        </>
    );
};

export default WorkSection;

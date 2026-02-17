import React from 'react';
import { ChevronRight } from 'lucide-react';

// Images import karein
import sell1 from "@/assets/sell1.svg";
import sell2 from "@/assets/sell2.svg";
import sell3 from "@/assets/sell3.svg";
import sell4 from "@/assets/sell4.svg";

const SellCar = () => {
    // Data array taake code clean rahe
    const steps = [
        {
            img: sell1.src,
            title: "Consultation",
            desc: "We start by defining your exact requirements. Whether browsing local stock or sourcing globally, we align on the perfect make, model, and grade.",
            linkText: "Enquire Now",
        },
        {
            img: sell2.src,
            title: "Verification",
            desc: "Zero surprises. We perform rigorous physical inspections, auction sheet verification, and PPSR title history checks before any money changes hands.",
            linkText: "Enquire Now",
        },
        {
            img: sell3.src,
            title: "Handover",
            desc: "We handle the logistics, customs, ADR compliance, and detailing. You simply collect your keys or arrange Australia-wide delivery.",
            linkText: "Enquire Now",
        },
        {
            img: sell4.src,
            title: "Own the Experience",
            desc: "With everything completed, you drive away with total confidence, knowing your vehicle has been sourced, verified, and delivered to Elite standards.",
            linkText: "Enquire Now",
        },
    ];

    return (
        <section className="py-10 px-4 bg-white max-w-7xl mx-auto">
            {/* Header with horizontal lines */}
            <div className="flex items-center justify-center mb-6">
                <div className="hidden md:block h-[1px] bg-[#000000] flex-grow max-w-[200px]"></div>
                <h2 className="text-black text-2xl sm:text-3xl font-bold px-6 text-center">
                    Customer Journey With Elite Motor Cars
                </h2>
                <div className="hidden md:block h-[1px] bg-[#000000] flex-grow max-w-[200px]"></div>
            </div>

            {/* Grid for Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        {/* Image Container */}
                        <div className="h-50 flex items-center justify-center mb-8">
                            <img
                                src={step.img}
                                alt={step.title}
                                className="max-h-full w-auto object-contain"
                            />
                        </div>

                        {/* Content */}
                        <h3 className="text-red-600 font-bold text-lg mb-3 leading-tight">
                            {step.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed max-w-[250px]">
                            {step.desc}
                        </p>

                        {/* Action Link */}
                        <a
                            href="#"
                            className="text-red-700 font-bold text-sm flex items-center hover:underline transition-all duration-300"
                        >
                            {step.linkText} <ChevronRight size={16} className="ml-1" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SellCar;
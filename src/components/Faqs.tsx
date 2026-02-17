"use client";
import React, { useState } from "react";
import { Plus, HelpCircle, ArrowRight } from "lucide-react";

interface faqItem {
    question: string;
    answer: string;
}

const faqData: faqItem[] = [
    {
        question: "How long does the process take from auction to delivery?",
        answer: "Generally, for a JDM import, the process takes between 8 to 12 weeks. This includes the time for sourcing, shipping, customs clearance, and Australian compliance. European imports may vary slightly based on shipping schedules.",
    },
    {
        question: "How do I know the car is in good condition?",
        answer: "We never buy 'blind.' Every vehicle we source undergoes a physical inspection by our trusted agents in the country of origin. We provide you with the Original Auction Sheet (for Japan) or a Comprehensive Mechanical Report (for Europe) to verify the grade, mileage, and condition.",
    },
    {
        question: "Are there hidden costs like taxes or duties?",
        answer: "No. When we provide a quote, we offer a 'Landed and Complied' price. This includes the car cost, shipping, insurance, Customs Duty, GST, and Luxury Car Tax (if applicable). The only extra costs are your local state registration fees.",
    },
    {
        question: "Do you offer financing for sourced vehicles?",
        answer: "Yes! We can arrange pre-approval through our lending partners so you have your budget ready before we start bidding on your behalf.",
    },
    {
        question: "Can you ship the car to me if I’m not in Sydney?",
        answer: "Absolutely. We ship Australia-wide. Once the car is complied and registered in NSW (or provided with a blue slip), we can arrange enclosed or open transport directly to your door in Melbourne, Brisbane, Perth, or regional areas.",
    },
];

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-10 bg-white relative">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header Section: Professional & Clean */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[2px] bg-blue-500"></div>
                            <span className="text-blue-600 orb font-bold uppercase text-xs">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl orb font-black text-[#161621] uppercase leading-[0.9] tracking-tighter">
                            Common
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"> Questions.</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm max-w-sm orb uppercase leading-normal border-l border-blue-200 pl-6">
                        Elite Motor Cars Global Sourcing Division — Frequently Asked Questions.
                    </p>
                </div>

                {/* FAQ List: Sleek Minimal Design */}
                <div className="max-w-5xl mx-auto">
                    {faqData.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className="group border-b border-blue-100 last:border-0"
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between py-8 text-left transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-start gap-4 sm:gap-8">
                                        <span className={`orb font-bold text-sm mt-1 transition-colors duration-300 ${isOpen ? 'text-blue-500' : 'text-blue-300'}`}>
                                            0{index + 1}
                                        </span>
                                        <span className={`text-base leading-none sm:text-lg md:text-xl orb font-bold transition-all duration-300 ${isOpen ? 'text-blue-600 translate-x-2' : 'text-[#161621]'}`}>
                                            {faq.question}
                                        </span>
                                    </div>

                                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${isOpen ? 'bg-blue-500 text-white rotate-45' : 'bg-blue-50 text-blue-400 group-hover:bg-blue-50'}`}>
                                        <Plus size={20} className="transition-transform duration-500" />
                                    </div>
                                </button>

                                {/* Smooth Answer Reveal */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-80 opacity-100 pb-10" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="flex gap-8">
                                        <div className="w-10 hidden md:block"></div>
                                        <div className="pl-0 md:pl-4 max-w-3xl">
                                            <p className="text-gray-500 sm:text-lg leading-relaxed font-light">
                                                {faq.answer}
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold orb text-xs uppercase cursor-pointer hover:gap-4 transition-all duration-300">
                                                Need more info <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Minimal Footer */}
                <div className="pt-10 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <HelpCircle className="text-blue-500" size={40} />
                        <p className="text-[#161621] font-bold orb text-sm uppercase">
                            Still have a specific inquiry?
                        </p>
                    </div>
                    <button className="px-10 py-4 bg-[#161621] text-white orb text-xs font-bold uppercase hover:bg-blue-600 transition-all duration-300 cursor-pointer rounded-xl">
                        Contact Our Specialists
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Faqs;
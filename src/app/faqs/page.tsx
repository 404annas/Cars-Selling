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
        <section className="py-10 sm:py-16 bg-white relative">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header Section: Fully Responsive */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 sm:mb-16 gap-6 sm:gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 sm:w-10 h-[2px] bg-[#050c4e]"></div>
                            <span className="text-[#050c4e] orb font-bold uppercase text-[10px] sm:text-xs tracking-wider">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl orb font-bold text-[#050c4e] uppercase leading-[0.95] tracking-tighter">
                            Common
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-950 block sm:inline"> Questions.</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm max-w-sm orb uppercase leading-relaxed border-l-2 border-blue-200 pl-4 sm:pl-6">
                        Elite Motor Cars Global Sourcing Division — Frequently Asked Questions.
                    </p>
                </div>

                {/* FAQ List */}
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
                                    className="w-full flex items-center justify-between py-6 sm:py-8 text-left transition-all duration-300 cursor-pointer gap-4"
                                >
                                    <div className="flex items-start gap-3 sm:gap-8">
                                        <span className={`orb font-bold text-xs sm:text-sm mt-1 transition-colors duration-300 shrink-0 ${isOpen ? 'text-blue-500' : 'text-blue-300'}`}>
                                            0{index + 1}
                                        </span>
                                        <span className={`text-sm sm:text-lg md:text-xl orb font-bold transition-all duration-300 leading-tight ${isOpen ? 'text-blue-600 translate-x-1 sm:translate-x-2' : 'text-[#050c4e]'}`}>
                                            {faq.question}
                                        </span>
                                    </div>

                                    <div className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-500 shrink-0 ${isOpen ? 'bg-blue-950 text-white rotate-45' : 'bg-blue-50 text-[#050c4e]'}`}>
                                        <Plus size={18} className="sm:size-[20px] transition-transform duration-500" />
                                    </div>
                                </button>

                                {/* Smooth Answer Reveal */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-[500px] opacity-100 pb-8 sm:pb-10" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="flex gap-3 sm:gap-8">
                                        {/* Spacing for desktop icons */}
                                        <div className="w-4 sm:w-10 shrink-0 hidden sm:block"></div>
                                        <div className="pl-7 sm:pl-4 max-w-3xl">
                                            <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                                                {faq.answer}
                                            </p>
                                            <div className="mt-5 flex items-center gap-2 text-blue-600 font-bold orb text-[10px] sm:text-xs uppercase cursor-pointer hover:gap-4 transition-all duration-300">
                                                Need more info <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Footer: Responsive Layout */}
                <div className="mt-10 pt-10 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <HelpCircle className="text-[#050c4e] w-10 h-10 sm:w-12 sm:h-12" />
                        <p className="text-[#050c4e] font-bold orb text-xs sm:text-sm uppercase tracking-wider">
                            Still have a specific inquiry?
                        </p>
                    </div>
                    <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#050c4e] text-white orb text-[10px] sm:text-xs font-bold uppercase hover:bg-[#020631] transition-all duration-300 cursor-pointer rounded-xl active:scale-95 shadow-lg">
                        Contact Our Specialists
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Faqs;
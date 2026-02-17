"use client";
import React from "react";
import { MessageSquare, ShieldCheck, Key, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Consultation",
    subtitle: "Selection & Strategy",
    desc: "We start by defining your exact requirements. Whether browsing local stock or sourcing globally, we align on the perfect make, model, and grade.",
    tags: ["Sydney Showroom", "Global Auctions"],
    icon: <MessageSquare size={28} />,
  },
  {
    id: "02",
    title: "Verification",
    subtitle: "Inspection & Acquisition",
    desc: "Zero surprises. We perform rigorous physical inspections, auction sheet verification, and PPSR title history checks before any money changes hands.",
    tags: ["Multi-point Check", "PPSR Clear"],
    icon: <ShieldCheck size={28} />,
  },
  {
    id: "03",
    title: "Handover",
    subtitle: "Compliance & Delivery",
    desc: "We handle the logistics, customs, ADR compliance, and detailing. You simply collect your keys or arrange Australia-wide delivery.",
    tags: ["Logistics", "Ready to Drive"],
    icon: <Key size={28} />,
  },
];

const Steps = () => {
  return (
    <section className="bg-[#0B0F19] py-10 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
            <div className="max-w-2xl">
                <span className="text-blue-500 font-bold uppercase text-xs mb-4 block orb">
                    How Our Process Work
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase orb leading-none">
                    Your Journey to <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600">
                        The Driver's Seat
                    </span>
                </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-normal text-right md:text-left hidden md:block border-l border-blue-800 pl-6">
                We’ve stripped away the red tape. A refined three-phase process to ensure you get the right car without the dealership headaches.
            </p>
        </div>

        {/* --- The Flow Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div 
                key={index} 
                className="group relative bg-[#121826] border border-blue-800 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col min-h-[420px]"
            >
                {/* Large Watermark Number */}
                <span className="absolute top-2 right-6 text-[140px] font-black text-gray-800/10 group-hover:text-blue-500/5 transition-colors duration-500 select-none orb leading-none z-0">
                    {step.id}
                </span>

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col">
                    
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-500 transition-all duration-300 shadow-lg mb-8">
                        {step.icon}
                    </div>

                    {/* Titles */}
                    <h4 className="text-blue-500 font-bold text-xs uppercase mb-2 orb">
                        {step.subtitle}
                    </h4>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 orb">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-normal mb-8 border-t border-blue-800 pt-6 group-hover:border-blue-700 transition-colors sm:text-base text-sm">
                        {step.desc}
                    </p>

                    {/* Tags / Pills at Bottom */}
                    <div className="mt-auto flex flex-wrap gap-2">
                        {step.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-gray-400 px-3 py-1.5 rounded-full border border-blue-700 group-hover:border-blue-500/30 group-hover:text-blue-500 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
"use client";
import React, { useState } from "react";
import {
  CarFront,
  Search,
  MapPin,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Car,
  ArrowRight,
  X
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  points: {
    label: string;
    text: string;
  }[];
  icon: React.ReactNode;
};

const services = [
  {
    id: "01",
    title: "Unrivalled Import Expertise",
    description: "We don’t just sell cars; we understand the culture behind.",
    // Modal Content
    fullDetails: "We don’t just sell cars; we understand the culture behind them. We specialize in importing high-grade vehicles directly from Japan and Europe.",
    points: [
      { label: "JDM Legends", text: "From cult classics to modern performance icons, we navigate the Japanese auction houses to bring you clean, authentic, and compliant Japanese Domestic Market vehicles." },
      { label: "Euro Prestige", text: "We curate the finest German engineering and Italian flair, ensuring you get access to specifications and trims that are often hard to find locally." }
    ],
    icon: <Globe size={40} strokeWidth={1.5} />,
  },
  {
    id: "02",
    title: "Bespoke Global Sourcing Service",
    description: "Can't find what you are looking for in Australia?",
    fullDetails: "Our 'Concierge Sourcing' service removes the stress of hunting for specific vehicles. You tell us your dream spec—make, model, year, colour, and budget.",
    points: [
      { label: "Expert Negotiation", text: "We utilize our trusted global network to locate, inspect, and negotiate the best price for you." },
      { label: "End-to-End", text: "We handle the paperwork, compliance, and customs so you can focus on the drive." }
    ],
    icon: <Search size={40} strokeWidth={1.5} />,
  },
  {
    id: "03",
    title: "A Curated Selection of Local Favourites",
    description: "While we love imports, we are deeply rooted in Sydney.",
    fullDetails: "While we love imports, we are deeply rooted in the Sydney community. We stock a wide range of high-quality local Australian-delivered vehicles.",
    points: [
      { label: "Elite Standard", text: "All our local stock undergoes the same rigorous quality inspections as our imports." },
      { label: "Variety", text: "Whether you are buying a daily commuter or a weekend cruiser, we meet your needs." }
    ],
    icon: <MapPin size={40} strokeWidth={1.5} />,
  },
  {
    id: "04",
    title: "We Do Ship Australia Wide",
    description: "Based in Sydney, but serving the nation.",
    fullDetails: "Based in Sydney, but serving the nation. We understand that the perfect car might not be in your postcode.",
    points: [
      { label: "Seamless Logistics", text: "Elite Motor Cars offers shipping solutions to getting your new vehicle to your driveway, anywhere in Australia." },
      { label: "White-Glove Care", text: "We treat every transport job with the utmost care and professionalism." }
    ],
    icon: <CarFront size={40} strokeWidth={1.5} />,
  },
  {
    id: "05",
    title: "Compliance & Quality You Can Trust",
    description: "The grey import market can be navigating the unknown.",
    fullDetails: "The grey import market can be navigating the unknown, but we make it transparent.",
    points: [
      { label: "Full Compliance", text: "We ensure all imported vehicles meet strict Australian Design Rules (ADR) and compliance standards." },
      { label: "Rigorous Testing", text: "Every car is mechanically inspected and professionally detailed before it hits our showroom floor." },
      { label: "Transparent History", text: "We provide clear vehicle history reports and auction sheets (for imports)." }
    ],
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
  },
];

const Offering = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="py-10 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Car className="text-blue-500" size={22} />
            <span className="text-blue-500 orb font-bold uppercase tracking-widest text-sm">
              Your Gateway to Global Automotive Excellence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl orb font-extrabold text-[#161621] uppercase leading-none">
            Why Choose <br /> Elite Motor cars ?
          </h2>

          <p className="pt-6 max-w-5xl mx-auto text-lg leading-6">
            At Elite Motor Cars, we believe buying a car shouldn't just be a transaction; it should be an experience fueled by passion and precision. Whether you are a collector hunting for a rare Skyline, a professional seeking a German luxury sedan, or a family looking for a reliable local SUV, we bridge the gap between Sydney and the world’s best automotive markets.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-[#161621] rounded-[30px] overflow-hidden border-b-[8px] border-blue-500 transition-transform duration-300 hover:-translate-y-2 shadow-sm`}
            >
              {/* Geometric Background Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-3/4 h-full bg-black/20"
                  style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-white/5"
                  style={{ clipPath: "polygon(0 0, 70% 0, 0 70%)" }}>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 pt-8 pb-6">
                <div className="text-blue-500 mb-10 relative z-10 inline-block">
                  <div className="absolute -left-3 -top-3 w-[64px] h-[64px] rounded-full border border-dashed border-blue-500/50 animate-spin-slow"></div>
                  <div className="relative z-10">{service.icon}</div>
                </div>

                <div className="absolute right-0 top-[15%] bg-white text-[#161621] font-bold text-xl py-3 pl-4 pr-3 rounded-l-xl shadow-lg orb z-20">
                  {service.id}
                </div>

                <h3 className="text-blue-500 orb text-base font-bold mb-3 transition-colors group-hover:text-white duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm font-medium leading-normal mb-4">
                  {service.description}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="text-blue-500 hover:underline hover:translate-y-1 transition-all duration-300 flex items-center gap-2 text-sm cursor-pointer"
                >
                  Read More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL (80% Height) --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500">
          {/* Backdrop with Heavy Blur */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedService(null)}
          ></div>

          {/* Creative Modal Container */}
          <div className="relative bg-[#0B1324] w-full max-w-5xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex flex-col md:flex-row h-[85vh] md:h-[90vh] animate-in fade-in zoom-in duration-300">

            {/* 1. Left Side: Visual/Brand Section (Hidden on small mobile) */}
            <div className="relative w-full md:w-1/4 bg-[#161621] p-8 flex flex-col justify-between border-r border-white/5 overflow-hidden">
              {/* Abstract Background Glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[50px]"></div>

              <div className="relative z-10">
                <div className="p-5 bg-white/5 rounded-3xl inline-block border border-white/10 text-blue-500 mb-6 shadow-2xl">
                  {selectedService.icon}
                </div>
                <h4 className="text-white/30 orb font-black text-6xl select-none mb-2">
                  {selectedService.id}
                </h4>
                <p className="text-blue-500 orb font-bold tracking-widest uppercase text-xs">
                  Elite Service Detail
                </p>
              </div>

              <div className="relative z-10">
                <p className="text-gray-500 text-xs orb leading-tight uppercase tracking-tighter">
                  Elite Motor Cars <br /> Sydney, Australia
                </p>
              </div>
            </div>

            {/* 2. Right Side: Content Section */}
            <div className="relative w-full md:w-3/4 bg-gradient-to-br from-[#161621] to-[#0B1324] flex flex-col">

              {/* Close Icon - Styled */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-8 text-gray-400 hover:text-blue-500 transition-all duration-300 cursor-pointer z-[110] bg-white/5 p-2 rounded-full border border-white/10 hover:rotate-90"
              >
                <X size={24} />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-8 custom-scrollbar">
                <h3 className="text-3xl md:text-3xl font-black text-white orb uppercase mb-4 leading-tight">
                  {selectedService.title}
                </h3>

                <div className="w-20 h-1 bg-blue-500 mb-6 rounded-full"></div>

                <p className="text-gray-300 text-base leading-relaxed mb-8 font-medium">
                  {selectedService.fullDetails}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {selectedService.points?.map((point, i) => (
                    <div
                      key={i}
                      className="group/point relative p-5 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-5">
                        <div className="mt-1 flex-shrink-0 bg-blue-500/10 p-2 rounded-lg text-blue-500">
                          <CheckCircle2 size={18} />
                        </div>
                        <div>
                          <h5 className="text-white font-bold orb text-sm uppercase tracking-wide mb-2 group-hover/point:text-blue-400 transition-colors">
                            {point.label}
                          </h5>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {point.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <div className="p-10 bg-gradient-to-br from-[#0B1324] to-[#070E1A] max-w-6xl mx-auto text-white rounded-3xl mt-10 text-center relative overflow-hidden group">
        <h1 className="uppercase text-4xl font-bold pb-4">Ready to find your <span className="text-blue-500">dream car ?</span></h1>
        <p className="max-w-4xl mx-auto text-lg leading-6 pb-8">Stop searching and start driving. Visit our Sydney showroom to view our current stock, or contact our team to discuss sourcing a specific vehicle from overseas.</p>
        <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 shadow-[0_10px_30px_-10px_rgba(34,197,94,0.5)] transition-all duration-300 cursor-pointer rounded-xl text-white text-lg uppercase font-semibold">Drive the Elite way</button>
      </div>
    </section>
  );
};

export default Offering;
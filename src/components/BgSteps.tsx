import React from 'react';
import stepsMainImg from "@/assets/stepsMain.jpg";

const roadmapPhases = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Personal Consultation",
    description: "Deep dive into your requirements: Make, Model, Grade, and Budget. We provide real-time market data to align with global availability."
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "Global Search & Selection",
    description: "Our agents in Japan, Germany, or Italy begin the hunt. You get daily alerts while we filter out 'lemon' cars that fail our standards."
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Forensic Inspection & Bidding",
    description: "We verify condition with independent reports and auction sheets. We set a 'ceiling price' to ensure you never overpay."
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Secure Shipping & Logistics",
    description: "We handle de-registration, export certificates, and insurance. Safe transit via premium RoRo or container vessels to Australia."
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "Customs & Compliance",
    description: "We manage Customs, GST, and LCT. Our Sydney workshop handles ADR engineering to ensure the car is road-legal."
  },
  {
    id: 6,
    phase: "Phase 6",
    title: "Final Detailing & Handover",
    description: "Full mechanical check and professional detail. Collect from our Sydney showroom or get door-to-door shipping Australia-wide."
  }
];

const BgSteps = () => {
  return (
    <section
      className="relative w-full py-10 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${stepsMainImg.src})`
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 container mx-auto px-6 sm:px-10">

        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-blue-500 font-bold uppercase text-sm mb-4 orb">
            Road Map
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white uppercase orb max-w-4xl leading-none">
            Your Dream Car, Delivered: <br />
            <span className="text-blue-500">The 6-Step Sourcing Roadmap</span>
          </h3>
          <p className="mt-6 text-gray-300 text-lg max-w-3xl leading-6">
            Navigating international auctions and customs can be a minefield. At Elite Motor Cars,
            we’ve refined the process into six clear stages.
          </p>
        </div>

        <div className="relative">
          {/* The blue Connector Line (Desktop Only) - Modified for 3 columns */}
          {/* <div className="hidden lg:block absolute top-6 left-10 right-10 h-[1px] bg-blue-600/30 z-0"></div> */}

          {/* Steps Grid: Updated to grid-cols-3 for a balanced 6-step look */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 lg:gap-x-16">
            {roadmapPhases.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-start group">

                {/* blue Number Box */}
                <div className="w-12 h-12 bg-[#2ecc71] rounded-md flex items-center justify-center text-white font-bold text-xl orb shadow-lg mb-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-[#2ecc71] transition-all duration-300">
                  {step.id}
                </div>

                {/* Phase Tag */}
                <span className="text-blue-500 text-xs uppercase font-bold tracking-widest mb-2 orb">
                  {step.phase}
                </span>

                {/* Text Content */}
                <h3 className="text-white orb text-xl font-bold mb-4 tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed opacity-90 border-l border-blue-700 pl-4">
                  {step.description}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default BgSteps;
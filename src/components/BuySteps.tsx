"use client";
import {
  Globe,
  ShieldCheck,
  Truck,
  Car,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { OPEN_ENQUIRY_MODAL_EVENT } from "@/lib/enquiryModal";

const BuySteps = () => {
  const openEnquiryModal = () => {
    window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT));
  };

  const values = [
    {
      id: "1",
      title: "Unrivalled Import Expertise – JDM, German & Italian Vehicles",
      content: (
        <>
          <p className="mb-4">
            We don’t just sell cars; we understand the culture and passion
            behind them. Specializing in importing cars from Japan and Europe,
            we bring you high-grade vehicles that are often impossible to find
            locally.
          </p>
          <p className="mb-3 font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[#3498db] shrink-0" size={18} /> JDM
            Legends:
          </p>
          <p className="mb-4">
            From classic Japanese icons to modern performance vehicles, we
            navigate the Japanese auction houses to deliver authentic, compliant
            Japanese Domestic Market (JDM) cars. Each vehicle is thoroughly
            inspected to ensure quality, reliability, and originality.
          </p>
          <p className="mb-3 font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[#3498db] shrink-0" size={18} /> Euro
            Prestige:
          </p>
          <p>
            Experience the finest German engineering and Italian design flair.
            We curate vehicles with unique specifications and trims, giving you
            access to luxury and performance cars that are hard to source
            locally. Every European import meets our strict standards for
            performance, safety, and value.
          </p>
        </>
      ),
      icon: <Globe className="w-5 h-5 sm:w-6 h-6 text-[#3498db]" />,
      color: "#3498db",
    },
    {
      id: "2",
      title: "Bespoke Global Car Sourcing Service – Find Your Dream Vehicle",
      content: (
        <>
          <p>
            Can’t find the car you want in Australia? We Concierge Sourcing
            Service takes the stress out of searching for import cars. Simply
            provide your dream vehicle specifications: make, model, year, color,
            budget and we use our trusted global network to locate, inspect, and
            negotiate the best price for you.
          </p>
          <br />
          <p>
            We handle all the paperwork, compliance, and customs clearance, so
            you can focus on what matters most: getting behind the wheel of your
            perfect car. Whether it’s a luxury European import, a rare JDM car,
            or a high-performance vehicle, our bespoke service ensures a
            hassle-free and fully transparent buying experience.
          </p>
        </>
      ),
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 h-6 text-[#2980b9]" />,
      color: "#2980b9",
    },
    {
      id: "3",
      title:
        "A Curated Selection of Local Favorites – High-Quality Australian Vehicles",
      content: (
        <p>
          While we specialize in imports, Elite Motor Cars is deeply rooted in
          the Sydney community. Our carefully curated local stock features a
          wide range of high-quality Australian-delivered vehicles. Every local
          car undergoes the same rigorous inspections as our imports, ensuring
          that whether you’re buying a daily commuter or a weekend cruiser, you
          drive away in a fully inspected, reliable vehicle that meets the Elite
          standard.
        </p>
      ),
      icon: <Car className="w-5 h-5 sm:w-6 h-6 text-[#d63384]" />,
      color: "#d63384",
    },
    {
      id: "4",
      title: "We Ship Australia-Wide",
      content: (
        <p>
          Based in Sydney but serving every corner of the nation, We ensure your
          dream vehicle reaches you wherever you are. Whether you're in
          Melbourne, Brisbane, Perth, or regional Australia, our seamless
          logistics and shipping solutions bring your car straight to your
          driveway. Every transport job is handled with white-glove care,
          ensuring a safe and stress-free delivery experience.
        </p>
      ),
      icon: <Truck className="w-5 h-5 sm:w-6 h-6 text-[#e67e22]" />,
      color: "#e67e22",
    },
    {
      id: "5",
      title: "Compliance & Quality You Can Trust",
      content: (
        <>
          <p className="mb-4">
            Navigating the grey import market can feel uncertain, but Elite
            Motor Cars makes it completely transparent.
          </p>
          <p className="mb-2 font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[#d4ac0d] shrink-0" size={18} /> Full
            Compliance:
          </p>
          <p className="mb-4 text-sm sm:text-base">
            We ensure every imported vehicle meets strict Australian Design Rules (ADR) and compliance standards, giving you peace of mind.
          </p>
          <p className="mb-2 font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[#d4ac0d] shrink-0" size={18} />{" "}
            Rigorous Testing:
          </p>
          <p className="mb-4 text-sm sm:text-base">
            Every car whether local or imported is mechanically inspected and professionally detailed before it reaches our showroom, ensuring it’s in showroom-perfect condition.
          </p>
          <p className="mb-2 font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[#d4ac0d] shrink-0" size={18} />{" "}
            Transparent History:
          </p>
          <p className="text-sm sm:text-base">
            We provide comprehensive vehicle history reports and auction sheets (for imports), so you know exactly what you’re buying, no surprises, just confidence.
          </p>
        </>
      ),
      icon: <HeartHandshake className="w-5 h-5 sm:w-6 h-6 text-[#d4ac0d]" />,
      color: "#d4ac0d",
    },
  ];

  return (
    <section className="pt-10 sm:pt-14 bg-black px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Main Heading Section */}
        <div className="mb-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-none text-[#f23410] mb-3 px-2">
            Delivering Real Value – More Than Just a Dealership
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-4">
            We go beyond simply selling cars. As your trusted automotive
            partners, we absorb the complexity of buying, importing, and
            securing used cars so you can focus on what truly matters, enjoying
            the drive of your dream vehicle. From sourcing rare imports to
            providing seamless post-sale support, we ensure every step of your
            car buying journey is hassle-free, transparent, and tailored to your
            needs.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {values.map((step, index) => (
            <div
              key={step.id}
              className="relative flex gap-3 sm:gap-0 mb-2 last:mb-0"
            >
              {/* Left Side: Icon and Vertical Line */}
              <div className="flex flex-col items-center min-w-[50px] sm:min-w-[80px]">
                <div
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-[3px] sm:border-[4px] flex items-center justify-center bg-black z-20 shadow-sm shrink-0"
                  style={{ borderColor: step.color }}
                >
                  {step.icon}
                </div>

                {index < values.length - 0 && (
                  <div
                    className="w-[3px] sm:w-[4px] flex-grow -mt-1"
                    style={{ backgroundColor: step.color }}
                  ></div>
                )}
              </div>

              {/* Right Side: Arrow Heading Bar & Content */}
              <div className="flex-grow pb-8 sm:pb-10">
                <div className="relative flex items-center mb-4 sm:mb-6">
                  {/* Horizontal connection line */}
                  <div
                    className="absolute -left-3 sm:-left-5 w-3 sm:w-5 h-[3px] sm:h-[4px]"
                    style={{ backgroundColor: step.color }}
                  ></div>

                  {/* The Arrow Bar */}
                  <div
                    className="text-white py-2 px-4 sm:px-6 pr-6 sm:pr-14 text-[11px] sm:text-base md:text-lg font-bold shadow-md leading-tight"
                    style={{
                      backgroundColor: step.color,
                      clipPath:
                        "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)",
                      WebkitClipPath:
                        "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)",
                    }}
                  >
                    {step.title}
                  </div>
                </div>

                {/* Content text */}
                <div className="pl-1 sm:pl-6 pr-2">
                  <div className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-3xl">
                    {step.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Footer */}
        <div className="flex items-center justify-center mt-10">
          <button
            type="button"
            onClick={openEnquiryModal}
            className="w-full sm:w-auto bg-gradient-to-r from-[#f23410] to-[#bd5907] text-white font-semibold tracking-wide px-10 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuySteps;

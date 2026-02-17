"use client";
import { Globe, ShieldCheck, Truck, Car, HeartHandshake, CheckCircle2 } from 'lucide-react';

const BuySteps = () => {
    const values = [
        {
            id: "1",
            title: "Unrivalled Import Expertise (JDM, German & Italian)",
            content: (
                <>
                    <p className="mb-4">
                        We don’t just sell cars; we understand the culture behind them. We specialize in importing high-grade vehicles directly from Japan and Europe.
                    </p>
                    <p className="mb-3 font-semibold flex items-center gap-2"><CheckCircle2 className='text-[#3498db] shrink-0' size={18} /> JDM Legends:</p>
                    <p className="mb-4">
                        From cult classics to modern performance icons, we navigate the Japanese auction houses to bring you clean, authentic, and compliant Japanese Domestic Market vehicles.
                    </p>
                    <p className="mb-3 font-semibold flex items-center gap-2"><CheckCircle2 className='text-[#3498db] shrink-0' size={18} /> Euro Prestige:</p>
                    <p>
                        We curate the finest German engineering and Italian flair, ensuring you get access to specifications and trims that are often hard to find locally.
                    </p>
                </>
            ),
            icon: <Globe className="w-5 h-5 sm:w-6 h-6 text-[#3498db]" />,
            color: "#3498db"
        },
        {
            id: "2",
            title: "Bespoke Global Sourcing Service",
            content: (
                <p>
                    Can't find what you are looking for in Australia? Let us find it for you. Our "Concierge Sourcing" service removes the stress of hunting for specific vehicles. You tell us your dream spec—make, model, year, colour, and budget—and we utilize our trusted global network to locate, inspect, and negotiate the best price for you. We handle the paperwork, compliance, and customs so you can focus on the drive.
                </p>
            ),
            icon: <ShieldCheck className="w-5 h-5 sm:w-6 h-6 text-[#2980b9]" />,
            color: "#2980b9"
        },
        {
            id: "3",
            title: "A Curated Selection of Local Favourites",
            content: (
                <p>
                    While we love imports, we are deeply rooted in the Sydney community. We stock a wide range of high-quality local Australian-delivered vehicles. All our local stock undergoes the same rigorous quality inspections as our imports, ensuring that whether you are buying a daily commuter or a weekend cruiser, you are driving away in a vehicle that meets the Elite standard.
                </p>
            ),
            icon: <Car className="w-5 h-5 sm:w-6 h-6 text-[#d63384]" />,
            color: "#d63384"
        },
        {
            id: "4",
            title: "We Ship Australia-Wide",
            content: (
                <p>
                    Based in Sydney, but serving the nation. We understand that the perfect car might not be in your postcode. Elite Motor Cars offers seamless logistics and shipping solutions to getting your new vehicle to your driveway, whether you live in Melbourne, Brisbane, Perth, or regional Australia. We treat every transport job with white-glove care.
                </p>
            ),
            icon: <Truck className="w-5 h-5 sm:w-6 h-6 text-[#e67e22]" />,
            color: "#e67e22"
        },
        {
            id: "5",
            title: "Compliance & Quality You Can Trust",
            content: (
                <>
                    <p className="mb-4">
                        The grey import market can be navigating the unknown, but we make it transparent.
                    </p>
                    <p className="mb-2 font-semibold flex items-center gap-2"><CheckCircle2 className='text-[#d4ac0d] shrink-0' size={18} /> Full Compliance:</p>
                    <p className="mb-4 text-sm sm:text-base">
                        We ensure all imported vehicles meet strict Australian Design Rules (ADR) and compliance standards.
                    </p>
                    <p className="mb-2 font-semibold flex items-center gap-2"><CheckCircle2 className='text-[#d4ac0d] shrink-0' size={18} /> Rigorous Testing:</p>
                    <p className="mb-4 text-sm sm:text-base">
                        Every car, local or imported, is mechanically inspected and professionally detailed before it hits our showroom floor.
                    </p>
                    <p className="mb-2 font-semibold flex items-center gap-2"><CheckCircle2 className='text-[#d4ac0d] shrink-0' size={18} /> Transparent History:</p>
                    <p className="text-sm sm:text-base">
                        We provide clear vehicle history reports and auction sheets (for imports) so you know exactly what you are buying.
                    </p>
                </>
            ),
            icon: <HeartHandshake className="w-5 h-5 sm:w-6 h-6 text-[#d4ac0d]" />,
            color: "#d4ac0d"
        }
    ];

    return (
        <section className="pt-10 sm:pt-14 bg-white px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Main Heading Section */}
                <div className="mb-10 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-none text-gray-900 mb-3 px-2">
                        What value and how we add value to our customers
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
                        More Than Just a Dealership: We Are Your Automotive Partners. Our role is to absorb complexity so you can simply enjoy the drive.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {values.map((step, index) => (
                        <div key={step.id} className="relative flex gap-3 sm:gap-0 mb-2 last:mb-0">

                            {/* Left Side: Icon and Vertical Line */}
                            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[80px]">
                                <div
                                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-[3px] sm:border-[4px] flex items-center justify-center bg-white z-20 shadow-sm shrink-0"
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
                                            clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)',
                                            WebkitClipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)'
                                        }}
                                    >
                                        {step.title}
                                    </div>
                                </div>

                                {/* Content text */}
                                <div className="pl-1 sm:pl-6 pr-2">
                                    <div className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-3xl">
                                        {step.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Footer */}
                <div className="flex items-center justify-center mt-10">
                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#3b82f6] to-[#1a4fc2] text-white font-semibold tracking-wide px-10 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer text-sm sm:text-base">
                        Enquire Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BuySteps;
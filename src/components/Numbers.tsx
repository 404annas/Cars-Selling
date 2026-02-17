"use client";

import React from "react";
import { Car, Gauge, Tag, MapPin } from "lucide-react";

const stats = [
    {
        id: 1,
        value: "1000+",
        label: "Vehicle fleet",
        icon: <Car size={48} strokeWidth={1.5} />,
        theme: "blue",
    },
    {
        id: 2,
        value: "10M+",
        label: "Miles of drive",
        icon: <Gauge size={48} strokeWidth={1.5} />,
        theme: "dark",
    },
    {
        id: 3,
        value: "15K+",
        label: "Booking reserved",
        icon: <Tag size={48} strokeWidth={1.5} />,
        theme: "blue",
    },
    {
        id: 4,
        value: "50K+",
        label: "Pickup & drop",
        icon: <MapPin size={48} strokeWidth={1.5} />,
        theme: "dark",
    },
];

const Numbers = () => {
    return (
        <section className="pt-10 pb-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`relative rounded-[30px] overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2
                ${stat.theme === "blue"
                                    ? "bg-blue-500" // blue Card
                                    : "bg-[#161621]" // Dark Card
                                }
              `}
                        >
                            {/* --- Background Geometric Shapes (Now blue Tined) --- */}
                            <div className="absolute inset-0 pointer-events-none opacity-30">
                                {/* Diagonal split effect */}
                                <div
                                    className={`absolute top-0 right-0 w-full h-full 
                    ${stat.theme === "blue"
                                            ? "bg-blue-400" // Lighter blue shape on blue Card
                                            : "bg-blue-500/10" // Faint blue shape on Dark Card
                                        }
                  `}
                                    style={{
                                        clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                                    }}
                                ></div>
                                <div
                                    className={`absolute top-0 left-0 w-full h-full 
                    ${stat.theme === "blue"
                                            ? "bg-blue-600" // Darker blue shape on blue Card
                                            : "bg-blue-900/20" // Dark blue shape on Dark Card
                                        }
                  `}
                                    style={{
                                        clipPath: "polygon(0 0, 50% 0, 0 50%)",
                                    }}
                                ></div>
                            </div>

                            {/* --- Inner Content with Border Line (Now blue) --- */}
                            <div className="p-3 h-full relative z-10">
                                <div
                                    className={`h-full w-full rounded-[24px] border border-opacity-40 flex flex-col items-center justify-center py-12 space-y-4
                    ${stat.theme === "blue"
                                            ? "border-blue-800" // Dark blue line on blue card
                                            : "border-blue-500" // Bright blue line on Dark card
                                        }
                  `}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`mb-2
                      ${stat.theme === "blue"
                                                ? "text-[#161621]" // Dark Icon on blue
                                                : "text-blue-500" // blue Icon on Dark
                                            }
                    `}
                                    >
                                        {stat.icon}
                                    </div>

                                    {/* Number Value */}
                                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-wide orb">
                                        {stat.value}
                                    </h3>

                                    {/* Label */}
                                    <p
                                        className={`font-medium text-base -mt-2 md:text-lg orb capitalize tracking-wide
                      ${stat.theme === "blue"
                                                ? "text-[#161621]" // Dark Text on blue
                                                : "text-blue-500" // blue Text on Dark
                                            }
                    `}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Numbers;
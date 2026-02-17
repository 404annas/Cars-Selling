"use client";

import React, { useEffect, useState } from "react";

const PreLoader = () => {
    const [loading, setLoading] = useState(true);

    // 1. Logic to Lock/Unlock Scroll
    useEffect(() => {
        if (loading) {
            // Disable scrolling
            document.body.style.overflow = "hidden";
            // Force scroll to top
            window.scrollTo(0, 0);
        } else {
            // Re-enable scrolling when loading finishes
            document.body.style.overflow = "auto";
        }

        // Cleanup function: Ensure scroll is enabled if component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    // 2. Existing Logic to handle load time
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 800);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }

        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        // Added 'overscroll-none' to prevent bounce effects on some devices
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overscroll-none touch-none transition-opacity duration-500">

            <div className="relative flex flex-col items-center">

                {/* Wind Lines (Upper) */}
                <div className="absolute -top-6 right-0 w-full h-8 overflow-hidden z-0 opacity-60">
                    <div className="absolute top-2 right-[-20px] w-12 h-[2px] bg-blue-200 rounded animate-wind-fast"></div>
                    <div className="absolute top-5 right-[-40px] w-20 h-[2px] bg-blue-300 rounded animate-wind-medium"></div>
                </div>

                {/* THE CAR */}
                <div className="relative z-10 animate-rumble">
                    <svg
                        width="120"
                        height="60"
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Car Body */}
                        <path
                            d="M10 25 L20 15 L50 15 L65 25 L90 25 Q95 25 95 30 L95 35 L5 35 L5 30 Q5 25 10 25 Z"
                            fill="#3b82f6"
                        />
                        {/* Roof Window Area */}
                        <path
                            d="M25 15 L35 5 L65 5 L75 15 Z"
                            fill="#3b82f6"
                            className="opacity-90"
                        />

                        {/* Wheels - Spinning Fast */}
                        <g className="origin-[25px_35px] animate-spin-wheels">
                            <circle cx="25" cy="35" r="7" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                            <circle cx="25" cy="35" r="2" fill="#3b82f6" />
                            <rect x="24" y="28" width="2" height="14" fill="#3b82f6" rx="1" />
                            <rect x="18" y="34" width="14" height="2" fill="#3b82f6" rx="1" />
                        </g>

                        <g className="origin-[75px_35px] animate-spin-wheels">
                            <circle cx="75" cy="35" r="7" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                            <circle cx="75" cy="35" r="2" fill="#3b82f6" />
                            <rect x="74" y="28" width="2" height="14" fill="#3b82f6" rx="1" />
                            <rect x="68" y="34" width="14" height="2" fill="#3b82f6" rx="1" />
                        </g>
                    </svg>
                </div>

                {/* THE MOVING ROAD */}
                <div className="w-48 h-1 bg-gray-200 mt-[-2px] rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(90deg,transparent_50%,#3b82f6_50%)] bg-[length:20px_100%] animate-road-move"></div>
                </div>

            </div>

            {/* Text */}
            <h2 className="mt-6 text-blue-600 font-bold text-lg tracking-tight uppercase animate-pulse orb">
                ELITE MOTOR CARS
            </h2>

            {/* Custom Animations */}
            <style jsx>{`
                .animate-road-move { animation: moveRoad 0.4s linear infinite; }
                .animate-spin-wheels { animation: spin 0.4s linear infinite; }
                .animate-rumble { animation: rumble 0.5s ease-in-out infinite alternate; }
                .animate-wind-fast { animation: windPass 0.6s linear infinite; }
                .animate-wind-medium { animation: windPass 0.8s linear infinite 0.2s; }

                @keyframes moveRoad {
                    0% { background-position: 0 0; }
                    100% { background-position: -40px 0; }
                }
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
                @keyframes rumble {
                    0% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-1px) rotate(-0.5deg); }
                    50% { transform: translateY(0px) rotate(0deg); }
                    75% { transform: translateY(-1px) rotate(0.5deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes windPass {
                    0% { transform: translateX(50px); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateX(-100px); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default PreLoader;
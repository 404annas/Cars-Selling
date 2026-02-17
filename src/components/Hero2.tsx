"use client"

import { Car, CarFront, Check, LocateFixed, Search, Truck, Van } from "lucide-react";
import { GiJeep } from "react-icons/gi";
import React, { useState, useEffect } from "react";
import { TbCarSuv } from "react-icons/tb";

import heroMainImg1 from "@/assets/heroMain2.avif"
import heroMainImg2 from "@/assets/heroMain3.avif"
import heroMainImg3 from "@/assets/heroMain5.avif"

import underlineImg from "@/assets/line.png";

const Hero2 = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [activeTab, setActiveTab] = useState("Cars");

    const bgImages = [
        heroMainImg1.src,
        heroMainImg2.src,
        heroMainImg3.src,
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % bgImages.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const tabs = [
        { id: "Cars", icon: <Car size={30} /> },
        { id: "vans", icon: <Van size={30} /> },
        { id: "suv", icon: <TbCarSuv size={30} /> },
        { id: "jeep", icon: <GiJeep size={30} /> },
    ];

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center py-20 lg:py-0">
            {/* BACKGROUND IMAGES */}
            {bgImages.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center 
                        transition-all duration-[1400ms] ease-in-out
                        pointer-events-none z-0
                        ${index === currentImage
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-110"
                        }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${img})`,
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center h-full">

                {/* LEFT CONTENT */}
                <div className="text-white w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl orb font-bold leading-none">
                        Drive Excellence.<br />
                        <span className="relative inline-block text-[#22C55E] mt-2 lg:mt-0">
                            Own Pure Performance.
                            <svg
                                width="750"
                                height="30"
                                viewBox="0 0 180 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="-mt-4"
                            >
                                <path
                                    d="M5 15 C30 10, 60 18, 90 14 C120 10, 150 18, 175 13"
                                    stroke="#22c55e"
                                    stroke-width="5"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M10 22 C40 18, 70 25, 100 20 C130 17, 155 22, 170 19"
                                    stroke="#22c55e"
                                    stroke-width="4"
                                    stroke-linecap="round"
                                    opacity="0.9"
                                />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg leading-normal pt-2 font-medium">At Elite Motor Cars, value means access, peace of mind, and simplicity. Whether it's a luxury European model or a specialized import, we handle the risks and complexities so you don’t have to.</p>

                    <ul className="mt-8 space-y-3 text-sm sm:text-base font-semibold inline-block lg:block text-left">
                        {[
                            "Expert sourcing of luxury & imported vehicles",
                            "Trusted guidance every step of the way",
                            "Quality you can drive with confidence",
                        ].map((text) => (
                            <li key={text} className="flex items-start sm:items-center gap-3">
                                <span className="text-blue-500 text-xl mt-1 sm:mt-0"><Check /></span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT CARD */}
                {/* RIGHT CARD */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-auto lg:ml-auto mt-16 lg:mt-0 relative">

                    {/* TABS (Unchanged) */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 -mt-16 sm:-mt-20 mb-6 sm:mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full h-20 sm:h-24 rounded-xl border-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-sm
                    ${activeTab === tab.id
                                        ? "border-blue-500 bg-white shadow-lg translate-y-[-5px]"
                                        : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="text-2xl sm:text-3xl">{tab.icon}</span>
                                <span className="text-[10px] sm:text-xs orb font-semibold uppercase mt-1">
                                    {tab.id}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* FORM */}
                    <div className="space-y-4">

                        {/* ROW 1: BRAND & MODEL */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs orb font-bold text-gray-500 uppercase">
                                    Brand / Make
                                </label>
                                <select className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white cursor-pointer">
                                    <option value="" disabled selected>Select Make</option>
                                    <option value="toyota">Toyota</option>
                                    <option value="honda">Honda</option>
                                    <option value="audi">Mitsubushi</option>
                                    <option value="bmw">Lexus</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Suzuki</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs orb font-bold text-gray-500 uppercase">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Corolla, X5"
                                    className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* ROW 2: BUDGET & PHONE (Added as important fields) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs orb font-bold text-gray-500 uppercase">
                                    Budget Range
                                </label>
                                <select className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white cursor-pointer">
                                    <option value="" disabled selected>Select Range</option>
                                    <option value="10-20">$10k - $20k</option>
                                    <option value="20-50">$20k - $50k</option>
                                    <option value="50-100">$50k - $100k</option>
                                    <option value="100+">$100k +</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs orb font-bold text-gray-500 uppercase">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* ROW 3: APPOINTMENT DATE & TIME */}
                        <div>
                            <label className="text-xs orb font-bold text-gray-500 uppercase">
                                Schedule Meeting / Test Drive
                            </label>
                            <div className="grid grid-cols-2 gap-0 mt-1 border border-blue-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <input
                                    type="date"
                                    className="p-3 w-full outline-none text-sm bg-white text-gray-600 border-r border-gray-200"
                                />
                                <input
                                    type="time"
                                    className="p-3 w-full outline-none text-sm bg-gray-50 text-gray-600"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg uppercase orb cursor-pointer transition-all duration-300 mt-2 text-xs sm:text-sm shadow-sm active:scale-95 flex items-center justify-center gap-2">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero2;
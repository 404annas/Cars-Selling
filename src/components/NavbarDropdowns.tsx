"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Search, X } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// --- ASSETS IMPORT ---
import mercedesImg from "@/assets/mercedes.png"
import mitsubishiImg from "@/assets/mitsubishi.png"
import hondaImg from "@/assets/honda.png"
import lexusImg from "@/assets/lexus.png"
import suzukiImg from "@/assets/suzuki.png"
import toyotaImg from "@/assets/toyota.png"

const CAR_DATA = {
    "Toyota": {
        models: ["Land Cruiser Prado", "Vitz", "Corolla", "Camry", "Prius", "Fortuner", "Hilux", "Yaris"],
        logo: toyotaImg
    },
    "Honda": {
        models: ["Civic", "Accord", "Vezel", "City", "HR-V", "CR-V", "Fit", "BR-V"],
        logo: hondaImg
    },
    "Suzuki": {
        models: ["Swift", "Jimny", "Alto", "Cultus", "Wagon R", "Vitara", "Bolan", "Every"],
        logo: suzukiImg
    },
    "Mercedes": {
        models: ["C-Class", "E-Class", "S-Class", "GLC SUV", "GLE Coupe", "G-Wagon", "CLA", "AMG GT"],
        logo: mercedesImg
    },
    "Mitsubishi": {
        models: ["Pajero", "Lancer", "Outlander", "Montero Sport", "Eclipse Cross", "Triton", "ASX", "Xpander"],
        logo: mitsubishiImg
    },
    "Lexus": {
        models: ["LX 570", "LX 600", "RX 450h", "NX 300h", "ES 250", "IS 300", "GX 460", "LS 500"],
        logo: lexusImg
    }
};

interface NavbarDropdownsProps {
    searchQuery?: string;
    onSearchQueryChange?: (query: string) => void;
    onTriggerSearch?: (trigger: () => void) => void;
    className?: string;
    isMobile?: boolean; // <--- NEW PROP to switch modes
}

const NavbarDropdowns: React.FC<NavbarDropdownsProps> = ({
    searchQuery = "",
    onSearchQueryChange,
    onTriggerSearch,
    className = "",
    isMobile = false // Default to desktop mode
}) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [selectedMake, setSelectedMake] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [yearRange, setYearRange] = useState({ from: "", to: "" });

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchFnRef = useRef<() => void>(() => { });

    const handleRedirectToSearch = useCallback(() => {
        const params = new URLSearchParams();
        if (selectedMake) params.set('make', selectedMake);
        if (selectedModel) params.set('model', selectedModel);
        if (priceRange.min) params.set('minPrice', priceRange.min);
        if (priceRange.max) params.set('maxPrice', priceRange.max);
        if (yearRange.from) params.set('fromYear', yearRange.from);
        if (yearRange.to) params.set('toYear', yearRange.to);
        if (searchQuery) params.set('search', searchQuery);

        if (params.toString()) {
            router.push(`/search-results?${params.toString()}`);
        }
    }, [selectedMake, selectedModel, priceRange, yearRange, searchQuery, router]);

    useEffect(() => {
        searchFnRef.current = handleRedirectToSearch;
    }, [handleRedirectToSearch]);

    useEffect(() => {
        if (onTriggerSearch) {
            onTriggerSearch(() => searchFnRef.current());
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // Only close on outside click if NOT mobile (Mobile users close via toggle)
                if (!isMobile) setActiveTab(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile]);

    const toggleTab = (tab: string) => {
        if (tab === "Model" && !selectedMake) return;
        setActiveTab(activeTab === tab ? null : tab);
    };

    const handleMakeSelect = (make: string) => {
        setSelectedMake(make);
        setSelectedModel("");
        setActiveTab("Model");
    };

    const handleApplyFilters = () => {
        setActiveTab(null);
    };

    // --- DYNAMIC CLASSES BASED ON MODE ---

    // The container for the dropdown content
    const dropdownContainerClass = isMobile
        ? "relative w-full bg-gray-50 border-t border-gray-200 p-4 animate-in slide-in-from-top-2 duration-200" // Mobile: Accordion style
        : "absolute top-full mt-2 left-0 bg-white shadow-2xl rounded-xl border border-gray-100 z-[200] p-4 animate-in fade-in zoom-in duration-200"; // Desktop: Popover style

    // Specific widths for desktop only (Mobile is always w-full)
    const makeWidth = isMobile ? "w-full" : "w-[420px]";
    const modelWidth = isMobile ? "w-full" : "w-[450px]";
    const commonWidth = isMobile ? "w-full" : "w-[320px]";

    return (
        <div ref={dropdownRef} className={`flex flex-1 gap-3 ${className ? className : "flex-row items-center"}`}>

            {/* --- MAKE DROPDOWN --- */}
            <div className={`relative flex-1 ${isMobile ? "w-full" : "min-w-[110px]"}`}>
                <span className={`absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-500 z-10 font-bold uppercase tracking-tight ${isMobile ? "hidden" : "block"}`}>Make</span>
                <div
                    onClick={() => toggleTab("Make")}
                    className={`border rounded-md py-2.5 px-3 flex items-center justify-between cursor-pointer transition-all ${activeTab === "Make" ? "border-[#050c4e] ring-1 ring-[#050c4e]" : "border-gray-300 hover:border-gray-400"} ${isMobile ? "bg-white" : ""}`}
                >
                    <div className="flex flex-col">
                        {isMobile && <span className="text-[10px] text-gray-500 font-bold uppercase">Make</span>}
                        <span className="text-sm text-gray-700 font-semibold truncate">{selectedMake || "All"}</span>
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${activeTab === "Make" ? "rotate-180" : ""}`} />
                </div>

                {activeTab === "Make" && (
                    <div className={`${dropdownContainerClass} ${makeWidth}`}>
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h4 className="font-bold text-[#050c4e] text-sm uppercase tracking-tight">Popular Makes</h4>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedMake(""); setSelectedModel(""); }} className="text-xs text-gray-400 hover:text-blue-500 transition-all duration-300 cursor-pointer">Reset</button>
                        </div>
                        {/* Mobile uses 2 cols, Desktop uses 3 cols */}
                        <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-3"}`}>
                            {Object.entries(CAR_DATA).map(([make, data]) => (
                                <div
                                    key={make}
                                    onClick={() => handleMakeSelect(make)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all hover:bg-white ${selectedMake === make ? "border-[#050c4e] bg-blue-50" : "border-gray-100 bg-white"}`}
                                >
                                    <div className="w-10 h-8 relative mb-1">
                                        <Image src={data.logo} alt={make} fill className="object-contain" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700">{make}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- MODEL DROPDOWN --- */}
            <div className={`relative flex-1 ${isMobile ? "w-full" : "min-w-[110px]"}`}>
                <span className={`absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-500 z-10 font-bold uppercase tracking-tight ${isMobile ? "hidden" : "block"}`}>Model</span>
                <div
                    onClick={() => toggleTab("Model")}
                    className={`border rounded-md py-2.5 px-3 flex items-center justify-between transition-all ${!selectedMake ? "bg-gray-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"} ${activeTab === "Model" ? "border-[#050c4e] ring-1 ring-[#050c4e]" : "border-gray-300"} ${isMobile ? "bg-white" : ""}`}
                >
                    <div className="flex flex-col">
                        {isMobile && <span className="text-[10px] text-gray-500 font-bold uppercase">Model</span>}
                        <span className={`text-sm font-semibold truncate ${!selectedMake ? "text-gray-300" : "text-gray-700"}`}>{selectedModel || "All"}</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {activeTab === "Model" && selectedMake && (
                    <div className={`${dropdownContainerClass} ${modelWidth}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-[#050c4e] text-sm uppercase">Models of <span className="text-blue-600">{selectedMake}</span></h4>
                            {!isMobile && <X size={16} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={(e) => { e.stopPropagation(); setActiveTab(null); }} />}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {CAR_DATA[selectedMake as keyof typeof CAR_DATA].models.map((model) => (
                                <label key={model} className="flex items-center space-x-2 cursor-pointer group py-1">
                                    <input
                                        type="radio"
                                        name="model"
                                        checked={selectedModel === model}
                                        onChange={() => { setSelectedModel(model); setActiveTab(null); }}
                                        className="w-4 h-4 accent-[#050c4e]"
                                    />
                                    <span className="text-sm text-gray-600 font-medium group-hover:text-[#050c4e] transition-colors duration-300">{model}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- PRICE DROPDOWN --- */}
            <div className={`relative flex-1 ${isMobile ? "w-full" : "min-w-[110px]"}`}>
                <span className={`absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-500 z-10 font-bold uppercase tracking-tight ${isMobile ? "hidden" : "block"}`}>Price</span>
                <div
                    onClick={() => toggleTab("Price")}
                    className={`border rounded-md py-2.5 px-3 flex items-center justify-between cursor-pointer transition-all ${activeTab === "Price" ? "border-[#050c4e] ring-1 ring-[#050c4e]" : "border-gray-300 hover:border-gray-400"} ${isMobile ? "bg-white" : ""}`}
                >
                    <div className="flex flex-col">
                        {isMobile && <span className="text-[10px] text-gray-500 font-bold uppercase">Price</span>}
                        <span className="text-sm text-gray-700 font-semibold truncate">
                            {priceRange.min || priceRange.max ? `$${priceRange.min || 0}k - $${priceRange.max || 'Max'}k` : "All"}
                        </span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {activeTab === "Price" && (
                    <div className={`${dropdownContainerClass} ${commonWidth} z-[300]`}>
                        <div className="flex border-b mb-4">
                            <button className="flex-1 pb-2 border-b-2 border-[#050c4e] text-sm font-bold text-[#050c4e]">Car Price</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Min ($)</label>
                                <input
                                    type="number"
                                    placeholder="All"
                                    className="w-full border rounded p-2 text-sm outline-none focus:border-[#050c4e]"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Max ($)</label>
                                <input
                                    type="number"
                                    placeholder="All"
                                    className="w-full border rounded p-2 text-sm outline-none focus:border-[#050c4e]"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                />
                            </div>
                        </div>
                        <button onClick={() => handleApplyFilters()} className="w-full bg-[#050c4e] hover:scale-95 transition-all duration-300 cursor-pointer text-white rounded-md py-2 mt-4 text-sm font-bold">Apply Filter</button>
                    </div>
                )}
            </div>

            {/* --- YEAR DROPDOWN --- */}
            <div className={`relative flex-1 ${isMobile ? "w-full" : "min-w-[110px]"}`}>
                <span className={`absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-500 z-10 font-bold uppercase tracking-tight ${isMobile ? "hidden" : "block"}`}>Year</span>
                <div
                    onClick={() => toggleTab("Year")}
                    className={`border rounded-md py-2.5 px-3 flex items-center justify-between cursor-pointer transition-all ${activeTab === "Year" ? "border-[#050c4e] ring-1 ring-[#050c4e]" : "border-gray-300 hover:border-gray-400"} ${isMobile ? "bg-white" : ""}`}
                >
                    <div className="flex flex-col">
                        {isMobile && <span className="text-[10px] text-gray-500 font-bold uppercase">Year</span>}
                        <span className="text-sm text-gray-700 font-semibold truncate">
                            {yearRange.from || yearRange.to ? `${yearRange.from || 'Min'} - ${yearRange.to || 'Max'}` : "All"}
                        </span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {activeTab === "Year" && (
                    <div className={`${dropdownContainerClass} ${commonWidth} ${!isMobile ? "right-0" : ""}`}>
                        <h4 className="font-bold text-[#050c4e] text-sm uppercase mb-4">Registration Year</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">From</label>
                                <select
                                    className="w-full border rounded p-2 text-sm outline-none bg-white"
                                    onChange={(e) => setYearRange({ ...yearRange, from: e.target.value })}
                                >
                                    <option value="">Year</option>
                                    <option>2026</option><option>2025</option><option>2024</option><option>2023</option><option>2022</option><option>Below</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">To</label>
                                <select
                                    className="w-full border rounded p-2 text-sm outline-none bg-white"
                                    onChange={(e) => setYearRange({ ...yearRange, to: e.target.value })}
                                >
                                    <option value="">Year</option>
                                    <option>2026</option><option>2025</option><option>2024</option><option>2023</option><option>2022</option><option>Below</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => handleApplyFilters()} className="w-full bg-[#050c4e] hover:scale-95 transition-all duration-300 cursor-pointer text-white rounded-md py-2 mt-4 text-sm font-bold">Apply Filter</button>
                    </div>
                )}
            </div>

            {/* --- RESET BUTTON --- */}
            <button
                onClick={() => {
                    setSelectedMake("");
                    setSelectedModel("");
                    setPriceRange({ min: "", max: "" });
                    setYearRange({ from: "", to: "" });
                    if (onSearchQueryChange) onSearchQueryChange("");
                }}
                className={`text-gray-500 cursor-pointer text-sm font-bold hover:underline transition-all duration-300 px-2 whitespace-nowrap ${isMobile ? "text-right" : ""}`}
            >
                Reset
            </button>
        </div>
    );
};

export default NavbarDropdowns;
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    Search,
    MapPin,
    Mail,
    ShoppingCart,
    Phone,
    Menu,
    X,
    Home,
    Info,
    Truck,
    HelpCircle
} from "lucide-react";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

import NavbarDropdowns from "@/components/NavbarDropdowns";

const Navbar2 = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const searchTriggerRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const handleSearchClick = () => {
        if (searchTriggerRef.current) {
            searchTriggerRef.current();
        }
        setMobileMenuOpen(false);
    };

    const handleTriggerSearch = (triggerFn: () => void) => {
        searchTriggerRef.current = triggerFn;
    };

    return (
        <nav className="w-full flex flex-col sticky top-0 z-[100] transition-all duration-300">

            {/* ========================================= */}
            {/*          DESKTOP VIEW (lg and up)         */}
            {/* ========================================= */}
            <div className="hidden lg:block">
                {/* --- Top Blue Bar --- */}
                <div className={`bg-[#050c4e] flex items-center px-4 md:px-8 relative transition-all duration-500 ${isScrolled ? "h-0 opacity-0 invisible" : "h-[60px] opacity-100 visible"}`}>

                    {/* Navigation Links */}
                    <div className="flex items-center ml-36 space-x-6 text-white font-bold text-sm overflow-x-auto no-scrollbar">
                        <a href="#featured-cars" className="hover:opacity-80 transition-all duration-300 whitespace-nowrap ">Available Cars</a>
                        <Link href="/how-we-deliver" className="hover:opacity-80 transition-all duration-300 whitespace-nowrap">How We Deliver</Link>
                        <Link href="/choose-us" className="hover:opacity-80 transition-all duration-300 whitespace-nowrap">Why Choose Us</Link>
                        <a href="#" className="hover:opacity-80 transition-all duration-300 whitespace-nowrap">Testimonials</a>
                        <Link href="/faqs" className="hover:opacity-80 transition-all duration-300 whitespace-nowrap">FAQ's</Link>
                    </div>

                    {/* Right Side Icons */}
                    <div className="ml-auto flex items-center space-x-3">
                        <div className="bg-[#051072] text-white flex items-center px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#020f86] transition-colors duration-300">
                            <div className="bg-white rounded-full p-1.5 mr-2">
                                <Phone size={14} className="text-[#050c4e]" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xs opacity-90 font-medium">+61 466 318 074</span>
                            </div>
                        </div>

                        <div className="bg-[#051072] text-white flex items-center px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#020f86] transition-colors duration-300">
                            <MapPin size={18} className="mr-2" />
                            <div className="flex flex-col leading-none pr-4">
                                <span className="text-xs opacity-90 font-medium">Located At:</span>
                                <span className="text-[10px] font-bold">Australia</span>
                            </div>
                        </div>

                        <div className="relative cursor-pointer text-black bg-white p-2 rounded-full">
                            <Mail size={20} />
                        </div>

                        <div className="flex items-center bg-[#020f86] rounded-full px-0.5 py-0.5 cursor-pointer border border-[#8ec6e8]">
                            <Link href="/cart" className="bg-white rounded-full p-2">
                                <ShoppingCart size={20} className="text-gray-700" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Filter Bar --- */}
                <div className="bg-white py-3 px-4 md:px-8 flex items-center space-x-3 shadow-sm relative overflow-visible">
                    {/* Logo */}
                    <div className={`rounded-full shadow-lg z-[110] absolute transition-all duration-500 ease-in-out bg-white flex items-center justify-center ${isScrolled ? "top-1 left-4 w-[55px] h-[55px]" : "-top-12 left-6 w-[100px] h-[100px]"}`}>
                        <Link href="/" className="relative w-[90%] h-[90%]">
                            <Image src={logo} alt="Car From Japan" fill className="object-contain rounded-full" />
                        </Link>
                    </div>

                    <div className={`transition-all duration-500 ${isScrolled ? "min-w-[65px]" : "min-w-[125px]"}`}></div>

                    {/* Search Input */}
                    <div className="relative flex-0.5 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="w-full bg-gray-100 py-2.5 pl-10 pr-4 rounded-md outline-none text-sm placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                        />
                    </div>

                    <NavbarDropdowns
                        searchQuery={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                        onTriggerSearch={handleTriggerSearch}
                    />

                    <button onClick={handleSearchClick} className="bg-[#050c4e] text-white font-bold py-2.5 px-10 rounded-md hover:bg-[#020f86] transition-colors duration-300 cursor-pointer text-sm">
                        Search
                    </button>
                </div>
            </div>

            {/* ========================================= */}
            {/*           MOBILE VIEW (< lg)              */}
            {/* ========================================= */}
            <div className="lg:hidden bg-white shadow-sm w-full sticky top-0 z-[100]">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="relative w-16 h-16 shadow-sm rounded-full">
                        <Link href="/">
                            <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/cart" className="p-2 text-blue-700">
                            <ShoppingCart size={22} />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 text-[#050c4e] bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                {/* 
                   ================================================================
                   MOBILE SLIDE-OUT DRAWER (Smooth Animation Fix)
                   ================================================================
                   We do NOT use conditional rendering (&&). We keep it mounted 
                   and use CSS transforms to slide it in/out smoothly.
                */}
                <div className={`fixed inset-0 z-[200] flex justify-end transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"}`}>

                    {/* 1. Backdrop (Fades in/out) */}
                    <div
                        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>

                    {/* 2. Drawer Content (Slides Right/Left) */}
                    <div
                        className={`relative w-full md:w-[400px] h-full bg-white shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                    >

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b bg-[#050c4e] text-white">
                            <span className="font-bold text-lg">Elite Motor Cars</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full cursor-pointer transition-colors duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 flex flex-col gap-6 pb-10">
                            {/* 1. Search Section */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-400 uppercase">Search Inventory</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search cars..."
                                        className="w-full bg-gray-100 py-3 pl-10 pr-4 rounded-md outline-none text-sm focus:ring-1 focus:ring-[#050c4e]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Responsive Dropdowns */}
                                <div className="flex flex-col w-full gap-3">
                                    <NavbarDropdowns
                                        className="flex-col w-full items-stretch space-x-0 gap-3"
                                        searchQuery={searchQuery}
                                        onTriggerSearch={handleTriggerSearch}
                                        isMobile={true}
                                    />
                                </div>

                                <button
                                    onClick={handleSearchClick}
                                    className="w-full bg-[#050c4e] text-white font-bold py-3 rounded-md mt-2 shadow-lg hover:bg-[#020f86] cursor-pointer transition-all duration-300 active:scale-95"
                                >
                                    Search Results
                                </button>
                            </div>

                            <hr className="border-gray-100" />

                            {/* 2. Navigation Links */}
                            <div className="flex flex-col space-y-4">
                                <span className="text-xs font-bold text-gray-400 uppercase">Pages</span>
                                <Link href="/#featured-cars" className="flex items-center gap-3 text-gray-700 font-medium hover:text-[#050c4e] transition-colors">
                                    <Home size={18} /> Available Cars
                                </Link>
                                <Link href="/how-we-deliver" className="flex items-center gap-3 text-gray-700 font-medium hover:text-[#050c4e] transition-colors">
                                    <Truck size={18} /> How We Deliver
                                </Link>
                                <Link href="/choose-us" className="flex items-center gap-3 text-gray-700 font-medium hover:text-[#050c4e] transition-colors">
                                    <Info size={18} /> Why Choose Us
                                </Link>
                                <Link href="/faqs" className="flex items-center gap-3 text-gray-700 font-medium hover:text-[#050c4e] transition-colors">
                                    <HelpCircle size={18} /> FAQ's
                                </Link>
                            </div>

                            <hr className="border-gray-100" />

                            {/* 3. Contact Info */}
                            <div className="bg-blue-50 p-4 rounded-xl space-y-3">
                                <div className="flex items-center gap-3 text-[#050c4e]">
                                    <div className="bg-white p-2 rounded-full shadow-sm"><Phone size={16} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Call Us</p>
                                        <p className="text-sm font-bold">+61 466 318 074</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-[#050c4e]">
                                    <div className="bg-white p-2 rounded-full shadow-sm"><MapPin size={16} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Location</p>
                                        <p className="text-sm font-bold">Australia</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-[#050c4e]">
                                    <div className="bg-white p-2 rounded-full shadow-sm"><Mail size={16} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Email Us</p>
                                        <p className="text-sm font-bold">sales@carfromjapan.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
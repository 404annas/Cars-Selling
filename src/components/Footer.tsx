"use client";

import footerImg from "@/assets/footerMainImg.jpg";
import {
    Facebook,
    Instagram,
    X,
    Youtube,
    Linkedin,
    Twitter,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
    const scrollToSection = (href: string) => {
        // Handle internal anchor links
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without causing page reload
                window.history.pushState(null, '', href);
            }
        }
    }

    return (
        <footer className="relative w-full h-screen text-white overflow-hidden">
            {/* Background Image */}
            <Image
                src={footerImg}
                priority={true}
                width={5000}
                alt="Footer Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-10 flex flex-col justify-between py-10 sm:py-16">

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left Text */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none max-w-2xl orb">
                        <span className="text-blue-500">ELITE MOTOR CARS</span>.
                        <br />
                        ELEGANCE AND <span className="text-blue-500">SPORTINESS</span>.
                    </h2>

                    {/* Navigation Links */}
                    <div className="sm:ml-auto grid grid-cols-2 gap-x-0 sm:gap-x-10 gap-y-2 text-sm text-left">
                        <button
                            onClick={() => scrollToSection("#home")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection("#our-fleet")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Our Fleet
                        </button>
                        <button
                            onClick={() => scrollToSection("#about")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Choose Us
                        </button>
                        <button
                            onClick={() => scrollToSection("#how-it-works")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            How We Work
                        </button>
                        <button
                            onClick={() => scrollToSection("#featured-cars")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Featured Cars
                        </button>
                        <button
                            onClick={() => scrollToSection("#testimonials")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Testimonials
                        </button>
                        <button
                            onClick={() => scrollToSection("#faq")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Faqs
                        </button>
                        <button
                            onClick={() => scrollToSection("#contact")}
                            className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-left"
                        >
                            Contact
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center gap-6">

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400 hover:-translate-y-1 transition-all duration-300" />
                        <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-400 hover:-translate-y-1 transition-all duration-300" />
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 hover:-translate-y-1 transition-all duration-300" />
                        <Youtube className="w-5 h-5 cursor-pointer hover:text-blue-400 hover:-translate-y-1 transition-all duration-300" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-400 hover:-translate-y-1 transition-all duration-300" />
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-gray-400 text-center">
                        Copyright © 2026 Elite Motor Cars | All rights reserved | Developed by <a className="text-gray-300" href="http://techxudo.com/" target="_blank">Techxudo</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
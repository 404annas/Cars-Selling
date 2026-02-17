import React from 'react';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import logo from "@/assets/logo.svg"
import Image from 'next/image';
import { Locate, Mail, MapPin, Phone } from 'lucide-react';

const Footer2 = () => {
    return (
        <footer className="bg-[#050c4e] text-white pb-6 pt-10 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Left Side: Logo & Description */}
                <div className="flex-1 max-w-2xl">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 mb-6">
                        <Image className='rounded-full' src={logo.src} alt="Logo" width={100} height={150} priority={true} />
                    </div>

                    {/* About Text */}
                    <p className="text-gray-300 text-sm md:text-base leading-normal mb-4">
                        Elite Motor Cars is the most trusted way of buying and selling used cars. Choose from over
                        10K fully inspected second-hand car models. Select online and book a test drive at
                        your home or at a Elite Motor Cars near you. Get a no-questions-asked* 5-day
                        money back guarantee and a free one-year comprehensive service warranty with
                        Assured Resale Value on every Elite Motor Cars.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl">
                        <FaInstagram className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
                        <FaLinkedinIn className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
                        <FaFacebookF className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
                        <FaXTwitter className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
                    </div>
                </div>

                {/* Right Side: Links Column */}
                <div className="flex-shrink-0">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Navigation</h3>
                    <ul className="space-y-3 text-gray-300 text-[15px]">
                        {["Home", "Available Cars", "How We Deliver", "Why Choose Us", "Testimonials", "FAQ's"].map((item) => (
                            <li key={item}>
                                <a href="#" className="hover:text-white transition-colors">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-shrink-0">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Contact</h3>
                    <div className='flex items-center gap-2 mb-2 bg-blue-900 rounded-xl px-6 py-4'>
                        <Mail size={20}/>
                        <p>contact@elitemotorcars.com.au</p>
                    </div>
                    <div className='flex items-center gap-2 mb-2 bg-blue-900 rounded-xl px-6 py-4'>
                        <Phone size={20}/>
                        <p>+61 466 318 074</p>
                    </div>
                    <div className='flex items-center gap-2 mb-2 bg-blue-900 rounded-xl px-6 py-4'>
                        <MapPin size={20}/>
                        <p>164-166 High Street, Australia</p>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-gray-400 text-sm gap-4 sm:text-left text-center sm:items-start items-center">
                <p>Copyright © 2026 Elite Motor Cars | All rights reserved</p>
                <div className="flex gap-6">
                    <p>Developed By <a className='text-white' href="http://techxudo.com/" target='_blank'>Techxudo</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer2;
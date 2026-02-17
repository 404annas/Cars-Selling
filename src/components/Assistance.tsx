import React from 'react';
import { Phone, ChevronRight, Mail } from 'lucide-react';
// Aapki image import
import assistImg from "@/assets/assist.svg";

const Assistance = () => {
    return (
        <section className="py-10 bg-black flex flex-col items-center px-4">
            {/* Heading - Dark Purple Color */}
            <h2 className="text-red-600 text-xl md:text-2xl font-bold mb-8 text-center">
                Need further assistance?
            </h2>

            {/* Cards Container */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl justify-center">

                {/* Call Us Card */}
                <div className="flex-1 flex items-center p-4 sm:p-6 border border-red-200 rounded-2xl cursor-pointer">
                    {/* Circular Icon Background (Pinkish) */}
                    <div className="w-14 h-12 rounded-full bg-[#fdb0b0] flex items-center justify-center mr-4">
                        <Phone size={20} className="text-red-600 fill-red-600" />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <p className="text-red-600 font-semibold text-sm sm:text-base">
                            Call us on <span className="font-bold">+61 466 318 074</span>
                        </p>
                        <ChevronRight size={20} className="text-red-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* See how Selling works Card */}
                <div className="flex-1 flex items-center p-4 sm:p-6 border border-red-200 rounded-2xl cursor-pointer group">
                    {/* Illustration Icon */}
                    <div className="w-14 h-12 rounded-full bg-[#fdb0b0] flex items-center justify-center mr-4">
                        <Mail size={20} className="text-red-600" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-red-600 font-semibold text-sm sm:text-base">
                            contact@elitemotorcars.com.au
                        </p>
                        {/* Right Arrow Icon */}
                        <ChevronRight size={20} className="text-red-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Assistance;
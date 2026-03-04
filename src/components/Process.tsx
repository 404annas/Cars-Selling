import React from 'react';
import processImg from "@/assets/process1.svg";

const Process = () => {
    return (
        <div className="flex items-center justify-center py-10 px-4 bg-black">
            {/* Main Container: White box with shadow and rounded corners */}
            <div className="bg-black rounded-2xl border border-orange-400 flex flex-col md:flex-row items-center max-w-5xl w-full p-6 md:p-8 overflow-hidden relative">
                {/* Left Side: Illustration */}
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 z-10">
                    <img
                        loading='lazy'
                        src={processImg.src}
                        alt="Finance Process Illustration"
                        className="w-full max-w-[350px] h-auto object-contain"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 px-2 md:px-10 z-10">
                    <h2 className="text-[#f23410] text-base sm:text-lg md:text-xl font-bold mb-8">
                        Enter Your Details To Request A Call Back
                    </h2>

                    <form className="space-y-4">
                        {/* Full Name Input */}
                        <input
                            type="text"
                            placeholder="Enter your Full name"
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-[#f23410] transition-colors placeholder:text-gray-400 text-white text-base"
                        />

                        {/* Mobile Number Input */}
                        <input
                            type="text"
                            placeholder="Enter Your Mobile Number"
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-[#f23410] transition-colors placeholder:text-gray-400 text-white text-base"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#f23410] hover:bg-[#d92c0d] text-white font-bold py-4 rounded-lg transition-all duration-300 cursor-pointer uppercase tracking-wider text-sm"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Footer Text */}
                    <p className="text-gray-500 text-xs mt-6 text-center">
                        I agree to
                        <span className="text-[#f23410] cursor-pointer"> terms </span>
                        and
                        <span className="text-[#f23410] cursor-pointer"> privacy policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Process;
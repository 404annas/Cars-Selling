"use client";
import { DotLottiePlayer } from '@dotlottie/react-player';

const Benefits = () => {
    const benefits = [
        {
            id: 1,
            src: "/lottie/benifit1.lottie",
            title: "Compliance",
        },
        {
            id: 2,
            src: "/lottie/benifit2.lottie",
            title: "Transparency",
        },
        {
            id: 3,
            src: "/lottie/benifit3.lottie",
            title: "Security",
        },
    ];

    return (
        <section className="w-full py-10 bg-[#F8F8F8]">
            <div className="container mx-auto px-4">

                {/* Title */}
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-black mb-10">
                    Benefits With Us
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-lg mx-auto">
                    {benefits.map((item) => (
                        <div
                            key={item.id}
                            className="bg-black rounded-2xl h-[200px] flex flex-col items-center justify-center p-4 transition-transform hover:-translate-y-1 duration-300 shadow-sm"
                        >
                            {/* Lottie Animation */}
                            <div className="w-30 h-30 mb-2">
                                {/* 2. Corrected Component Name */}
                                <DotLottiePlayer
                                    src={item.src}
                                    loop
                                    autoplay
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>

                            {/* Text */}
                            <p className="text-white text-base font-medium text-center leading-tight whitespace-pre-line">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
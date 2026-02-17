import { Star } from "lucide-react";
import Image from "next/image";

import testi1Img from "@/assets/testi1.avif";
import testi2Img from "@/assets/testi2.avif";
import testi3Img from "@/assets/testi3.avif";
import testi4Img from "@/assets/testi4.avif";
import testi5Img from "@/assets/testi5.avif";
import testi6Img from "@/assets/testi6.avif";

const testimonials = [
    {
        name: "Mark Stevens",
        image: testi1Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
    {
        name: "Lisa Anderson",
        image: testi2Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
    {
        name: "Brian T",
        image: testi3Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
    {
        name: "Emma Johnson",
        image: testi4Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
    {
        name: "Jessica Ramirez",
        image: testi5Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
    {
        name: "Laura J.",
        image: testi6Img,
        rating: 5,
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptate hic quia modi quae! Nulla eligendi architecto in ullam.",
    },
];

const Testimonials = () => {
    return (
        <section className="w-full py-10 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold orb">
                        TESTIMONIALS
                    </h2>

                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 cursor-pointer orb sm:text-base text-sm sm:w-fit w-full">
                        CONTACT US
                    </button>
                </div>                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#F7F7F7] rounded-2xl p-8 flex flex-col justify-between min-h-[260px]"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-sm ${i < item.rating ? "text-blue-500" : "text-blue-500"
                                            }`}
                                    >
                                        <Star size={20} />
                                    </span>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {item.text}
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <p className="font-medium orb text-gray-900">
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
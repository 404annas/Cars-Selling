"use client"

import Image from "next/image"
import Link from "next/link"
import {
    Gauge,
    Fuel,
    Settings,
    Cog,
    Key
} from "lucide-react"

// ... (Keep your existing image imports here)
import lamboMain from "@/assets/lamboMain.png";
import lamboSec from "@/assets/lamboSec.jpg";
import lamboSec2 from "@/assets/lamboSec2.jpg";
import audiMain from "@/assets/audiMain.png";
import audiSec from "@/assets/audiSec.jpg";
import ferrariMain from "@/assets/ferrariMain.png";
import ferrariSec from "@/assets/ferrariSec.jpg";
import ferrariSec2 from "@/assets/ferrariSec2.jpg"
import bmwMain from "@/assets/bmwMain.png"
import bmwSec from "@/assets/bmwSec.jpg"

import car1 from "@/assets/car1.avif"
import car2 from "@/assets/car2.avif"
import car3 from "@/assets/car3.avif"
import car4 from "@/assets/car4.avif"
import car5 from "@/assets/car5.avif"
import car6 from "@/assets/car6.avif"
import car7 from "@/assets/car7.avif"
import car8 from "@/assets/car8.avif"
import car9 from "@/assets/car9.avif"
import car10 from "@/assets/car10.avif"
import car11 from "@/assets/car11.avif"
import car12 from "@/assets/car12.avif"
import car13 from "@/assets/car13.avif"
import car14 from "@/assets/car14.avif"
import car15 from "@/assets/car15.avif"
import car16 from "@/assets/car16.avif"
import car17 from "@/assets/car17.avif"
import car18 from "@/assets/car18.avif"
import car19 from "@/assets/car19.avif"
import car20 from "@/assets/car20.jpg"
import car21 from "@/assets/car21.jpg"
import car22 from "@/assets/car22.jpg"

const cars = [
    {
        name: "Toyota Prius 2011",
        meta: "3 Years Warranty Included",
        img: car1,
        image: car1,
        price: "AUD $14,500",
        specs: [
            { icon: Gauge, label: "64,000 km" },
            { icon: Cog, label: "1.8L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Toyota Crown Sedan 2010",
        meta: "1 Year warranty for peace of mind",
        img: car2,
        image: car2,
        price: "AUD $17,500",
        specs: [
            { icon: Gauge, label: "89,000 km" },
            { icon: Cog, label: "3.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Honda Vezel 2014",
        meta: "5 years warranty",
        img: car3,
        image: car3,
        price: "AUD $16,500",
        specs: [
            { icon: Gauge, label: "99 km" },
            { icon: Cog, label: "4.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "LEXUS LS460 V8 2012",
        meta: "3 Years warranty",
        img: car4,
        image: car4,
        price: "AUD $24, 999",
        specs: [
            { icon: Gauge, label: "93 km" },
            { icon: Cog, label: "4.6L" },
            { icon: Settings, label: "AWD" },
        ],
    },
    {
        name: "Lexus LS460 2006, V8 Luxury",
        meta: "5 Years Warranty",
        img: car5,
        image: car5,
        price: "AUD $34,500",
        specs: [
            { icon: Gauge, label: "135,000 km" },
            { icon: Cog, label: "4.6L" },
            { icon: Settings, label: "Automatic" },
        ],
    },
    {
        name: "Mitsubishi Lancer Evolution 2007",
        meta: "5 years mechanical warranty ",
        img: car6,
        image: car6,
        price: "AUD $32,000",
        specs: [
            { icon: Gauge, label: "50,200 km" },
            { icon: Cog, label: "2.0L" },
            { icon: Settings, label: "Dual-Clutch" },
        ],
    },
    {
        name: "Lexus LS460 V8 2007",
        meta: "3 Years warranty",
        img: car7,
        image: car7,
        price: "AUD $16,900",
        specs: [
            { icon: Gauge, label: "154,000 km" },
            { icon: Cog, label: "4.6L" },
            { icon: Settings, label: "Automatic" },
        ],
    },
    {
        name: "Toyota C-HR Hybrid G Mode-Nero",
        meta: "6-Month Warranty",
        img: car8,
        image: car8,
        price: "AUD $26,500",
        specs: [
            { icon: Gauge, label: "60,000 km" },
            { icon: Cog, label: "1.8L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Mercedes-Benz S400h Hybrid",
        meta: "1 year warranty",
        img: car9,
        image: car9,
        price: "AUD $28,500",
        specs: [
            { icon: Gauge, label: "40,000 km" },
            { icon: Cog, label: "3.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Honda Grace Hybrid EX 2015",
        meta: "1 Year Rego & Ctp",
        img: car10,
        image: car10,
        price: "AUD $16,000",
        specs: [
            { icon: Gauge, label: "43,000 km" },
            { icon: Cog, label: "1.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Toyota Yaris Hybrid G AWD 2020",
        meta: "1 Year Rego + CTP Included",
        img: car11,
        image: car11,
        price: "AUD $18,500",
        specs: [
            { icon: Gauge, label: "100,000 km" },
            { icon: Cog, label: "4.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Lexus LS460 V8 RWD 2013",
        meta: "4 years warranty",
        img: car12,
        image: car12,
        price: "AUD $26,800",
        specs: [
            { icon: Gauge, label: "80,000 km" },
            { icon: Cog, label: "4.6L" },
            { icon: Settings, label: "Automatic" },
        ],
    },
    {
        name: "Honda Fit Hybrid eHEV Hatchback",
        meta: "Warranty",
        img: car13,
        image: car13,
        price: "AUD $23,000",
        specs: [
            { icon: Gauge, label: "100 km" },
            { icon: Cog, label: "3.0L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Suzuki Swift Hybrid Hatchback",
        meta: "Warranty",
        img: car14,
        image: car14,
        price: "AUD $18,000",
        specs: [
            { icon: Gauge, label: "40,000 km" },
            { icon: Cog, label: "1.2L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Honda Fit Hybrid 2018",
        meta: "Warranty",
        img: car15,
        image: car15,
        price: "AUD $18,000",
        specs: [
            { icon: Gauge, label: "100 km" },
            { icon: Cog, label: "1.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Toyota Crown RS Advance 2019",
        meta: "Warranty",
        img: car16,
        image: car16,
        price: "AUD $39,999",
        specs: [
            { icon: Gauge, label: "40,000 km" },
            { icon: Cog, label: "2.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Lexus LS460 V8 RWD 2007",
        meta: "Warranty",
        img: car17,
        image: car17,
        price: "AUD $25,999",
        specs: [
            { icon: Gauge, label: "200,000 km" },
            { icon: Cog, label: "4.6L" },
            { icon: Settings, label: "Automatic" },
        ],
    },
    {
        name: "Honda Vezel Hybrid 2014",
        meta: "Warranty",
        img: car18,
        image: car18,
        price: "AUD $17,000",
        specs: [
            { icon: Gauge, label: "60,000 km" },
            { icon: Cog, label: "1.5L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "Toyota C-HR Hybrid 2018",
        meta: "Warranty",
        img: car19,
        image: car19,
        price: "AUD $26,000",
        specs: [
            { icon: Gauge, label: "50,000 km" },
            { icon: Cog, label: "1.8L" },
            { icon: Settings, label: "Hybrid" },
        ],
    },
    {
        name: "2007 LEXUS LS600HL V8 5000CC",
        meta: "1 Year warranty for peace of mind",
        img: car20,
        image: car20,
        price: "AUD $29,000",
        specs: [
            { icon: Gauge, label: "72,000 km" },
            { icon: Cog, label: "5.0L" },
            { icon: Settings, label: "Hybrid" },
        ]
    },
    {
        name: "2013 BMW M5 F10 4.4L TWIN TURBO V8",
        meta: "3 years extended warranty",
        img: car21,
        image: car21,
        price: "AUD $48,499",
        specs: [
            { icon: Gauge, label: "123,000 km" },
            { icon: Cog, label: "4.4L" },
            { icon: Settings, label: "Twin Turbo" },
        ]
    },
    {
        name: "2023 Yaris Hybrid 4WD",
        meta: "1 year Rego + CTP Included",
        img: car22,
        image: car22,
        price: "AUD $25,000",
        specs: [
            { icon: Gauge, label: "6500 km" },
            { icon: Cog, label: "4.0L" },
            { icon: Settings, label: "Hybrid" },
        ]
    },
]

const FeaturedCars = () => {
    return (
        <section className="px-4 sm:px-10 py-10 bg-black">

            {/* Header */}
            <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold orb text-red-600">
                    FEATURED CARS
                </h2>

                <Link href="/cars/list">
                    <button className="bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:scale-98 transition-all duration-300 cursor-pointer orb sm:text-base text-sm w-full sm:w-fit">
                        SHOW ALL
                    </button>
                </Link>
            </div>

            {/* Cards - Only show first 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {cars.slice(0, 6).map((car, index) => (
                    <div
                        key={index}
                        className="border border-[#E5E5E5] rounded-2xl p-4 mb-4"
                    >
                        {/* Title */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                    src={car.img}
                                    alt={car.name}
                                    fill
                                    // width={500}
                                    // height={500}
                                    className="object-cover object-center"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold orb text-base sm:text-lg leading-none text-white">{car.name}</h3>
                                <p className="text-sm text-gray-400">{car.meta}</p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 sm:h-80 w-full mb-4 rounded-xl overflow-hidden group">
                            <Image
                                src={car.img}
                                alt={car.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                            />
                        </div>

                        {/* Specs */}
                        <div className="bg-black text-white rounded-xl p-0 space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-red-950 rounded-xl py-3 pl-2 pr-1">
                                {car.specs.map((spec, i) => {
                                    const Icon = spec.icon
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <Icon size={22} />
                                            <span>{spec.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Price */}
                            <p className="text-xl orb font-semibold">{car.price}</p>

                            {/* Button */}
                            <Link href={`/cars/${index}`}>
                                <button className="w-full bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 orb transition-all duration-300 cursor-pointer sm:text-base text-sm">
                                    SEE DETAILS
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}

export default FeaturedCars
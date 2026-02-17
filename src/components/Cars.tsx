"use client"

import React from 'react';
import { ArrowUpRight, Gauge, DollarSign } from 'lucide-react';
import carBack from '@/assets/carBack.png';

import cardCard1 from "@/assets/mercedes.png"
import cardCard2 from "@/assets/toyota.png"
import cardCard3 from "@/assets/lexus.png"
import cardCard4 from "@/assets/mitsubishi.png"
import cardCard5 from "@/assets/honda.png"
import cardCard6 from "@/assets/suzuki.png"
import { FaFire } from 'react-icons/fa';

const Cars = () => {
    const carData = [
        { name: "Mercedes", price: "10", km: "80", color: "bg-green-100", anoColor: "bg-green-200", img: cardCard1.src, discount: "15" },
        { name: "Toyota", price: "12", km: "80", color: "bg-red-100", anoColor:"bg-red-200", img: cardCard2.src, discount: "20" },
        { name: "Lexus", price: "16", km: "80", color: "bg-yellow-100", anoColor:"bg-yellow-200", img: cardCard3.src, discount: "15" },
        { name: "Mitsubushi", price: "13", km: "80", color: "bg-purple-100", anoColor:"bg-purple-200", img: cardCard4.src, discount: "15" },
        { name: "Honda", price: "13", km: "80", color: "bg-blue-100", anoColor:"bg-blue-200", img: cardCard5.src, discount: "15" },
        { name: "Suzuki", price: "13", km: "80", color: "bg-orange-100", anoColor:"bg-orange-200", img: cardCard6.src, discount: "15" },
    ];

    return (
        <section className="py-10 px-4 sm:px-10 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
                {carData.map((car, index) => (
                    <div
                        key={index}
                        className={`group relative ${car.color}
  rounded-3xl
  p-6 transition-all duration-500 overflow-hidden`}
                    >

                        {/* Car Image */}
                        {/* Hover par ye scale down (choti) hogi */}
                        <div className="relative h-44 flex items-center justify-center z-10">
                            <img
                                loading='lazy'
                                src={car.img}
                                alt={car.name}
                                className="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-90"
                            />
                        </div>
                        <h1 className={`orb ${car.anoColor} px-4 py-2 text-sm text-center mt-2 rounded-full font-medium`}>{car.name}</h1>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Cars;
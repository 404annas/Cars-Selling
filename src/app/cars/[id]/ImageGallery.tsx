"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ImageGalleryProps {
  images: StaticImageData[];
  carName: string;
  isSold: boolean;
}

export default function ImageGallery({ images, carName, isSold }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-sm border border-red-800 bg-black">
        <Image
          src={mainImage}
          alt={carName}
          fill
          className="object-contain object-center transition-all duration-500"
          priority
        />
        <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-bold shadow-md orb ${
          isSold 
            ? 'bg-gray-700 text-gray-400' 
            : 'bg-red-500 text-white'
        }`}>
          {isSold ? "Out of Stock" : "In Stock"}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer outline-none
              ${mainImage === img ? "border-red-500" : "border-transparent opacity-70 hover:opacity-100"}
            `}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              fill
              quality={100}
              sizes="(max-width: 768px) 25vw, 15vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

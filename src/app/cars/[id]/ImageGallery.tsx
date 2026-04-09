"use client";

import { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: string[];
  carName: string;
  isSold: boolean;
}

export default function ImageGallery({ images, carName, isSold }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-sm border border-[#f23410] bg-black">
        <img src={mainImage} alt={carName} className="w-full h-full object-contain object-center transition-all duration-500" />
        <div className={isSold
          ? "absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-bold shadow-md orb bg-gray-700 text-gray-400"
          : "absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-bold shadow-md orb bg-[#f23410] text-white"}>
          {isSold ? "Out of Stock" : "In Stock"}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={img + index}
            onClick={() => setMainImage(img)}
            className={(mainImage === img
              ? "relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer outline-none border-[#f23410]"
              : "relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer outline-none border-transparent opacity-70 hover:opacity-100")}
          >
            <img src={img} alt={carName + " thumbnail " + index} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

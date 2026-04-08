"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import type { PublicCar } from "@/features/cars/public.types";

interface AddToCartButtonProps {
  carData: PublicCar;
}

export default function AddToCartButton({ carData }: AddToCartButtonProps) {
  const isSold = carData.status === "sold" || carData.priceAUD === null;

  return (
    <button
      onClick={() => {
        // Get existing cart items from localStorage or initialize empty array
        const existingCart =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cart") || "[]")
            : [];

        // Check if the car is already in the cart
        const carExists = existingCart.some((item: { id: string }) => item.id === carData._id);

        if (!carExists) {
          const cartItem = {
            id: carData._id,
            name: carData.name,
            price:
              carData.priceAUD === null ? "SOLD" : `AUD $${carData.priceAUD.toLocaleString()}`,
            images: carData.images,
            specs: {
              year: String(carData.specs.year),
              mileage: `${carData.specs.mileageKm.toLocaleString()} km`,
              fuel: carData.specs.fuelType,
              engine: carData.specs.engineDisplacement,
            },
          };

          // Add the car to the cart
          const updatedCart = [...existingCart, cartItem];

          // Save updated cart to localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }

          toast.success(`${carData.name} has been added to your cart!`, {
            action: {
              label: "Go to Cart",
              onClick: () => (window.location.href = "/cart"),
            },
          });
        } else {
          toast.error(`${carData.name} is already in your cart.`);
        }
      }}
      disabled={isSold}
      className={`flex-1 border-2 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
        isSold
          ? "bg-gray-800 border-gray-700 text-gray-500 hover:cursor-not-allowed"
          : "bg-black border-orange-200 hover:border-[#f23410] hover:text-[#f23410] text-gray-400 active:scale-95"
      }`}
    >
      <ShoppingCart size={20} />
      {isSold ? "Sold Out" : "Add to Cart"}
    </button>
  );
}

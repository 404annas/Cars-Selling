"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import { CarDetails } from "@/data/cars";

interface AddToCartButtonProps {
  carData: CarDetails;
}

export default function AddToCartButton({ carData }: AddToCartButtonProps) {
  const isSold = carData.price === "SOLD";

  return (
    <button
      onClick={() => {
        // Get existing cart items from localStorage or initialize empty array
        const existingCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];

        // Check if the car is already in the cart
        const carExists = existingCart.some((item: CarDetails) => item.id === carData.id);

        if (!carExists) {
          // Add the car to the cart
          const updatedCart = [...existingCart, carData];

          // Save updated cart to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
          }

          toast.success(`${carData.name} has been added to your cart!`, {
            action: {
              label: 'Go to Cart',
              onClick: () => window.location.href = '/cart',
            },
          });
        } else {
          toast.error(`${carData.name} is already in your cart.`);
        }
      }}
      disabled={isSold}
      className={`flex-1 border-2 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
        isSold
          ? 'bg-gray-800 border-gray-700 text-gray-500 hover:cursor-not-allowed'
          : 'bg-black border-red-200 hover:border-red-500 hover:text-red-600 text-gray-400 active:scale-95'
      }`}
    >
      <ShoppingCart size={20} />
      {isSold ? "Sold Out" : "Add to Cart"}
    </button>
  );
}

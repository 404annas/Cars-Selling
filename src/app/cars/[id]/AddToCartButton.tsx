"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import { CarDetails } from "@/data/cars";

interface AddToCartButtonProps {
  carData: CarDetails;
}

export default function AddToCartButton({ carData }: AddToCartButtonProps) {
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
      className="flex-1 bg-black border-2 border-red-200 hover:border-red-500 hover:text-red-600 text-gray-400 font-bold py-4 rounded-lg transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 cursor-pointer"
    >
      <ShoppingCart size={20} />
      Add to Cart
    </button>
  );
}

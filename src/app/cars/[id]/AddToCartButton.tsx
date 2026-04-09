"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { FrontendCar } from "@/types/car";

interface AddToCartButtonProps {
  carData: FrontendCar;
}

export default function AddToCartButton({ carData }: AddToCartButtonProps) {
  const isSold = carData.price === "SOLD" || carData.status === "sold";

  return (
    <button
      onClick={() => {
        const existingCart = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [];
        const carExists = existingCart.some((item: FrontendCar) => item.id === carData.id);

        if (carExists) {
          toast.error(carData.name + " is already in your cart.");
          return;
        }

        const updatedCart = existingCart.concat(carData);

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }

        toast.success(carData.name + " has been added to your cart!", {
          action: {
            label: "Go to Cart",
            onClick: () => {
              window.location.href = "/cart";
            },
          },
        });
      }}
      disabled={isSold}
      className={isSold
        ? "flex-1 border-2 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer bg-gray-800 border-gray-700 text-gray-500 hover:cursor-not-allowed"
        : "flex-1 border-2 font-bold py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer bg-black border-orange-200 hover:border-[#f23410] hover:text-[#f23410] text-gray-400 active:scale-95"}
    >
      <ShoppingCart size={20} />
      {isSold ? "Sold Out" : "Add to Cart"}
    </button>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";

export default function CarDetailsByQuery() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="min-h-screen bg-black px-4 py-16 text-center text-white">
        <h1 className="orb text-3xl font-bold text-[#f23410]">Car Not Found</h1>
        <p className="mt-3 text-zinc-400">No vehicle id was provided.</p>
      </div>
    );
  }

  return <CarDetailsContent id={id} />;
}

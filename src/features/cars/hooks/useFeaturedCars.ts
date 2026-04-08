"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedCars } from "@/features/cars/public.api";

export function useFeaturedCars() {
  return useQuery({
    queryKey: ["featured-cars"],
    queryFn: getFeaturedCars,
  });
}

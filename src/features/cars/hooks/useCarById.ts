"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/features/cars/public.api";

export function useCarById(id: string) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    enabled: Boolean(id),
  });
}

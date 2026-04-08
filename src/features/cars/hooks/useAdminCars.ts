"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminCars } from "@/features/cars/api";

export function useAdminCars() {
  return useQuery({
    queryKey: ["admin-cars"],
    queryFn: fetchAdminCars,
  });
}

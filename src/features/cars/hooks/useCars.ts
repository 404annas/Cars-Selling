"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCars } from "@/features/cars/public.api";

interface UseCarsParams {
  status?: "available" | "sold" | "reserved";
  tag?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  fromYear?: number;
  toYear?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export function useCars(params?: UseCarsParams) {
  return useQuery({
    queryKey: ["cars", params ?? {}],
    queryFn: () => getCars(params),
    placeholderData: keepPreviousData,
  });
}

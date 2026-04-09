"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarById, getCars, getFeaturedCars } from "@/lib/api";
import { toFrontendCar } from "@/lib/cars";

type CarsQueryParams = {
  status?: "available" | "sold" | "reserved";
  tag?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  fromYear?: string;
  toYear?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

function buildQueryString(params: CarsQueryParams = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams.toString();
}

export function useCars(params: CarsQueryParams = {}) {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["cars", queryString],
    queryFn: async () => {
      const response = await getCars(queryString);
      return {
        ...response,
        data: response.data.map(toFrontendCar),
      };
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useFeaturedCars() {
  return useQuery({
    queryKey: ["cars", "featured"],
    queryFn: async () => {
      const response = await getFeaturedCars();
      return response.data.map(toFrontendCar);
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useAvailableCars() {
  return useCars({ status: "available", limit: 50, sort: "sortOrder_asc" });
}

export function useSoldCars() {
  return useCars({ status: "sold", limit: 50, sort: "sortOrder_asc" });
}

export function useCarById(id: string) {
  return useQuery({
    queryKey: ["cars", "detail", id],
    queryFn: async () => {
      const response = await getCarById(id);
      return toFrontendCar(response.data);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

import type { CarResponse, CarsResponse } from "@/types/car";

async function fetchJson<T>(input: string): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok === false) {
    const errorText = await response.text();
    throw new Error(errorText || "Request failed with status " + response.status);
  }

  return response.json() as Promise<T>;
}

export async function getCars(query?: string) {
  const search = query ? "?" + query : "";
  return fetchJson<CarsResponse>("/api/cars" + search);
}

export async function getFeaturedCars() {
  return fetchJson<CarsResponse>("/api/cars/featured");
}

export async function getCarById(id: string) {
  return fetchJson<CarResponse>("/api/cars/" + id);
}

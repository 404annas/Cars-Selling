import type { CarsResponse, PublicCar } from "@/features/cars/public.types";

function toParams(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getCars(params?: {
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
}): Promise<CarsResponse> {
  const query = toParams({
    status: params?.status,
    tag: params?.tag,
    q: params?.q,
    minPrice: params?.minPrice,
    maxPrice: params?.maxPrice,
    fromYear: params?.fromYear,
    toYear: params?.toYear,
    page: params?.page,
    limit: params?.limit,
    sort: params?.sort,
  });
  const response = await fetch(`/api/cars${query ? `?${query}` : ""}`);
  const json = (await response.json()) as CarsResponse & { error?: string };
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to fetch cars");
  }
  return json;
}

export async function getFeaturedCars(): Promise<PublicCar[]> {
  const response = await fetch("/api/cars/featured");
  const json = (await response.json()) as { data: PublicCar[]; error?: string };
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to fetch featured cars");
  }
  return json.data;
}

export async function getCarById(id: string): Promise<PublicCar> {
  const response = await fetch(`/api/cars/${id}`);
  const json = (await response.json()) as { data?: PublicCar; error?: string };
  if (!response.ok || !json.data) {
    throw new Error(json.error ?? "Car not found");
  }
  return json.data;
}

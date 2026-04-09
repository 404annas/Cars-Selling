import type {
  AdminCarListResponse,
  AuthResponse,
  CarFormValues,
  CarResponse,
  CarsResponse,
  UserResponse,
} from "@/types/car";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

function apiUrl(path: string) {
  return API_BASE_URL + (path.startsWith("/") ? path : "/" + path);
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

async function fetchJson<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(apiUrl(path), {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body == null ? undefined : JSON.stringify(options.body),
  });

  if (response.ok === false) {
    let message = "Request failed with status " + response.status;
    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      const errorText = await response.text();
      message = errorText || message;
    }

    throw new Error(message);
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

export async function login(email: string, password: string) {
  return fetchJson<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function logout() {
  return fetchJson<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}

export async function getCurrentUser() {
  return fetchJson<UserResponse>("/api/auth/me");
}

export type AdminCarsQueryParams = {
  page?: number;
  limit?: number;
  q?: string;
  status?: "all" | "available" | "sold" | "reserved";
  featured?: "all" | "true" | "false";
};

export async function getAdminCars(params: AdminCarsQueryParams = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "" || value === "all") {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return fetchJson<AdminCarListResponse>("/api/admin/cars" + (query ? "?" + query : ""));
}

export async function getAdminCar(id: string) {
  return fetchJson<CarResponse>("/api/admin/cars/" + id);
}

export async function createAdminCar(payload: CarFormValues) {
  return fetchJson<{ data: { id: string; slug: string } }>("/api/admin/cars", {
    method: "POST",
    body: payload,
  });
}

export async function updateAdminCar(
  id: string,
  payload: Partial<CarFormValues>,
) {
  return fetchJson<{ data: { id: string; slug: string } }>(
    "/api/admin/cars/" + id,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export async function deleteAdminCar(id: string) {
  return fetchJson<{ success: boolean }>("/api/admin/cars/" + id, {
    method: "DELETE",
  });
}

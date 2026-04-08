import type { AdminCarRow, AdminCarStatus } from "@/features/cars/types";
import type { CarFormSchemaValues } from "@/features/cars/carForm.schema";

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function fetchAdminCars(): Promise<AdminCarRow[]> {
  const response = await fetch("/api/admin/cars", { cache: "no-store" });
  const json = await parseJson<{ data: AdminCarRow[]; error?: string }>(response);
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to load cars");
  }
  return json.data;
}

export async function patchAdminCar(
  id: string,
  patch: Partial<Pick<AdminCarRow, "status" | "isFeatured">>
): Promise<void> {
  const response = await fetch(`/api/admin/cars/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const json = await parseJson<{ error?: string }>(response);
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to update car");
  }
}

export async function deleteAdminCar(id: string): Promise<void> {
  const response = await fetch(`/api/admin/cars/${id}`, {
    method: "DELETE",
  });
  const json = await parseJson<{ error?: string }>(response);
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to delete car");
  }
}

export async function saveAdminCar(
  mode: "create" | "edit",
  payload: CarFormSchemaValues,
  carId?: string
): Promise<void> {
  const endpoint = mode === "create" ? "/api/admin/cars" : `/api/admin/cars/${carId}`;
  const method = mode === "create" ? "POST" : "PATCH";

  const response = await fetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await parseJson<{ error?: string }>(response);
  if (!response.ok) {
    throw new Error(json.error ?? "Failed to save car");
  }
}

export type UpdateCarPatch = Partial<{
  status: AdminCarStatus;
  isFeatured: boolean;
}>;

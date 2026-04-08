"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";

type CarRow = {
  _id: string;
  slug: string;
  name: string;
  status: "available" | "sold" | "reserved";
  priceAUD: number | null;
  isFeatured: boolean;
  thumbnailUrl: string;
  sortOrder: number;
  specs?: {
    year?: number;
  };
};

export default function DashboardCarsPage() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string>("");

  async function fetchCars() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/cars", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to load cars");
      }
      setCars(json.data as CarRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cars");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchCars();
  }, []);

  async function updateRow(
    id: string,
    patch: Partial<Pick<CarRow, "status" | "isFeatured">>
  ) {
    setBusyId(id);
    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to update car");
      }
      setCars((prev) =>
        prev.map((car) =>
          car._id === id
            ? {
                ...car,
                ...patch,
              }
            : car
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update car");
    } finally {
      setBusyId("");
    }
  }

  async function deleteRow(id: string) {
    if (!confirm("Delete this car listing?")) return;

    setBusyId(id);
    try {
      const response = await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to delete car");
      }
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete car");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Car Management</h1>
          <p className="mt-1 text-sm text-gray-400">Manage listings, status, and featured flags.</p>
        </div>
        <Link
          href="/dashboard/cars/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#f23410] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <PlusCircle className="h-4 w-4" />
          Add Car
        </Link>
      </div>

      {loading && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
          Loading cars...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-black/30">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Sort</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {cars.map((car) => {
                const busy = busyId === car._id;
                return (
                  <tr key={car._id} className="align-middle text-gray-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-black/50">
                          {car.thumbnailUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={car.thumbnailUrl}
                              alt={car.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">{car.name}</p>
                          <p className="truncate text-xs text-gray-500">{car.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{car.specs?.year ?? "-"}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {car.priceAUD === null ? "SOLD" : `AUD $${car.priceAUD.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={car.status}
                        disabled={busy}
                        onChange={(event) =>
                          void updateRow(car._id, {
                            status: event.target.value as CarRow["status"],
                          })
                        }
                        className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-xs text-white"
                      >
                        <option value="available">available</option>
                        <option value="reserved">reserved</option>
                        <option value="sold">sold</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={car.isFeatured}
                          disabled={busy}
                          onChange={(event) =>
                            void updateRow(car._id, { isFeatured: event.target.checked })
                          }
                        />
                        <span className="text-xs text-gray-300">Featured</span>
                      </label>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{car.sortOrder}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/cars/${car._id}/edit`}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-2 py-1 text-xs text-white hover:border-[#f23410]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void deleteRow(car._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-60"
                        >
                          {busy ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {cars.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No cars found. Add your first listing.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

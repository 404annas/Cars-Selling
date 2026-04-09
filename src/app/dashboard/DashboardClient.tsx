"use client";

import { formatPriceAUD } from "@/lib/cars";
import {
  joinListInput,
  splitListInput,
  useAdminDashboard,
} from "@/hooks/useAdminDashboard";
import type { CarFormValues } from "@/types/car";

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#f23410]";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-zinc-400";
const buttonClass =
  "rounded-lg bg-[#f23410] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d92c0d] disabled:cursor-not-allowed disabled:opacity-60";

export default function DashboardClient() {
  const dashboard = useAdminDashboard();
  const {
    cars,
    editingId,
    form,
    loading,
    message,
    saving,
    stats,
    user,
    editCar,
    handleLogout,
    quickUpdateCar,
    removeCar,
    resetForm,
    saveCar,
    setForm,
  } = dashboard;

  if (loading || !user) {
    return <div className="min-h-screen bg-black px-4 py-16 text-white">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Signed in as {user.email}</p>
          <h1 className="orb text-3xl font-bold text-[#f23410]">Inventory Dashboard</h1>
        </div>
        <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold hover:border-[#f23410]" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-zinc-800 p-4">
            <p className="text-xs uppercase text-zinc-500">{label}</p>
            <p className="orb text-3xl font-bold text-[#f23410]">{value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={saveCar} className="mb-10 rounded-2xl border border-zinc-800 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="orb text-2xl font-bold text-[#f23410]">{editingId ? "Edit Car" : "Add Car"}</h2>
          <button type="button" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm" onClick={resetForm}>
            Clear Form
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <label className="space-y-2">
            <span className={labelClass}>Name</span>
            <input className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Tagline</span>
            <input className={inputClass} value={form.tagline} onChange={(event) => setForm({ ...form, tagline: event.target.value })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Status</span>
            <select className={inputClass} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CarFormValues["status"] })}>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Price AUD</span>
            <input className={inputClass} type="number" min="0" value={form.priceAUD ?? ""} onChange={(event) => setForm({ ...form, priceAUD: event.target.value === "" ? null : Number(event.target.value) })} />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Mileage KM</span>
            <input className={inputClass} type="number" min="0" value={form.specs.mileageKm} onChange={(event) => setForm({ ...form, specs: { ...form.specs, mileageKm: Number(event.target.value) } })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Year</span>
            <input className={inputClass} type="number" min="1900" max="2100" value={form.specs.year} onChange={(event) => setForm({ ...form, specs: { ...form.specs, year: Number(event.target.value) } })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Engine</span>
            <input className={inputClass} value={form.specs.engineDisplacement} onChange={(event) => setForm({ ...form, specs: { ...form.specs, engineDisplacement: event.target.value } })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Transmission</span>
            <input className={inputClass} value={form.specs.transmission} onChange={(event) => setForm({ ...form, specs: { ...form.specs, transmission: event.target.value } })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Fuel Type</span>
            <select className={inputClass} value={form.specs.fuelType} onChange={(event) => setForm({ ...form, specs: { ...form.specs, fuelType: event.target.value as CarFormValues["specs"]["fuelType"] } })}>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Color</span>
            <input className={inputClass} value={form.specs.color} onChange={(event) => setForm({ ...form, specs: { ...form.specs, color: event.target.value } })} required />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Drive Type</span>
            <select className={inputClass} value={form.specs.driveType ?? ""} onChange={(event) => setForm({ ...form, specs: { ...form.specs, driveType: event.target.value === "" ? null : event.target.value as CarFormValues["specs"]["driveType"] } })}>
              <option value="">Not set</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Sort Order</span>
            <input className={inputClass} type="number" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <label className="space-y-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass + " min-h-32"} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
          </label>
          <div className="grid grid-cols-1 gap-4">
            <label className="space-y-2">
              <span className={labelClass}>Image URLs, one per line</span>
              <textarea className={inputClass + " min-h-24"} value={joinListInput(form.images)} onChange={(event) => setForm({ ...form, images: splitListInput(event.target.value) })} required />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Highlights, one per line</span>
              <textarea className={inputClass + " min-h-24"} value={joinListInput(form.highlights)} onChange={(event) => setForm({ ...form, highlights: splitListInput(event.target.value) })} />
            </label>
          </div>
          <label className="space-y-2">
            <span className={labelClass}>Tags</span>
            <input className={inputClass} value={form.tags.join(", ")} onChange={(event) => setForm({ ...form, tags: splitListInput(event.target.value) })} />
          </label>
          <label className="flex items-center gap-3 pt-6">
            <input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })} />
            <span className="text-sm font-semibold text-zinc-300">Show in featured cars</span>
          </label>
        </div>

        {message ? <p className="mt-4 text-sm text-[#f23410]">{message}</p> : null}
        <button className={buttonClass + " mt-5"} disabled={saving} type="submit">
          {saving ? "Saving..." : editingId ? "Update Car" : "Create Car"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-zinc-950 text-xs uppercase text-zinc-400">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="border-t border-zinc-800">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={car.thumbnailUrl} alt={car.name} className="h-12 w-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-white">{car.name}</p>
                      <p className="text-xs text-zinc-500">{car.specs.year} / {car.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select className={inputClass} value={car.status} onChange={(event) => quickUpdateCar(car._id, { status: event.target.value as CarFormValues["status"] })}>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
                <td className="px-4 py-3">{car.priceAUD == null ? "SOLD" : "AUD $" + formatPriceAUD(car.priceAUD)}</td>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={car.isFeatured} onChange={(event) => quickUpdateCar(car._id, { isFeatured: event.target.checked })} />
                </td>
                <td className="px-4 py-3">{car.sortOrder}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-zinc-700 px-3 py-2 hover:border-[#f23410]" onClick={() => editCar(car._id)} type="button">Edit</button>
                    <button
                      className="rounded-lg border border-zinc-700 px-3 py-2 text-[#f23410] hover:border-[#f23410]"
                      onClick={() => {
                        if (window.confirm("Delete this car listing?")) void removeCar(car._id);
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

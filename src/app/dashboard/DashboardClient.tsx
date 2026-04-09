"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Filter, LayoutDashboard, LogOut, Plus, Search, X } from "lucide-react";
import { formatPriceAUD } from "@/lib/cars";
import {
  joinListInput,
  splitListInput,
  useAdminDashboard,
} from "@/hooks/useAdminDashboard";
import type { AdminCarListItem, CarFormValues } from "@/types/car";

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#f23410]";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-zinc-400";
const buttonClass =
  "rounded-lg bg-[#f23410] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d92c0d] disabled:cursor-not-allowed disabled:opacity-60";
const ghostButtonClass =
  "rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-[#f23410] hover:text-[#f23410]";

type StatusFilter = "all" | CarFormValues["status"];
type FeaturedFilter = "all" | "featured" | "not-featured";

function filterCars(
  cars: AdminCarListItem[],
  search: string,
  status: StatusFilter,
  featured: FeaturedFilter,
) {
  const normalizedSearch = search.trim().toLowerCase();

  return cars.filter((car) => {
    const matchesSearch =
      normalizedSearch === "" ||
      car.name.toLowerCase().includes(normalizedSearch) ||
      car.slug.toLowerCase().includes(normalizedSearch) ||
      String(car.specs.year).includes(normalizedSearch);

    const matchesStatus = status === "all" || car.status === status;
    const matchesFeatured =
      featured === "all" ||
      (featured === "featured" && car.isFeatured) ||
      (featured === "not-featured" && !car.isFeatured);

    return matchesSearch && matchesStatus && matchesFeatured;
  });
}

export default function DashboardClient() {
  const dashboard = useAdminDashboard();
  const {
    cars,
    closeForm,
    editingId,
    form,
    isFormOpen,
    loading,
    message,
    openCreateForm,
    openEditForm,
    handleLogout,
    quickUpdateCar,
    removeCar,
    resetForm,
    saveCar,
    saving,
    setForm,
    stats,
    user,
  } = dashboard;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [featuredFilter, setFeaturedFilter] = useState<FeaturedFilter>("all");
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  const filteredCars = useMemo(
    () => filterCars(cars, search, statusFilter, featuredFilter),
    [cars, featuredFilter, search, statusFilter],
  );

  if (loading || !user) {
    return <div className="min-h-screen bg-black px-4 py-16 text-white">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-800 bg-zinc-950 px-4 py-5 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Elite Motor Cars</p>
            <h1 className="orb mt-1 text-2xl font-bold text-[#f23410]">Admin Panel</h1>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            <button className="flex items-center gap-3 rounded-lg bg-[#f23410] px-4 py-3 text-sm font-semibold text-white">
              <LayoutDashboard size={18} />
              Inventory
            </button>
            <button className={ghostButtonClass + " flex items-center gap-3"} onClick={openCreateForm}>
              <Plus size={18} />
              Add Car
            </button>
          </nav>

          <div className="mt-8 hidden rounded-xl border border-zinc-800 p-4 lg:block">
            <p className="text-xs text-zinc-500">Signed in as</p>
            <p className="mt-1 break-all text-sm text-zinc-200">{user.email}</p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-[#f23410]" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Dashboard</p>
              <h2 className="orb text-3xl font-bold text-[#f23410]">Inventory Management</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={buttonClass + " flex items-center gap-2"} onClick={openCreateForm}>
                <Plus size={18} />
                Add New Car
              </button>
              <button className={ghostButtonClass + " flex items-center gap-2 lg:hidden"} onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {Object.entries(stats).map(([label, value]) => (
              <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">{label}</p>
                <p className="orb text-3xl font-bold text-[#f23410]">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 p-4">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <Filter size={18} className="text-[#f23410]" />
                <h3 className="font-semibold">Filters</h3>
                <span className="text-sm text-zinc-500">Showing {filteredCars.length} of {cars.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
                <label className="relative">
                  <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    className={inputClass + " pl-10"}
                    placeholder="Search name, slug, or year"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <select className={inputClass} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
                  <option value="all">All status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
                <select className={inputClass} value={featuredFilter} onChange={(event) => setFeaturedFilter(event.target.value as FeaturedFilter)}>
                  <option value="all">All visibility</option>
                  <option value="featured">Featured</option>
                  <option value="not-featured">Not featured</option>
                </select>
                <button className={ghostButtonClass} onClick={() => { setSearch(""); setStatusFilter("all"); setFeaturedFilter("all"); }}>
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-black text-xs uppercase text-zinc-400">
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
                  {filteredCars.map((car) => (
                    <tr key={car._id} className="border-t border-zinc-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            className="group relative h-14 w-20 overflow-hidden rounded-lg bg-zinc-900"
                            onClick={() => setPreviewImage({ src: car.thumbnailUrl, alt: car.name })}
                            type="button"
                            title="Open image"
                          >
                            <img src={car.thumbnailUrl} alt={car.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                            <span className="absolute inset-0 hidden items-center justify-center bg-black/50 text-xs text-white group-hover:flex">
                              Open
                            </span>
                          </button>
                          <div>
                            <p className="max-w-[360px] truncate font-semibold text-white">{car.name}</p>
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
                          <button className="rounded-lg border border-zinc-700 px-3 py-2 hover:border-[#f23410]" onClick={() => void openEditForm(car._id)} type="button">
                            Edit
                          </button>
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
                  {filteredCars.length === 0 ? (
                    <tr>
                      <td className="px-4 py-10 text-center text-zinc-500" colSpan={6}>
                        No cars match the selected filters.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {isFormOpen ? (
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/80 px-4 py-6">
          <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-800 bg-black p-4 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500">{editingId ? "Update existing listing" : "Create a new listing"}</p>
                <h2 className="orb text-2xl font-bold text-[#f23410]">{editingId ? "Edit Car" : "Add New Car"}</h2>
              </div>
              <button className="rounded-lg border border-zinc-700 p-2 hover:border-[#f23410]" onClick={closeForm} type="button">
                <X size={18} />
              </button>
            </div>

            <CarForm
              editingId={editingId}
              form={form}
              message={message}
              resetForm={resetForm}
              saveCar={saveCar}
              saving={saving}
              setForm={setForm}
            />
          </div>
        </div>
      ) : null}

      {previewImage ? (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 text-white hover:bg-[#f23410]" onClick={() => setPreviewImage(null)} type="button">
              <X size={18} />
            </button>
            <img src={previewImage.src} alt={previewImage.alt} className="max-h-[85vh] w-full rounded-xl object-contain" />
            <a className="mt-3 flex items-center justify-center gap-2 text-sm text-zinc-300 hover:text-[#f23410]" href={previewImage.src} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              Open original image
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function CarForm({
  editingId,
  form,
  message,
  resetForm,
  saveCar,
  saving,
  setForm,
}: {
  editingId: string | null;
  form: CarFormValues;
  message: string;
  resetForm: () => void;
  saveCar: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  saving: boolean;
  setForm: React.Dispatch<React.SetStateAction<CarFormValues>>;
}) {
  return (
    <form onSubmit={saveCar}>
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
      <div className="mt-5 flex flex-wrap gap-2">
        <button className={buttonClass} disabled={saving} type="submit">
          {saving ? "Saving..." : editingId ? "Update Car" : "Create Car"}
        </button>
        <button className={ghostButtonClass} onClick={resetForm} type="button">
          Clear Form
        </button>
      </div>
    </form>
  );
}

import { Filter, Search } from "lucide-react";
import { formatPriceAUD } from "@/lib/cars";
import type { CarFormValues } from "@/types/car";
import { ghostButtonClass, inputClass } from "./dashboardStyles";
import type {
  CarsTableCar,
  DashboardPagination,
  FeaturedFilter,
  PreviewImage,
  StatusFilter,
} from "./dashboardTypes";

type CarsTableProps = {
  cars: CarsTableCar[];
  carsLoading: boolean;
  featuredFilter: FeaturedFilter;
  limit: number;
  openEditForm: (id: string) => Promise<void>;
  page: number;
  pageEnd: number;
  pageStart: number;
  pagination: DashboardPagination;
  quickUpdateCar: (id: string, patch: Partial<CarFormValues>) => Promise<void>;
  removeCar: (id: string) => Promise<void>;
  resetFilters: () => void;
  search: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<PreviewImage | null>>;
  statusFilter: StatusFilter;
  totalPages: number;
  updateFeaturedFilter: (value: FeaturedFilter) => void;
  updateLimit: (value: number) => void;
  updateSearch: (value: string) => void;
  updateStatusFilter: (value: StatusFilter) => void;
};

export function CarsTable({
  cars,
  carsLoading,
  featuredFilter,
  limit,
  openEditForm,
  page,
  pageEnd,
  pageStart,
  pagination,
  quickUpdateCar,
  removeCar,
  resetFilters,
  search,
  setPage,
  setPreviewImage,
  statusFilter,
  totalPages,
  updateFeaturedFilter,
  updateLimit,
  updateSearch,
  updateStatusFilter,
}: CarsTableProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-4">
        <div className="mb-4 flex items-center gap-2 text-zinc-300">
          <Filter size={18} className="text-[#f23410]" />
          <h3 className="font-semibold">Filters</h3>
          <span className="text-sm text-zinc-500">
            Showing {pageStart}-{pageEnd} of {pagination.total}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_170px_170px_130px_auto]">
          <label className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              className={inputClass + " pl-10"}
              placeholder="Search name, slug, or year"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
            />
          </label>
          <select
            className={inputClass}
            value={statusFilter}
            onChange={(event) =>
              updateStatusFilter(event.target.value as StatusFilter)
            }
          >
            <option value="all">All status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
          <select
            className={inputClass}
            value={featuredFilter}
            onChange={(event) =>
              updateFeaturedFilter(event.target.value as FeaturedFilter)
            }
          >
            <option value="all">All visibility</option>
            <option value="featured">Featured</option>
            <option value="not-featured">Not featured</option>
          </select>
          <select
            className={inputClass}
            value={limit}
            onChange={(event) => updateLimit(Number(event.target.value))}
          >
            <option value={20}>20 rows</option>
            <option value={30}>30 rows</option>
            <option value={50}>50 rows</option>
          </select>
          <button className={ghostButtonClass} onClick={resetFilters}>
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
            {carsLoading ? <TableSkeletonRows /> : null}
            {!carsLoading &&
              cars.map((car) => (
                <tr key={car._id} className="border-t border-zinc-800">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="group relative h-14 w-20 overflow-hidden rounded-lg bg-zinc-900"
                        onClick={() =>
                          setPreviewImage({
                            src: car.thumbnailUrl,
                            alt: car.name,
                          })
                        }
                        type="button"
                        title="Open image"
                      >
                        <img
                          src={car.thumbnailUrl}
                          alt={car.name}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                        <span className="absolute inset-0 hidden items-center justify-center bg-black/50 text-xs text-white group-hover:flex">
                          Open
                        </span>
                      </button>
                      <div>
                        <p className="max-w-[360px] truncate font-semibold text-white">
                          {car.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {car.specs.year} / {car.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className={inputClass}
                      value={car.status}
                      onChange={(event) =>
                        quickUpdateCar(car._id, {
                          status: event.target.value as CarFormValues["status"],
                        })
                      }
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {car.priceAUD == null
                      ? "SOLD"
                      : "AUD $" + formatPriceAUD(car.priceAUD)}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={car.isFeatured}
                      onChange={(event) =>
                        quickUpdateCar(car._id, {
                          isFeatured: event.target.checked,
                        })
                      }
                    />
                  </td>
                  <td className="px-4 py-3">{car.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border border-zinc-700 px-3 py-2 hover:border-[#f23410]"
                        onClick={() => void openEditForm(car._id)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-[#f23410] hover:border-[#f23410]"
                        onClick={() => {
                          if (window.confirm("Delete this car listing?")) {
                            void removeCar(car._id);
                          }
                        }}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!carsLoading && cars.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-10 text-center text-zinc-500"
                  colSpan={6}
                >
                  No cars match the selected filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-800 p-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Page {pagination.page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className={ghostButtonClass}
            disabled={carsLoading || page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
            type="button"
          >
            Previous
          </button>
          <button
            className={ghostButtonClass}
            disabled={carsLoading || page >= totalPages}
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function TableSkeletonRows() {
  return Array.from({ length: 6 }).map((_, index) => (
    <tr key={index} className="border-t border-zinc-800">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-14 w-20 animate-pulse rounded-lg bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-56 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-32 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="h-9 w-32 animate-pulse rounded-lg bg-zinc-800" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-5 animate-pulse rounded bg-zinc-800" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-10 animate-pulse rounded bg-zinc-800" />
      </td>
      <td className="px-4 py-3">
        <div className="h-9 w-32 animate-pulse rounded-lg bg-zinc-800" />
      </td>
    </tr>
  ));
}

"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type AdminCarsQueryParams,
  createAdminCar,
  deleteAdminCar,
  getAdminCar,
  getAdminCars,
  getCurrentUser,
  logout,
  updateAdminCar,
} from "@/lib/api";
import type {
  AdminCarListItem,
  AdminCarListResponse,
  AuthUser,
  BackendCar,
  CarFormValues,
} from "@/types/car";

export const emptyCarForm: CarFormValues = {
  name: "",
  tagline: "",
  description: "",
  priceAUD: null,
  status: "available",
  specs: {
    mileageKm: 0,
    engineDisplacement: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    year: new Date().getFullYear(),
    color: "",
    driveType: null,
  },
  highlights: [],
  images: [],
  tags: [],
  isFeatured: false,
  dealer: "Elite Motor Cars",
  dealerLocation: "Sydney, Australia",
  licenseNumber: "MD100405",
  sortOrder: 0,
};

export function splitListInput(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinListInput(value: string[]) {
  return value.join("\n");
}

function toFormValues(car: BackendCar): CarFormValues {
  return {
    name: car.name,
    tagline: car.tagline,
    description: car.description,
    priceAUD: car.priceAUD,
    status: car.status,
    specs: {
      mileageKm: car.specs.mileageKm,
      engineDisplacement: car.specs.engineDisplacement,
      transmission: car.specs.transmission,
      fuelType: car.specs.fuelType,
      year: car.specs.year,
      color: car.specs.color,
      driveType: car.specs.driveType ?? null,
    },
    highlights: car.highlights,
    images: car.images,
    tags: car.tags,
    isFeatured: car.isFeatured,
    dealer: car.dealer,
    dealerLocation: car.dealerLocation,
    licenseNumber: car.licenseNumber,
    sortOrder: car.sortOrder,
  };
}

function getFallbackStats(cars: AdminCarListItem[]) {
  return {
    total: cars.length,
    available: cars.filter((car) => car.status === "available").length,
    sold: cars.filter((car) => car.status === "sold").length,
    featured: cars.filter((car) => car.isFeatured).length,
  };
}

function applyCarsResponse(
  response: AdminCarListResponse,
  fallbackPage: number,
  fallbackLimit: number,
  setCars: (cars: AdminCarListItem[]) => void,
  setPagination: (pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }) => void,
  setStats: (stats: {
    total: number;
    available: number;
    sold: number;
    featured: number;
  }) => void,
) {
  setCars(response.data);
  setPagination(
    response.pagination ?? {
      page: fallbackPage,
      limit: fallbackLimit,
      total: response.data.length,
      totalPages: response.data.length > 0 ? 1 : 0,
    },
  );
  setStats(response.stats ?? getFallbackStats(response.data));
}

export function useAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cars, setCars] = useState<AdminCarListItem[]>([]);
  const [form, setForm] = useState<CarFormValues>(emptyCarForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carsLoading, setCarsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminCarsQueryParams["status"]>("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not-featured">("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    featured: 0,
  });

  const featuredQueryValue: AdminCarsQueryParams["featured"] =
    featuredFilter === "featured"
      ? "true"
      : featuredFilter === "not-featured"
        ? "false"
        : "all";

  const refreshCars = useCallback(async () => {
    setCarsLoading(true);
    try {
      const response = await getAdminCars({
        page,
        limit,
        q: debouncedSearch,
        status: statusFilter,
        featured: featuredQueryValue,
      });
      applyCarsResponse(response, page, limit, setCars, setPagination, setStats);
    } finally {
      setCarsLoading(false);
    }
  }, [debouncedSearch, featuredQueryValue, limit, page, statusFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const response = await getCurrentUser();
        if (!mounted) return;
        setUser(response.user);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (user == null || loading) {
      return;
    }

    void refreshCars();
  }, [loading, refreshCars, user]);

  useEffect(() => {
    if (!loading && user == null) {
      router.replace("/dashboard/login");
    }
  }, [loading, router, user]);

  async function handleLogout() {
    await logout();
    setUser(null);
    setCars([]);
    setEditingId(null);
    setForm(emptyCarForm);
    setIsFormOpen(false);
    router.replace("/dashboard/login");
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updateStatusFilter(value: AdminCarsQueryParams["status"]) {
    setStatusFilter(value);
    setPage(1);
  }

  function updateFeaturedFilter(value: "all" | "featured" | "not-featured") {
    setFeaturedFilter(value);
    setPage(1);
  }

  function updateLimit(value: number) {
    setLimit(value);
    setPage(1);
  }

  function resetFilters() {
    setSearch("");
    setDebouncedSearch("");
    setStatusFilter("all");
    setFeaturedFilter("all");
    setPage(1);
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyCarForm);
    setMessage("");
    setIsFormOpen(true);
  }

  async function openEditForm(id: string) {
    setMessage("");
    const response = await getAdminCar(id);
    setEditingId(id);
    setForm(toFormValues(response.data));
    setIsFormOpen(true);
  }

  async function removeCar(id: string) {
    setMessage("");
    await deleteAdminCar(id);
    await refreshCars();
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyCarForm);
      setIsFormOpen(false);
    }
  }

  async function quickUpdateCar(id: string, patch: Partial<CarFormValues>) {
    setMessage("");
    await updateAdminCar(id, patch);
    await refreshCars();
  }

  async function saveCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        priceAUD: form.status === "sold" ? null : form.priceAUD,
      };

      if (editingId) {
        await updateAdminCar(editingId, payload);
        setMessage("Car listing updated.");
      } else {
        await createAdminCar(payload);
        setMessage("Car listing created.");
      }

      setEditingId(null);
      setForm(emptyCarForm);
      setIsFormOpen(false);
      await refreshCars();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save car");
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyCarForm);
    setMessage("");
  }

  function closeForm() {
    setIsFormOpen(false);
    resetForm();
  }

  return {
    cars,
    carsLoading,
    editingId,
    featuredFilter,
    form,
    isFormOpen,
    limit,
    loading,
    message,
    page,
    pagination,
    saving,
    search,
    statusFilter,
    stats,
    user,
    closeForm,
    handleLogout,
    openCreateForm,
    openEditForm,
    quickUpdateCar,
    removeCar,
    resetForm,
    resetFilters,
    saveCar,
    setPage,
    setForm,
    updateFeaturedFilter,
    updateLimit,
    updateSearch,
    updateStatusFilter,
  };
}

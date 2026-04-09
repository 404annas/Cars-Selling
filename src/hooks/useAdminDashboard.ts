"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createAdminCar,
  deleteAdminCar,
  getAdminCar,
  getAdminCars,
  getCurrentUser,
  logout,
  updateAdminCar,
} from "@/lib/api";
import type { AdminCarListItem, AuthUser, BackendCar, CarFormValues } from "@/types/car";

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

export function useAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cars, setCars] = useState<AdminCarListItem[]>([]);
  const [form, setForm] = useState<CarFormValues>(emptyCarForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const stats = useMemo(() => {
    return {
      total: cars.length,
      available: cars.filter((car) => car.status === "available").length,
      sold: cars.filter((car) => car.status === "sold").length,
      featured: cars.filter((car) => car.isFeatured).length,
    };
  }, [cars]);

  const refreshCars = useCallback(async () => {
    const response = await getAdminCars();
    setCars(response.data);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const response = await getCurrentUser();
        if (!mounted) return;
        setUser(response.user);
        const carsResponse = await getAdminCars();
        if (mounted) setCars(carsResponse.data);
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
    router.replace("/dashboard/login");
  }

  async function editCar(id: string) {
    setMessage("");
    const response = await getAdminCar(id);
    setEditingId(id);
    setForm(toFormValues(response.data));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeCar(id: string) {
    setMessage("");
    await deleteAdminCar(id);
    await refreshCars();
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyCarForm);
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

  return {
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
  };
}

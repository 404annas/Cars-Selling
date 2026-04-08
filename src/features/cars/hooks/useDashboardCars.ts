"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminCar,
  patchAdminCar,
  type UpdateCarPatch,
} from "@/features/cars/api";
import { useAdminCars } from "@/features/cars/hooks/useAdminCars";
import type { AdminCarRow } from "@/features/cars/types";

const ADMIN_CARS_QUERY_KEY = ["admin-cars"] as const;

export function useDashboardCars() {
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState("");

  const carsQuery = useAdminCars();

  const updateMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: UpdateCarPatch }) => {
      await patchAdminCar(id, patch);
      return { id, patch };
    },
    onSuccess: ({ id, patch }) => {
      queryClient.setQueryData<AdminCarRow[]>(ADMIN_CARS_QUERY_KEY, (prev = []) =>
        prev.map((car) => (car._id === id ? { ...car, ...patch } : car))
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteAdminCar(id);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<AdminCarRow[]>(ADMIN_CARS_QUERY_KEY, (prev = []) =>
        prev.filter((car) => car._id !== id)
      );
    },
  });

  async function updateRow(id: string, patch: UpdateCarPatch) {
    setBusyId(id);
    try {
      await updateMutation.mutateAsync({ id, patch });
    } finally {
      setBusyId("");
    }
  }

  async function deleteRow(id: string) {
    setBusyId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      setBusyId("");
    }
  }

  return {
    cars: carsQuery.data ?? [],
    loading: carsQuery.isLoading,
    error: carsQuery.error,
    busyId,
    updateRow,
    deleteRow,
  };
}

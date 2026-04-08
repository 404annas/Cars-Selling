"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveAdminCar } from "@/features/cars/api";
import {
  carFormSchema,
  type CarFormSchemaValues,
} from "@/features/cars/carForm.schema";

type CarFormMode = "create" | "edit";

type UseCarFormLogicParams = {
  mode: CarFormMode;
  carId?: string;
  initialValues?: Partial<CarFormSchemaValues>;
};

const defaultValues: CarFormSchemaValues = {
  name: "",
  tagline: "",
  description: "",
  priceAUD: null,
  status: "available",
  specs: {
    mileageKm: 0,
    engineDisplacement: "",
    transmission: "",
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

function mergeInitialValues(
  incoming?: Partial<CarFormSchemaValues>
): CarFormSchemaValues {
  if (!incoming) return defaultValues;

  return {
    ...defaultValues,
    ...incoming,
    specs: {
      ...defaultValues.specs,
      ...incoming.specs,
    },
    highlights: incoming.highlights ?? defaultValues.highlights,
    images: incoming.images ?? defaultValues.images,
    tags: incoming.tags ?? defaultValues.tags,
  };
}

function textToArray(value: string): string[] {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function useCarFormLogic({
  mode,
  carId,
  initialValues,
}: UseCarFormLogicParams) {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const mergedDefaults = useMemo(() => mergeInitialValues(initialValues), [initialValues]);
  const [highlightsInput, setHighlightsInput] = useState(
    mergedDefaults.highlights.join("\n")
  );
  const [tagsInput, setTagsInput] = useState(mergedDefaults.tags.join("\n"));

  const form = useForm<CarFormSchemaValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: mergedDefaults,
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: CarFormSchemaValues) => {
      await saveAdminCar(mode, payload, carId);
    },
  });

  async function submit(values: CarFormSchemaValues) {
    setFormError("");

    const payload: CarFormSchemaValues = {
      ...values,
      highlights: textToArray(highlightsInput),
      tags: textToArray(tagsInput),
      priceAUD: values.status === "sold" ? null : values.priceAUD,
    };

    try {
      await saveMutation.mutateAsync(payload);
      router.push("/dashboard/cars");
      router.refresh();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to save car");
    }
  }

  function cancel() {
    router.push("/dashboard/cars");
  }

  return {
    form,
    formError,
    submit,
    cancel,
    highlightsInput,
    setHighlightsInput,
    tagsInput,
    setTagsInput,
  };
}

"use client";

import { Controller, useWatch } from "react-hook-form";
import ImageUploader from "@/features/cars/ImageUploader";
import type { CarFormSchemaValues } from "@/features/cars/carForm.schema";
import { useCarFormLogic } from "@/features/cars/hooks/useCarFormLogic";

type CarFormMode = "create" | "edit";

interface CarFormProps {
  mode: CarFormMode;
  carId?: string;
  initialValues?: Partial<CarFormSchemaValues>;
}

export default function CarForm({ mode, carId, initialValues }: CarFormProps) {
  const {
    form,
    formError,
    submit,
    cancel,
    highlightsInput,
    setHighlightsInput,
    tagsInput,
    setTagsInput,
  } = useCarFormLogic({
    mode,
    carId,
    initialValues,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const status = useWatch({ control, name: "status" });

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-300">Car Name</label>
          <input
            {...register("name")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
            placeholder="2013 BMW M5 F10"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-300">Tagline</label>
          <input
            {...register("tagline")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
            placeholder="Supercharged V8 executive performance sedan"
          />
          {errors.tagline && (
            <p className="mt-1 text-xs text-red-400">{errors.tagline.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-300">Description</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Status</label>
          <select
            {...register("status")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
          >
            <option value="available">available</option>
            <option value="reserved">reserved</option>
            <option value="sold">sold</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Price (AUD)</label>
          <input
            type="number"
            disabled={status === "sold"}
            {...register("priceAUD", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
            })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410] disabled:opacity-60"
          />
          {errors.priceAUD && (
            <p className="mt-1 text-xs text-red-400">{errors.priceAUD.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Sort Order</label>
          <input
            type="number"
            {...register("sortOrder", { valueAsNumber: true })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
          />
        </div>

        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" {...register("isFeatured")} />
            Featured listing
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-4 text-base font-semibold text-white">Specs</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-gray-300">Year</label>
            <input
              type="number"
              {...register("specs.year", { valueAsNumber: true })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Mileage (KM)</label>
            <input
              type="number"
              {...register("specs.mileageKm", { valueAsNumber: true })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Color</label>
            <input
              {...register("specs.color")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Fuel Type</label>
            <select
              {...register("specs.fuelType")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            >
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Transmission</label>
            <input
              {...register("specs.transmission")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Engine</label>
            <input
              {...register("specs.engineDisplacement")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Drive Type</label>
            <select
              {...register("specs.driveType", {
                setValueAs: (value) => (value === "" ? null : value),
              })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            >
              <option value="">Not set</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-300">Highlights (one per line)</label>
          <textarea
            rows={6}
            value={highlightsInput}
            onChange={(event) => setHighlightsInput(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Tags (one per line)</label>
          <textarea
            rows={6}
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#f23410]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-3 text-base font-semibold text-white">Images</h3>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <ImageUploader
              value={field.value ?? []}
              onChange={(urls) => setValue("images", urls, { shouldValidate: true })}
            />
          )}
        />
        {errors.images && (
          <p className="mt-2 text-xs text-red-400">{errors.images.message as string}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm text-gray-300">Dealer</label>
          <input
            {...register("dealer")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Dealer Location</label>
          <input
            {...register("dealerLocation")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">License Number</label>
          <input
            {...register("licenseNumber")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </div>
      </div>

      {formError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {formError}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={cancel}
          className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-[#f23410] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Car"
              : "Update Car"}
        </button>
      </div>
    </form>
  );
}

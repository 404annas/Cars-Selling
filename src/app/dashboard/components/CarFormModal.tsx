import { ArrowDown, ArrowUp, ImagePlus, Trash2, X } from "lucide-react";
import { joinListInput, splitListInput } from "@/hooks/useAdminDashboard";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import type { CarFormValues } from "@/types/car";
import { buttonClass, ghostButtonClass, inputClass, labelClass } from "./dashboardStyles";

type CarFormModalProps = {
  closeForm: () => void;
  editingId: string | null;
  form: CarFormValues;
  message: string;
  resetForm: () => void;
  saveCar: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  saving: boolean;
  setForm: React.Dispatch<React.SetStateAction<CarFormValues>>;
};

export function CarFormModal({
  closeForm,
  editingId,
  form,
  message,
  resetForm,
  saveCar,
  saving,
  setForm,
}: CarFormModalProps) {
  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/80 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-800 bg-black p-4 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">
              {editingId ? "Update existing listing" : "Create a new listing"}
            </p>
            <h2 className="orb text-2xl font-bold text-[#f23410]">
              {editingId ? "Edit Car" : "Add New Car"}
            </h2>
          </div>
          <button
            className="rounded-lg border border-zinc-700 p-2 hover:border-[#f23410]"
            onClick={closeForm}
            type="button"
          >
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
}: Omit<CarFormModalProps, "closeForm">) {
  const {
    isConfigured,
    isUploading,
    totalCount,
    uploadedCount,
    uploadError,
    uploadFiles,
  } = useCloudinaryUpload();

  async function handleImageSelection(files: FileList | null) {
    if (!files) return;

    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    const uploadedUrls = await uploadFiles(selectedFiles, form.name);
    if (uploadedUrls.length > 0) {
      setForm((currentForm) => ({
        ...currentForm,
        images: currentForm.images.concat(uploadedUrls),
      }));
    }
  }

  function removeImage(indexToRemove: number) {
    setForm((currentForm) => ({
      ...currentForm,
      images: currentForm.images.filter((_, index) => index !== indexToRemove),
    }));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setForm((currentForm) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= currentForm.images.length) {
        return currentForm;
      }

      const images = currentForm.images.slice();
      const currentImage = images[index];
      images[index] = images[nextIndex];
      images[nextIndex] = currentImage;

      return {
        ...currentForm,
        images,
      };
    });
  }

  return (
    <form onSubmit={saveCar}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <label className="space-y-2">
          <span className={labelClass}>Name</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Tagline</span>
          <input
            className={inputClass}
            value={form.tagline}
            onChange={(event) =>
              setForm({ ...form, tagline: event.target.value })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Status</span>
          <select
            className={inputClass}
            value={form.status}
            onChange={(event) =>
              setForm({
                ...form,
                status: event.target.value as CarFormValues["status"],
              })
            }
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Price AUD</span>
          <input
            className={inputClass}
            type="number"
            min="0"
            value={form.priceAUD ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                priceAUD:
                  event.target.value === "" ? null : Number(event.target.value),
              })
            }
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Mileage KM</span>
          <input
            className={inputClass}
            type="number"
            min="0"
            value={form.specs.mileageKm}
            onChange={(event) =>
              setForm({
                ...form,
                specs: { ...form.specs, mileageKm: Number(event.target.value) },
              })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Year</span>
          <input
            className={inputClass}
            type="number"
            min="1900"
            max="2100"
            value={form.specs.year}
            onChange={(event) =>
              setForm({
                ...form,
                specs: { ...form.specs, year: Number(event.target.value) },
              })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Engine</span>
          <input
            className={inputClass}
            value={form.specs.engineDisplacement}
            onChange={(event) =>
              setForm({
                ...form,
                specs: {
                  ...form.specs,
                  engineDisplacement: event.target.value,
                },
              })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Transmission</span>
          <input
            className={inputClass}
            value={form.specs.transmission}
            onChange={(event) =>
              setForm({
                ...form,
                specs: { ...form.specs, transmission: event.target.value },
              })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Fuel Type</span>
          <select
            className={inputClass}
            value={form.specs.fuelType}
            onChange={(event) =>
              setForm({
                ...form,
                specs: {
                  ...form.specs,
                  fuelType: event.target
                    .value as CarFormValues["specs"]["fuelType"],
                },
              })
            }
          >
            <option value="Petrol">Petrol</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Color</span>
          <input
            className={inputClass}
            value={form.specs.color}
            onChange={(event) =>
              setForm({
                ...form,
                specs: { ...form.specs, color: event.target.value },
              })
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Drive Type</span>
          <select
            className={inputClass}
            value={form.specs.driveType ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                specs: {
                  ...form.specs,
                  driveType:
                    event.target.value === ""
                      ? null
                      : (event.target
                          .value as CarFormValues["specs"]["driveType"]),
                },
              })
            }
          >
            <option value="">Not set</option>
            <option value="RWD">RWD</option>
            <option value="FWD">FWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className={labelClass}>Sort Order</span>
          <input
            className={inputClass}
            type="number"
            value={form.sortOrder}
            onChange={(event) =>
              setForm({ ...form, sortOrder: Number(event.target.value) })
            }
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Description</span>
          <textarea
            className={inputClass + " min-h-32"}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            required
          />
        </label>
        <CarImagesField
          form={form}
          handleImageSelection={handleImageSelection}
          isConfigured={isConfigured}
          isUploading={isUploading}
          moveImage={moveImage}
          removeImage={removeImage}
          setForm={setForm}
          totalCount={totalCount}
          uploadedCount={uploadedCount}
          uploadError={uploadError}
        />
        <label className="space-y-2">
          <span className={labelClass}>Tags</span>
          <input
            className={inputClass}
            value={form.tags.join(", ")}
            onChange={(event) =>
              setForm({ ...form, tags: splitListInput(event.target.value) })
            }
          />
        </label>
        <label className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) =>
              setForm({ ...form, isFeatured: event.target.checked })
            }
          />
          <span className="text-sm font-semibold text-zinc-300">
            Show in featured cars
          </span>
        </label>
      </div>

      {message ? (
        <p className="mt-4 text-sm text-[#f23410]">{message}</p>
      ) : null}
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

type CarImagesFieldProps = {
  form: CarFormValues;
  handleImageSelection: (files: FileList | null) => Promise<void>;
  isConfigured: boolean;
  isUploading: boolean;
  moveImage: (index: number, direction: -1 | 1) => void;
  removeImage: (indexToRemove: number) => void;
  setForm: React.Dispatch<React.SetStateAction<CarFormValues>>;
  totalCount: number;
  uploadedCount: number;
  uploadError: string;
};

function CarImagesField({
  form,
  handleImageSelection,
  isConfigured,
  isUploading,
  moveImage,
  removeImage,
  setForm,
  totalCount,
  uploadedCount,
  uploadError,
}: CarImagesFieldProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-3 rounded-xl border border-zinc-800 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className={labelClass}>Car Images</span>
            <p className="mt-1 text-xs text-zinc-500">
              Upload multiple photos. The first image is used as the thumbnail.
            </p>
          </div>
          <label
            className={buttonClass + " inline-flex cursor-pointer items-center gap-2"}
          >
            <ImagePlus size={17} />
            {isUploading ? "Uploading..." : "Upload Images"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={isUploading || !isConfigured}
              onChange={(event) => {
                void handleImageSelection(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        </div>

        {!isConfigured ? (
          <p className="rounded-lg border border-[#f23410]/40 bg-[#f23410]/10 px-3 py-2 text-xs text-[#f23410]">
            Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.
          </p>
        ) : null}

        {isUploading ? (
          <p className="text-xs text-zinc-400">
            Uploaded {uploadedCount} of {totalCount} images...
          </p>
        ) : null}

        {uploadError ? (
          <p className="text-xs text-[#f23410]">{uploadError}</p>
        ) : null}

        {form.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {form.images.map((imageUrl, index) => (
              <div
                key={imageUrl + index}
                className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950"
              >
                <img
                  src={imageUrl}
                  alt={"Car image " + (index + 1)}
                  className="h-28 w-full object-cover"
                />
                <div className="flex items-center justify-between gap-1 p-2">
                  <span className="text-xs text-zinc-500">
                    {index === 0 ? "Thumbnail" : "Image " + (index + 1)}
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="rounded border border-zinc-700 p-1 disabled:opacity-30"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                      type="button"
                      title="Move up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      className="rounded border border-zinc-700 p-1 disabled:opacity-30"
                      disabled={index === form.images.length - 1}
                      onClick={() => moveImage(index, 1)}
                      type="button"
                      title="Move down"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      className="rounded border border-zinc-700 p-1 text-[#f23410]"
                      onClick={() => removeImage(index)}
                      type="button"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-500">
            No car images uploaded yet.
          </div>
        )}

        <label className="block space-y-2">
          <span className={labelClass}>Image URLs</span>
          <textarea
            className={inputClass + " min-h-20"}
            value={joinListInput(form.images)}
            onChange={(event) =>
              setForm({
                ...form,
                images: splitListInput(event.target.value),
              })
            }
            required
          />
        </label>
      </div>
      <label className="space-y-2">
        <span className={labelClass}>Highlights, one per line</span>
        <textarea
          className={inputClass + " min-h-24"}
          value={joinListInput(form.highlights)}
          onChange={(event) =>
            setForm({
              ...form,
              highlights: splitListInput(event.target.value),
            })
          }
        />
      </label>
    </div>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

type UploadingState = {
  id: string;
  name: string;
  progressText: string;
  error?: string;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadImage(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "elite-motor-cars");
  formData.append("quality", "auto");
  formData.append("fetch_format", "auto");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = (await response.json()) as {
    secure_url?: string;
    error?: { message?: string };
  };
  if (!response.ok || !json.secure_url) {
    throw new Error(json.error?.message ?? "Upload failed");
  }
  return json.secure_url;
}

export default function ImageUploader({
  value,
  onChange,
  maxImages = 10,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<UploadingState[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const canUpload = value.length < maxImages && !disabled;

  const uploadingCount = useMemo(
    () => uploading.filter((item) => !item.error).length,
    [uploading]
  );

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !canUpload) return;

    const accepted = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const slotsLeft = Math.max(0, maxImages - value.length);
    const selected = accepted.slice(0, slotsLeft);

    for (const file of selected) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setUploading((prev) => [
        ...prev,
        { id, name: file.name, progressText: "Uploading..." },
      ]);

      try {
        const url = await uploadImage(file);
        onChange([...value, url]);
        setUploading((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        setUploading((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, progressText: "Failed", error: message } : item
          )
        );
      }
    }
  }

  function removeUploaded(index: number) {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  }

  function moveImage(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= value.length) return;

    const next = [...value];
    const current = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = current;
    onChange(next);
  }

  function dismissUploadError(id: string) {
    setUploading((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-4">
      {canUpload && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            void handleFiles(event.dataTransfer.files);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            isDragging
              ? "border-[#f23410] bg-[#f23410]/10"
              : "border-white/20 hover:border-[#f23410]/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(event) => void handleFiles(event.target.files)}
          />
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#f23410]">
            <ImagePlus className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-white">
            Drag images here or click to upload
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {value.length}/{maxImages} uploaded
          </p>
          {!CLOUD_NAME || !UPLOAD_PRESET ? (
            <p className="mt-2 text-xs text-red-400">
              Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and
              `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
            </p>
          ) : null}
        </div>
      )}

      {uploading.length > 0 && (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
          {uploading.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-white">{item.name}</p>
                <p
                  className={`text-xs ${
                    item.error ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {item.error ?? item.progressText}
                </p>
              </div>
              {item.error ? (
                <button
                  type="button"
                  onClick={() => dismissUploadError(item.id)}
                  className="text-xs text-gray-300 underline"
                >
                  Dismiss
                </button>
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-[#f23410]" />
              )}
            </div>
          ))}
          {uploadingCount > 0 && (
            <p className="text-xs text-gray-400">Uploading {uploadingCount} image(s)...</p>
          )}
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="h-28 w-full object-cover"
              />
              <div className="space-y-1 p-2">
                <p className="truncate text-[11px] text-gray-300">{url}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    className="rounded bg-white/10 px-2 py-1 text-[10px] text-white disabled:opacity-40"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === value.length - 1}
                    className="rounded bg-white/10 px-2 py-1 text-[10px] text-white disabled:opacity-40"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => removeUploaded(index)}
                    className="ml-auto rounded bg-red-500/20 px-2 py-1 text-[10px] text-red-300"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </span>
                  </button>
                </div>
                {index === 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#f23410]">
                    Thumbnail image
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

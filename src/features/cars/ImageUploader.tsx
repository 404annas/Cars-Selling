"use client";

/**
 * ImageUploader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drag-and-drop multi-image uploader that uploads directly to Cloudinary
 * from the browser using an UNSIGNED upload preset — no server route needed.
 *
 * Usage:
 *   <ImageUploader
 *     value={imageUrls}          // string[] from form state
 *     onChange={setImageUrls}    // update form state with new URLs
 *     maxImages={10}
 *   />
 *
 * Env vars required in .env.local:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=elite-motor-cars-unsigned
 */

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Upload, X, GripVertical, ImageIcon, Loader2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface UploadingFile {
  id: string;
  name: string;
  progress: number;       // 0–100
  status: "uploading" | "done" | "error";
  previewUrl: string;     // local object URL for preview while uploading
  cloudinaryUrl?: string; // final Cloudinary URL on success
  error?: string;
}

interface ImageUploaderProps {
  value: string[];                     // current array of Cloudinary URLs
  onChange: (urls: string[]) => void;  // called when the url list changes
  maxImages?: number;
  carSlugHint?: string;               // passed as folder hint to Cloudinary
  disabled?: boolean;
}

// ── Cloudinary unsigned upload function ────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

async function uploadToCloudinary(
  file: File,
  folder: string,
  onProgress: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);  // unsigned preset — no API secret needed
    formData.append("folder", folder);                 // organise by car in media library
    formData.append("quality", "auto");
    formData.append("fetch_format", "auto");

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText) as { secure_url: string };
        resolve(data.secure_url);
      } else {
        const err = JSON.parse(xhr.responseText) as { error?: { message: string } };
        reject(new Error(err.error?.message ?? `Upload failed (${xhr.status})`));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error")));
    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
}

// ── Component ──────────────────────────────────────────────────────────────

export default function ImageUploader({
  value,
  onChange,
  maxImages = 10,
  carSlugHint = "new-car",
  disabled = false,
}: ImageUploaderProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const cloudinaryFolder = `elite-motor-cars/${carSlugHint}`;
  const totalUsed = value.length + uploadingFiles.filter((f) => f.status === "uploading").length;
  const canUploadMore = totalUsed < maxImages && !disabled;

  // ── Upload handler ─────────────────────────────────────────────────────

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const slotsLeft = maxImages - value.length;
      const toUpload = fileArray.slice(0, slotsLeft);

      if (toUpload.length === 0) return;

      // Create local preview entries
      const newEntries: UploadingFile[] = toUpload.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        progress: 0,
        status: "uploading",
        previewUrl: URL.createObjectURL(file),
      }));

      setUploadingFiles((prev) => [...prev, ...newEntries]);

      // Upload each file
      await Promise.all(
        toUpload.map(async (file, i) => {
          const entry = newEntries[i];
          try {
            const url = await uploadToCloudinary(file, cloudinaryFolder, (pct) => {
              setUploadingFiles((prev) =>
                prev.map((f) => (f.id === entry.id ? { ...f, progress: pct } : f))
              );
            });

            // On success: add to value array and mark done
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === entry.id
                  ? { ...f, status: "done", progress: 100, cloudinaryUrl: url }
                  : f
              )
            );
            onChange([...value, url]);

            // Clean up local preview URL
            URL.revokeObjectURL(entry.previewUrl);

            // Remove from uploadingFiles after short delay to show ✅
            setTimeout(() => {
              setUploadingFiles((prev) => prev.filter((f) => f.id !== entry.id));
            }, 1500);
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === entry.id ? { ...f, status: "error", error: msg } : f
              )
            );
          }
        })
      );
    },
    [value, onChange, maxImages, cloudinaryFolder]
  );

  // ── Drag & drop ────────────────────────────────────────────────────────

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!canUploadMore) return;
      handleFiles(e.dataTransfer.files);
    },
    [canUploadMore, handleFiles]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canUploadMore) setIsDragOver(true);
  };

  const onDragLeave = () => setIsDragOver(false);

  // ── Remove existing image ──────────────────────────────────────────────

  const removeExisting = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const removeUploading = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {canUploadMore && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragOver
              ? "border-[#f23410] bg-[#f23410]/10 scale-[1.01]"
              : "border-gray-600 hover:border-[#f23410]/60 hover:bg-white/5"
            }
            ${disabled ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <Upload className={`w-10 h-10 transition-colors ${isDragOver ? "text-[#f23410]" : ""}`} />
            <div>
              <p className="font-semibold text-white text-sm">
                {isDragOver ? "Drop images here" : "Drag & drop images, or click to select"}
              </p>
              <p className="text-xs mt-1">
                PNG, JPG, AVIF, WebP — uploads directly to Cloudinary
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Folder: <code className="text-[#f23410]">{cloudinaryFolder}/</code>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{value.length}/{maxImages} images</span>
            </div>
          </div>
        </div>
      )}

      {/* Uploading previews */}
      {uploadingFiles.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {uploadingFiles.map((f) => (
            <div key={f.id} className="relative rounded-lg overflow-hidden bg-gray-900 aspect-square">
              <Image src={f.previewUrl} alt={f.name} fill className="object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-2">
                {f.status === "uploading" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#f23410]" />
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-[#f23410] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                    <span className="text-white text-xs font-bold">{f.progress}%</span>
                  </>
                )}
                {f.status === "done" && (
                  <span className="text-green-400 text-xl">✓</span>
                )}
                {f.status === "error" && (
                  <div className="text-center">
                    <span className="text-red-400 text-xs">{f.error}</span>
                    <button
                      type="button"
                      onClick={() => removeUploading(f.id)}
                      className="mt-1 text-xs text-gray-400 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded image grid */}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <GripVertical className="w-3.5 h-3.5" /> Uploaded to Cloudinary
            <span className="text-gray-600">· First image = thumbnail</span>
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {value.map((url, i) => (
              <div
                key={url}
                className="relative rounded-lg overflow-hidden bg-gray-900 aspect-square group"
              >
                {/* Thumbnail badge */}
                {i === 0 && (
                  <div className="absolute top-1 left-1 z-10 bg-[#f23410] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    THUMB
                  </div>
                )}
                <Image
                  src={url}
                  alt={`Car image ${i + 1}`}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-70"
                  sizes="150px"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(i)}
                  className="absolute top-1 right-1 z-10 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-1 left-1 z-10 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cloudinary hint */}
      {!CLOUD_NAME && (
        <p className="text-xs text-red-400 bg-red-500/10 rounded-lg p-3">
          ⚠️ <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> is not set in .env.local.
          Image uploads will not work until this is configured.
        </p>
      )}
    </div>
  );
}

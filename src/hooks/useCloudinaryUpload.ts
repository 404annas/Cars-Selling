"use client";

import { useState } from "react";

type CloudinaryUploadResponse = {
  secure_url: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function slugifyFolderName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

async function uploadSingleFile(file: File, folder: string) {
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary upload is not configured.");
  }

  const body = new FormData();
  body.set("file", file);
  body.set("upload_preset", uploadPreset);
  body.set("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    let message = "Image upload failed";
    try {
      const payload = await response.json();
      message = payload.error?.message || message;
    } catch {
      message = await response.text() || message;
    }

    throw new Error(message);
  }

  const payload = (await response.json()) as CloudinaryUploadResponse;
  return payload.secure_url;
}

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  async function uploadFiles(files: File[], carName: string) {
    setUploadError("");
    setUploadedCount(0);
    setTotalCount(files.length);

    if (files.length === 0) {
      return [];
    }

    const folderName = slugifyFolderName(carName) || "new-car";
    const folder = `elite-motor-cars/${folderName}`;

    setIsUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadSingleFile(file, folder);
        urls.push(url);
        setUploadedCount(urls.length);
      }

      return urls;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Image upload failed";
      setUploadError(message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }

  return {
    isConfigured: Boolean(cloudName && uploadPreset),
    isUploading,
    totalCount,
    uploadedCount,
    uploadError,
    uploadFiles,
  };
}

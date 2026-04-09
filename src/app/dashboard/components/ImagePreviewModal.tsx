import { ExternalLink, X } from "lucide-react";
import type { PreviewImage } from "./dashboardTypes";

type ImagePreviewModalProps = {
  previewImage: PreviewImage;
  setPreviewImage: React.Dispatch<React.SetStateAction<PreviewImage | null>>;
};

export function ImagePreviewModal({
  previewImage,
  setPreviewImage,
}: ImagePreviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4"
      onClick={() => setPreviewImage(null)}
    >
      <div
        className="relative max-h-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 text-white hover:bg-[#f23410]"
          onClick={() => setPreviewImage(null)}
          type="button"
        >
          <X size={18} />
        </button>
        <img
          src={previewImage.src}
          alt={previewImage.alt}
          className="max-h-[85vh] w-full rounded-xl object-contain"
        />
        <a
          className="mt-3 flex items-center justify-center gap-2 text-sm text-zinc-300 hover:text-[#f23410]"
          href={previewImage.src}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={16} />
          Open original image
        </a>
      </div>
    </div>
  );
}

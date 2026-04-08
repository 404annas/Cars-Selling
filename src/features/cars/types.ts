export type AdminCarStatus = "available" | "sold" | "reserved";

export type AdminCarRow = {
  _id: string;
  slug: string;
  name: string;
  status: AdminCarStatus;
  priceAUD: number | null;
  isFeatured: boolean;
  thumbnailUrl: string;
  sortOrder: number;
  specs?: {
    year?: number;
  };
};

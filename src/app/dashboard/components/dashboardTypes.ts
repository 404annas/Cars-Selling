import type { AdminCarListItem, AuthUser, CarFormValues } from "@/types/car";

export type FeaturedFilter = "all" | "featured" | "not-featured";

export type StatusFilter = "all" | CarFormValues["status"];

export type DashboardStats = {
  total: number;
  available: number;
  sold: number;
  featured: number;
};

export type DashboardPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PreviewImage = {
  src: string;
  alt: string;
};

export type DashboardShellUser = Pick<AuthUser, "email">;

export type CarsTableCar = AdminCarListItem;

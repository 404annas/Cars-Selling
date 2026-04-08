export type PublicCarStatus = "available" | "sold" | "reserved";

export interface PublicCarSpecs {
  mileageKm: number;
  engineDisplacement: string;
  transmission: string;
  fuelType: "Petrol" | "Hybrid" | "Diesel" | "Electric";
  year: number;
  color: string;
  driveType?: "RWD" | "FWD" | "AWD" | "4WD" | null;
}

export interface PublicCar {
  _id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceAUD: number | null;
  status: PublicCarStatus;
  specs: PublicCarSpecs;
  highlights: string[];
  images: string[];
  thumbnailUrl: string;
  tags: string[];
  isFeatured: boolean;
  dealer: string;
  dealerLocation: string;
  licenseNumber: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarsResponse {
  data: PublicCar[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

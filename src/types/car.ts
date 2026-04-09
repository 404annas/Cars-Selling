export interface BackendCar {
  _id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceAUD: number | null;
  status: "available" | "sold" | "reserved";
  specs: {
    mileageKm: number;
    engineDisplacement: string;
    transmission: string;
    fuelType: string;
    year: number;
    color: string;
    driveType?: string | null;
  };
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
  data: BackendCar[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CarResponse {
  data: BackendCar;
}

export interface AdminCarListItem {
  _id: string;
  slug: string;
  name: string;
  status: BackendCar["status"];
  priceAUD: number | null;
  isFeatured: boolean;
  thumbnailUrl: string;
  sortOrder: number;
  specs: {
    year: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminCarListResponse {
  data: AdminCarListItem[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superadmin";
}

export interface AuthResponse {
  user: AuthUser;
}

export interface UserResponse {
  user: AuthUser;
}

export interface CarFormValues {
  name: string;
  tagline: string;
  description: string;
  priceAUD: number | null;
  status: BackendCar["status"];
  specs: {
    mileageKm: number;
    engineDisplacement: string;
    transmission: string;
    fuelType: BackendCar["specs"]["fuelType"];
    year: number;
    color: string;
    driveType?: BackendCar["specs"]["driveType"];
  };
  highlights: string[];
  images: string[];
  tags: string[];
  isFeatured: boolean;
  dealer: string;
  dealerLocation: string;
  licenseNumber: string;
  sortOrder: number;
}

export interface FrontendCar {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: string;
  status: BackendCar["status"];
  description: string;
  specs: {
    mileage: string;
    engine: string;
    transmission: string;
    fuel: string;
    year: string;
    color: string;
  };
  highlights: string[];
  images: string[];
  dealer: string;
  dealerLocation: string;
  license: string;
  isFeatured: boolean;
}

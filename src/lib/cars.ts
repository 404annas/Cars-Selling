import type { BackendCar, FrontendCar } from "@/types/car";

export type InventoryRouteType = "all" | "available" | "sold";

export function formatPriceAUD(priceAUD: number | null) {
  if (priceAUD == null) {
    return "SOLD";
  }

  return new Intl.NumberFormat("en-AU").format(priceAUD);
}

export function toFrontendCar(car: BackendCar): FrontendCar {
  return {
    id: car.slug || car._id,
    slug: car.slug,
    name: car.name,
    tagline: car.tagline,
    price: formatPriceAUD(car.priceAUD),
    status: car.status,
    description: car.description,
    specs: {
      mileage: new Intl.NumberFormat("en-AU").format(car.specs.mileageKm) + " km",
      engine: car.specs.engineDisplacement,
      transmission: car.specs.transmission,
      fuel: car.specs.fuelType,
      year: String(car.specs.year),
      color: car.specs.color,
    },
    highlights: car.highlights,
    images: car.images,
    dealer: car.dealer,
    dealerLocation: car.dealerLocation,
    license: car.licenseNumber,
    isFeatured: car.isFeatured,
  };
}

export function isSoldCar(car: Pick<FrontendCar, "status" | "price">) {
  return car.status === "sold" || car.price === "SOLD";
}

export function getInventoryRoute(type: InventoryRouteType) {
  if (type === "available") return "/available-cars";
  if (type === "sold") return "/sold-cars";
  return "/all-cars";
}

export function getCarDetailRoute(carId: string, sold: boolean) {
  const baseRoute = sold ? "/sold-cars/" : "/available-cars/";
  return baseRoute + carId;
}

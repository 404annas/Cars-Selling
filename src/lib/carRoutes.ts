import { allCars } from "@/data/cars";

export type InventoryRouteType = "all" | "available" | "sold";

export const isSoldCar = (price: string) => price === "SOLD";

export const getInventoryRoute = (type: InventoryRouteType) => {
  if (type === "available") return "/available-cars";
  if (type === "sold") return "/sold-cars";
  return "/all-cars";
};

export const getCarDetailRoute = (carId: number, sold: boolean) =>
  `${sold ? "/sold-cars" : "/available-cars"}/${carId}`;

export const findCarByName = (name: string) =>
  allCars.find((car) => car.name.toLowerCase() === name.toLowerCase());

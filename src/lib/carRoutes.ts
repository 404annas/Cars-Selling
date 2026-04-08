export type InventoryRouteType = "all" | "available" | "sold";

export const getInventoryRoute = (type: InventoryRouteType) => {
  if (type === "available") return "/available-cars";
  if (type === "sold") return "/sold-cars";
  return "/all-cars";
};

export const getCarDetailRoute = (carId: string, sold: boolean) =>
  `${sold ? "/sold-cars" : "/available-cars"}/${carId}`;

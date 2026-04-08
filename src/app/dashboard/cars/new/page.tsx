import CarForm from "@/features/cars/CarForm";

export const dynamic = "force-dynamic";

export default function NewCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add New Car</h1>
        <p className="mt-1 text-sm text-gray-400">
          Create a new listing for the inventory.
        </p>
      </div>
      <CarForm mode="create" />
    </div>
  );
}

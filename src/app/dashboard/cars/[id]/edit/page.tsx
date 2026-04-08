import { notFound } from "next/navigation";
import mongoose from "mongoose";
import CarForm from "@/features/cars/CarForm";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCarPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();
  const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
  const car = await Car.findOne(query).lean();

  if (!car) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Car</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update listing details, specs, media, and status.
        </p>
      </div>
      <CarForm
        mode="edit"
        carId={id}
        initialValues={{
          name: car.name,
          tagline: car.tagline,
          description: car.description,
          priceAUD: car.priceAUD,
          status: car.status,
          specs: {
            mileageKm: car.specs.mileageKm,
            engineDisplacement: car.specs.engineDisplacement,
            transmission: car.specs.transmission,
            fuelType: car.specs.fuelType,
            year: car.specs.year,
            color: car.specs.color,
            driveType: car.specs.driveType ?? null,
          },
          highlights: car.highlights ?? [],
          images: car.images ?? [],
          tags: car.tags ?? [],
          isFeatured: car.isFeatured,
          dealer: car.dealer,
          dealerLocation: car.dealerLocation,
          licenseNumber: car.licenseNumber,
          sortOrder: car.sortOrder,
        }}
      />
    </div>
  );
}

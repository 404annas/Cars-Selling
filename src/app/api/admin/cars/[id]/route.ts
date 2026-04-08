import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSessionUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";
import { carPatchSchema } from "@/features/cars/carForm.schema";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null;
  }
  return user;
}

function getCarQuery(id: string) {
  return mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const car = await Car.findOne(getCarQuery(id)).select("-__v").lean();
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ data: car });
  } catch (error) {
    console.error("[GET /api/admin/cars/:id]", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const parsed = carPatchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const patch = parsed.data;
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "No fields provided" }, { status: 400 });
    }

    await connectDB();
    const { id } = await params;

    const car = await Car.findOne(getCarQuery(id));
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    if (patch.specs) {
      car.specs = {
        ...car.specs,
        ...patch.specs,
      };
    }

    Object.entries(patch).forEach(([key, value]) => {
      if (key === "specs" || value === undefined) return;
      car.set(key, value);
    });

    await car.save();

    return NextResponse.json({
      data: {
        id: car._id.toString(),
        slug: car.slug,
      },
    });
  } catch (error) {
    console.error("[PATCH /api/admin/cars/:id]", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deleted = await Car.findOneAndDelete(getCarQuery(id));
    if (!deleted) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/admin/cars/:id]", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";
import mongoose from "mongoose";

export const revalidate = 60;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Support lookup by MongoDB ObjectId OR by slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const car = await Car.findOne(
      isObjectId ? { _id: id } : { slug: id }
    )
      .select("-__v")
      .lean();

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ data: car });
  } catch (error) {
    console.error("[GET /api/cars/:id]", error);
    return NextResponse.json(
      { error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}

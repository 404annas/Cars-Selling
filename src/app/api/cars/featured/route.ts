import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function GET() {
  try {
    await connectDB();

    const cars = await Car.find({ isFeatured: true, status: "available" })
      .sort({ sortOrder: 1 })
      .limit(6)
      .select("-__v")
      .lean();

    return NextResponse.json({ data: cars });
  } catch (error) {
    console.error("[GET /api/cars/featured]", error);
    return NextResponse.json(
      { error: "Failed to fetch featured cars" },
      { status: 500 }
    );
  }
}

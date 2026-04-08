import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";
import { carFormSchema } from "@/features/cars/carForm.schema";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null;
  }
  return user;
}

export async function GET() {
  try {
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .select(
        "_id slug name status priceAUD isFeatured thumbnailUrl sortOrder specs.year createdAt updatedAt"
      )
      .lean();

    return NextResponse.json({ data: cars });
  } catch (error) {
    console.error("[GET /api/admin/cars]", error);
    return NextResponse.json(
      { error: "Failed to fetch admin cars" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const parsed = carFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();
    const created = await Car.create(parsed.data);

    return NextResponse.json(
      {
        data: {
          id: created._id.toString(),
          slug: created.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/cars]", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}

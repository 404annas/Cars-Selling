import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/lib/models/Car.model";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tag = searchParams.get("tag");
    const q = searchParams.get("q")?.trim() ?? "";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const fromYearParam = searchParams.get("fromYear");
    const toYearParam = searchParams.get("toYear");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const sort = searchParams.get("sort") ?? "sortOrder_asc";

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (status === "available" || status === "sold" || status === "reserved") {
      filter.status = status;
    }
    if (tag) {
      filter.tags = tag;
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { tagline: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
    if (Number.isFinite(minPrice) || Number.isFinite(maxPrice)) {
      filter.priceAUD = {};
      if (Number.isFinite(minPrice)) {
        filter.priceAUD.$gte = minPrice;
      }
      if (Number.isFinite(maxPrice)) {
        filter.priceAUD.$lte = maxPrice;
      }
    }

    const fromYear = fromYearParam ? Number(fromYearParam) : undefined;
    const toYear = toYearParam ? Number(toYearParam) : undefined;
    if (Number.isFinite(fromYear) || Number.isFinite(toYear)) {
      filter["specs.year"] = {};
      if (Number.isFinite(fromYear)) {
        filter["specs.year"].$gte = fromYear;
      }
      if (Number.isFinite(toYear)) {
        filter["specs.year"].$lte = toYear;
      }
    }

    // Build sort
    const sortMap: Record<string, Record<string, 1 | -1>> = {
      sortOrder_asc:  { sortOrder: 1 },
      price_asc:      { priceAUD: 1 },
      price_desc:     { priceAUD: -1 },
      year_desc:      { "specs.year": -1 },
      year_asc:       { "specs.year": 1 },
      createdAt_desc: { createdAt: -1 },
    };
    const sortQuery = sortMap[sort] ?? { sortOrder: 1 };

    const skip = (page - 1) * limit;

    const [cars, total] = await Promise.all([
      Car.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean(),
      Car.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: cars,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/cars]", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.log("Error parsing form data:", error);
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      );
    }
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST /api/events:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // Parse pagination query params with sensible defaults and caps
    const url = req.nextUrl;
    const params = url.searchParams;
    const pageParam = params.get("page");
    const limitParam = params.get("limit");

    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 20;
    const MAX_LIMIT = 100;

    let page = Number(pageParam ?? DEFAULT_PAGE);
    let limit = Number(limitParam ?? DEFAULT_LIMIT);

    // Coerce and sanitize
    if (!Number.isFinite(page) || page < 1) page = DEFAULT_PAGE;
    if (!Number.isFinite(limit) || limit < 1) limit = DEFAULT_LIMIT;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const skip = (page - 1) * limit;

    // Use paginated query to avoid loading whole collection into memory
    const [total, events] = await Promise.all([
      Event.countDocuments(),
      Event.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json(
      {
        events,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error consistently as done in POST handler
    console.error("Error handling GET /api/events:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

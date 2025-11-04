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
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

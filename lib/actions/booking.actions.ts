"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async (
  eventId: string,
  slug: string,
  email: string
) => {
  try {
    await connectDB();
    // Create a new booking
    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
    };
  }
};

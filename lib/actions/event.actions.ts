"use server";

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    // find the relevant event by slug
    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    // search for similar events by tags ($ne - not equal, $in - includes)
    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(4)
      .lean(); // Added limit to show only 4 similar events

    return similarEvents;
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [];
  }
};

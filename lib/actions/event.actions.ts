"user server";

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    connectDB();
    // find the relevant event by slug
    const event = await Event.findOne({ slug });
    // search for similar events by tags ($ne - not equal, $in - includes)
    return await Event.find({
      _id: { $ne: event?._id, tags: { $in: event?.tags } },
    });
  } catch {
    return [];
  }
};

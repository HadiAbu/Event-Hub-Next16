import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { EventDocument } from "./event.model";

// Strongly-typed interface for Booking documents
export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Email regex for basic validation (not exhaustive but practical for server-side checks)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<BookingDocument, Model<BookingDocument>>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true, strict: true }
);

// Index for faster lookups by eventId
BookingSchema.index({ eventId: 1 });

// Pre-save hook:
// - Ensure referenced Event exists before saving a booking
// - Validate email format
BookingSchema.pre<BookingDocument>("save", async function (next) {
  try {
    // Validate email format
    if (typeof this.email !== "string" || !EMAIL_REGEX.test(this.email)) {
      throw new Error("Invalid email format");
    }

    // Verify referenced event exists. Use the Event model by name to avoid circular import issues.
    const EventModel = mongoose.model<EventDocument>("Event");
    const exists = await EventModel.exists({ _id: this.eventId });
    if (!exists) {
      throw new Error("Referenced eventId does not exist");
    }

    next();
  } catch (err) {
    next(err as Error);
  }
});

// Export model, reusing compiled model in development to avoid errors on hot-reload
export const Booking =
  (mongoose.models.Booking as Model<BookingDocument>) ??
  mongoose.model<BookingDocument>("Booking", BookingSchema);

export default Booking;

import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Strongly-typed interface for Event documents
export interface EventDocument extends Document {
  title: string;
  description: string;
  slug: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  time: string; // stored as ISO string
  mode: "offline" | "online" | "hybrid";
  audience: string;
  organizer: string;
  agenda: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Simple slugify helper: lower-case, trim, replace spaces/non-alphanum with dashes
const slugify = (value: string): string =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

// Schema definition with required validators. Timestamps enabled for createdAt/updatedAt.
const EventSchema = new Schema<EventDocument, Model<EventDocument>>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: {
      type: String,
      required: true,
      enum: ["offline", "online", "hybrid"],
    },
    audience: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true, trim: true },
    tags: { type: [String], required: true, default: [] },
  },
  { timestamps: true, strict: true }
);

// Unique index on slug for fast lookups and to enforce uniqueness at the DB level.
EventSchema.index({ slug: 1 }, { unique: true });

// Pre-save hook:
// - Generate or update slug only when title changes
// - Normalize/validate `time` into an ISO string
// - Ensure required string fields are non-empty after trimming
EventSchema.pre<EventDocument>("save", function (next) {
  try {
    // Validate non-empty required strings
    const requiredStringFields: (keyof EventDocument)[] = [
      "title",
      "description",
      "overview",
      "image",
      "venue",
      "location",
      "time",
      "audience",
      "organizer",
      "agenda",
    ];

    for (const field of requiredStringFields) {
      const val = (this as any)[field];
      if (typeof val !== "string" || val.trim().length === 0) {
        throw new Error(
          `${String(field)} is required and must be a non-empty string`
        );
      }
    }

    // Slug generation: only when title changed to avoid altering existing URLs
    if (this.isModified("title")) {
      this.slug = slugify(this.title);
    }

    // Normalize `time` to ISO format when modified. Store canonical ISO string.
    if (this.isModified("time")) {
      const parsed = new Date(this.time);
      if (isNaN(parsed.getTime())) {
        throw new Error(
          "Invalid date/time format for `time`. Provide a parseable date/time."
        );
      }
      this.time = parsed.toISOString();
    }

    next();
  } catch (err) {
    next(err as Error);
  }
});

// Export model (reuse existing compiled model if present — prevents OverwriteModelError in dev)
export const Event =
  (mongoose.models.Event as Model<EventDocument>) ??
  mongoose.model<EventDocument>("Event", EventSchema);

export default Event;

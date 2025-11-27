# Event Hub

Lightweight Next.js + TypeScript app with Mongoose models for Events and Bookings.

This repository contains a typed Mongoose database layer and a small helper to
manage the MongoDB connection in Next.js (prevents multiple connections during
development hot reloads).

## Contents

- `lib/mongodb.ts` — typed Mongoose connection helper (caching for dev).
- `database/event.model.ts` — `Event` schema & model (slug generation + time normalization).
- `database/booking.model.ts` — `Booking` schema & model (email + event reference validation).
- `database/index.ts` — central exports for models and types.

## Requirements

- Node.js >= 18 (recommended to match Next 16 and Mongoose requirements)
- MongoDB connection string (Atlas or self-hosted)

## Environment

Create a `.env` in the project root (gitignored) and set:

- `MONGODB_URI` — MongoDB connection string (e.g. mongodb+srv://...)

## Setup

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Database helper & models — quick guide

Connect once at application start (API routes, server-side handlers):

```ts
import { connectToDatabase } from "@/lib/mongodb";
import { Event, Booking } from "@/database";

await connectToDatabase();
// Use Event and Booking models normally (create/find/etc.)
```

Event model highlights:

- Required fields validated in a pre-save hook.
- Slug automatically generated from `title` and only updates when the title changes.
- `time` is normalized to an ISO string in the pre-save hook.
- `slug` has a unique index and timestamps are enabled.

Booking model highlights:

- Stores `eventId` (ObjectId ref to `Event`) and `email`.
- Pre-save hook verifies the referenced `Event` exists and validates email format.
- Index on `eventId` for faster lookups and timestamps enabled.

## Example: create an event and booking

```ts
await connectToDatabase();

const e = await Event.create({
  title: "My Event",
  description: "Details",
  overview: "Short overview",
  image: "/img.jpg",
  venue: "Main Hall",
  location: "City",
  time: "2025-11-03T19:00:00",
  mode: "offline",
  audience: "Developers",
  organizer: "Team",
  agenda: "Talks",
  tags: ["tech", "community"],
});

const b = await Booking.create({ eventId: e._id, email: "user@example.com" });
```

## Type-checking and linting

- TypeScript: `npx tsc --noEmit` — run to validate types across the project.
- ESLint: `npm run lint` (configured in `package.json`).

## Tests and teardown

For integration tests you may want to call `disconnectDatabase()` after tests
to close the Mongoose connection. The connection helper exposes a `disconnectDatabase`
function for this purpose.

## Notes

- Models are exported from `database/index.ts` for convenient single-point imports.
- Validation in pre-save hooks is deliberately concise and server-side focused.
- If you need additional validation (complex dates, external checks), add them
  in service-layer code or expand the schema validators.

If you'd like, I can add an example API route demonstrating creating an Event
and a Booking, or add a small integration test to validate the hooks.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

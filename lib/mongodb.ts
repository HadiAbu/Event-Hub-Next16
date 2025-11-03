/**
 * lib/mongodb.ts
 *
 * Mongoose connection helper for Next.js (TypeScript).
 * - Provides a typed `connectToDatabase` function that returns the mongoose instance.
 * - Caches the connection during development to avoid creating multiple connections
 *   when Next.js hot-reloads modules.
 * - Exposes an optional `disconnectDatabase` helper for tests or short-lived processes.
 *
 * Usage:
 *   import { connectToDatabase } from '@/lib/mongodb';
 *   await connectToDatabase();
 */

import mongoose from "mongoose";

// Ensure the environment variable is set. Fail fast if missing to avoid obscure runtime errors.
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Type alias for the mongoose module instance (keeps types explicit and avoids `any`).
type MongooseModule = typeof mongoose;

// Shape of the cache we store on globalThis. This allows preserving a single connection
// across module reloads (useful in development with Next.js hot reloading).
type MongooseConnectionCache = {
  conn: MongooseModule | null;
  promise: Promise<MongooseModule> | null;
};

// Extend the global object to hold our cache. Using a unique symbol-like name reduces
// risk of colliding with other globals.
declare global {
  // eslint-disable-next-line no-var
  var __mongoose_connection_cache__: MongooseConnectionCache | undefined;
}

// Initialize the cache on the global object when available. In production this will be
// undefined on first import and created here; in development it persists across reloads.
const cached: MongooseConnectionCache =
  global.__mongoose_connection_cache__ ?? { conn: null, promise: null };
global.__mongoose_connection_cache__ = cached;

/**
 * Connect to MongoDB using Mongoose and return the mongoose module instance.
 *
 * This function caches the connection promise to avoid creating multiple connections
 * during development (when Next.js may reload modules often). It returns the same
 * mongoose module instance on subsequent calls.
 *
 * @returns Promise<typeof mongoose> - the connected mongoose module
 */
export async function connectToDatabase(): Promise<MongooseModule> {
  // If we already have a cached connection, return it immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no connection yet but we started connecting, await the same promise.
  if (!cached.promise) {
    // Note: Mongoose 6+ sets sensible defaults for `useNewUrlParser` and
    // `useUnifiedTopology`, so explicit options are not required in most cases.
    // We asserted non-null here because we validated `MONGODB_URI` earlier and
    // want the compiler to treat it as a string.
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((m) => m)
      .catch((err) => {
        // Reset the promise so retries are possible if initial connection fails.
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/**
 * Disconnect the mongoose connection and clear the cache.
 *
 * Useful for test teardown or short-lived serverless functions where you want to
 * explicitly close the connection. In long-running servers you typically don't
 * need to call this.
 */
export async function disconnectDatabase(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

// Also export the raw mongoose in case callers need access to schemas, models, etc.
export default mongoose;

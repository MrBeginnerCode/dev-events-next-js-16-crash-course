import mongoose from "mongoose";

/**
 * Global type declaration to extend the global object with the mongoose connection cache.
 * This allows us to store and reuse the connection across hot reloads during development.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

/**
 * Mongoose connection URI from environment variables.
 * Make sure MONGODB_URI is defined in your .env.local or .env file.
 */
const MONGODB_URI: string = process.env.MONGODB_URI || "";

/**
 * Initialize or retrieve the cached mongoose connection.
 * In development, this prevents multiple connections when the code reloads.
 * In production, this ensures a single connection per container/process.
 *
 * @returns Promise resolving to a Mongoose connection instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Validate that the MongoDB URI is defined before attempting connection
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Initialize the global cache if it doesn't exist
  if (!global.mongooseCache) {
    global.mongooseCache = { connection: null, promise: null };
  }

  // Return existing connection if already established
  if (global.mongooseCache.connection) {
    return global.mongooseCache.connection;
  }

  // Return existing promise if connection is in progress
  if (global.mongooseCache.promise) {
    return global.mongooseCache.promise;
  }

  // Create a new connection promise
  global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  try {
    // Await the connection and cache it
    global.mongooseCache.connection = await global.mongooseCache.promise;
    return global.mongooseCache.connection;
  } catch (error) {
    // Clear the promise cache on connection failure
    global.mongooseCache.promise = null;
    throw error;
  }
}

export default connectDB;

import mongoose, { Mongoose } from 'mongoose';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Vui lòng cấu hình MONGODB_URI trong file .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

// For NextAuth MongoDB Adapter
const clientPromise = MongoClient.connect(MONGODB_URI);

// For Mongoose connection
interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached = global.mongoose as CachedMongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default clientPromise; 
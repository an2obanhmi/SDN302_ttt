import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Vui lòng định nghĩa biến môi trường MONGODB_URI trong file .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.set('strictQuery', true);

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(() => {
      console.log('Kết nối MongoDB thành công!');
      return cached;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Lỗi kết nối MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB; 
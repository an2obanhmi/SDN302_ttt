import mongoose from 'mongoose';

export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const getConnectionStatus = () => {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
};

export const handleDatabaseError = (error: unknown) => {
  console.error('Database Error:', error);
  if (error instanceof mongoose.Error.ValidationError) {
    return {
      success: false,
      error: 'Dữ liệu không hợp lệ',
      details: Object.values(error.errors).map((err: { message: string }) => err.message),
    };
  }
  if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
    return {
      success: false,
      error: 'Dữ liệu đã tồn tại',
    };
  }
  return {
    success: false,
    error: 'Lỗi server',
  };
}; 
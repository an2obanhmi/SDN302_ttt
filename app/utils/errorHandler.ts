import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}

export const handleError = (error: unknown) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: 'Đã xảy ra lỗi không xác định' },
    { status: 500 }
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Có lỗi xảy ra';
};

export const validateEnvVariables = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'NEXT_PUBLIC_API_URL',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new AppError(
      500,
      `Thiếu các biến môi trường: ${missingEnvVars.join(', ')}`
    );
  }
};

export const validateDatabaseConnection = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
    if (!response.ok) {
      throw new AppError(500, 'Không thể kết nối đến database');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    throw new AppError(500, 'Lỗi kết nối database');
  }
}; 
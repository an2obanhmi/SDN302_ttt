import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import User from '@/models/User';
import { handleDatabaseError } from '@/app/lib/dbUtils';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email và mật khẩu là bắt buộc'
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        error: 'Mật khẩu phải có ít nhất 6 ký tự'
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'Email đã được sử dụng'
      }, { status: 400 });
    }

    // Hash password using utility function
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'Đăng ký thành công'
    }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      handleDatabaseError(error),
      { status: 500 }
    );
  }
} 
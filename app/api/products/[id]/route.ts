import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Product from '@/app/models/Product';
import { handleDatabaseError } from '@/app/lib/dbUtils';
import { updateProductSchema } from '@/app/lib/validations/product';
import mongoose from 'mongoose';

export async function GET(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        error: 'ID sản phẩm không hợp lệ'
      }, { status: 400 });
    }

    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy sản phẩm'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json(
      handleDatabaseError(error),
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        error: 'ID sản phẩm không hợp lệ'
      }, { status: 400 });
    }

    const body = await request.json();
    
    // Validate input
    const validationResult = updateProductSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Dữ liệu không hợp lệ',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(
      params.id,
      validationResult.data,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy sản phẩm'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json(
      handleDatabaseError(error),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        error: 'ID sản phẩm không hợp lệ'
      }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy sản phẩm'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    });
  } catch (error) {
    return NextResponse.json(
      handleDatabaseError(error),
      { status: 500 }
    );
  }
} 
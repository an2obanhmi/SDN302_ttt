import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { handleError, AppError } from '../../utils/errorHandler';
import { createProductSchema, updateProductSchema } from '@/app/lib/validations/product';
import { ZodError } from 'zod';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách sản phẩm' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    const validatedData = createProductSchema.parse(body);

    const product = await Product.create({
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price,
      imageUrl: validatedData.image,
      // category: validatedData.category, // Nếu có trường category trong schema và model
      // stock: validatedData.stock, // Nếu có trường stock trong schema và model
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({ path: err.path.join('.'), message: err.message }));
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ', details: errors },
        { status: 400 }
      );
    }
    console.error('Error creating product:', error);
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID sản phẩm là bắt buộc' },
        { status: 400 }
      );
    }

    const validatedData = updateProductSchema.parse(updateData);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        imageUrl: validatedData.image,
        // category: validatedData.category,
        // stock: validatedData.stock,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({ path: err.path.join('.'), message: err.message }));
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ', details: errors },
        { status: 400 }
      );
    }
    console.error('Error updating product:', error);
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID sản phẩm là bắt buộc' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return handleError(error);
  }
} 
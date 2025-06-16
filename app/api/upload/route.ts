import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: 'Không có tệp ảnh nào được tải lên.' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(uploadDir, filename);

    // Đảm bảo thư mục tồn tại
    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(filePath, buffer);

    const imageUrl = `/images/${filename}`;
    return NextResponse.json({ success: true, url: imageUrl }, { status: 201 });
  } catch (error) {
    console.error('Lỗi tải ảnh lên:', error);
    return NextResponse.json({ error: 'Không thể tải ảnh lên.' }, { status: 500 });
  }
} 
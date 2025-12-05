import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const ext = path.extname(file.name);
      const filename = `${uuidv4()}${ext}`;
      const filepath = path.join(process.cwd(), 'public', 'uploads', 'products', filename);

      // Save file
      await writeFile(filepath, buffer);

      uploadedImages.push({
        url: `/uploads/products/${filename}`,
        filename: filename,
        isPrimary: uploadedImages.length === 0, // First image is primary
      });
    }

    return NextResponse.json({ images: uploadedImages });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 });
  }
}

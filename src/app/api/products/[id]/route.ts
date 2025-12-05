import { NextRequest, NextResponse } from 'next/server';
import { Product, ProductImage, ProductColor } from '@/database/models';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await Product.findByPk(params.id, {
      include: [
        {
          model: ProductImage,
          as: 'images',
        },
        {
          model: ProductColor,
          as: 'colors',
        },
      ],
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

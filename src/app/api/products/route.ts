import { NextRequest, NextResponse } from 'next/server';
import { Product, ProductImage, ProductColor } from '@/database/models';
import { Op } from 'sequelize';
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    logger.apiRequest("GET", request.nextUrl.pathname, Object.fromEntries(request.nextUrl.searchParams));
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const company = searchParams.get('company');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (company) {
      where.company = company;
    }

    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    let order: any = [['createdAt', 'DESC']];

    if (sort === 'price-lowest') {
      order = [['price', 'ASC']];
    } else if (sort === 'price-highest') {
      order = [['price', 'DESC']];
    } else if (sort === 'name-a') {
      order = [['name', 'ASC']];
    } else if (sort === 'name-z') {
      order = [['name', 'DESC']];
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: ProductImage,
          as: 'images',
          where: { isPrimary: true },
          required: false,
          attributes: ['id', 'url', 'filename'], // Only select needed fields
        },
        {
          model: ProductColor,
          as: 'colors',
          attributes: ['id', 'color'], // Only select needed fields
        },
      ],
      attributes: [
        'id',
        'name',
        'price',
        'description',
        'category',
        'company',
        'featured',
        'stock',
        'stars',
      ], // Only select needed fields
      order,
      limit,
      offset,
      distinct: true, // Prevent count duplicates from JOINs
      subQuery: false, // Optimize query performance
    });

    logger.success("Public products fetched", { count: products.length, page, limit });

    return NextResponse.json({
      products,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    logger.error("Error fetching products:", error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

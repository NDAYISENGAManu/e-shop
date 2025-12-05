import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Product, ProductImage, ProductColor } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    logger.apiRequest("GET", "/api/admin/products");
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Admin Products Access", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          as: "images",
          where: { isPrimary: true },
          required: false,
          attributes: ['id', 'url', 'filename'],
        },
        {
          model: ProductColor,
          as: "colors",
          attributes: ['id', 'color'],
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
        'shipping',
        'stock',
      ],
      order: [["createdAt", "DESC"]],
      subQuery: false,
    });

    logger.success("Admin products fetched", { count: products.length });
    return NextResponse.json(products);
  } catch (error) {
    logger.error("Admin products fetch error", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Create Product", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    logger.info("Creating product", { name: body.name });
    
    // Extract images from body if present
    const { images, ...productData } = body;
    
    const product = await Product.create(productData);
    logger.success("Product created", { id: product.id, name: product.name });

    // Create product images if provided
    if (images && images.length > 0) {
      await ProductImage.bulkCreate(
        images.map((img: any) => ({
          productId: product.id,
          url: img.url,
          filename: img.filename,
          isPrimary: img.isPrimary,
        }))
      );
      logger.info("Product images created", { productId: product.id, count: images.length });
    }

    // Fetch the complete product with images
    const completeProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: ProductImage,
          as: "images",
        },
      ],
    });

    return NextResponse.json(completeProduct, { status: 201 });
  } catch (error) {
    logger.error("Create product error", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

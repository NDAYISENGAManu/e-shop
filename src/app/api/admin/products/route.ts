import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Product, ProductImage, ProductColor } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  company: z.string().min(1, "Company is required"),
  featured: z.boolean().optional(),
  shipping: z.boolean().optional(),
  stock: z.number().int().min(0).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    filename: z.string(),
    isPrimary: z.boolean().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
  colors: z.array(z.object({
    color: z.string()
  })).optional()
});

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
        'createdBy',
        'updatedBy',
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

    // Validate input
    const validationResult = createProductSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warning("Create product validation failed", validationResult.error.errors);
      return NextResponse.json({ error: "Validation failed", details: validationResult.error.errors }, { status: 400 });
    }

    const validatedData = validationResult.data;
    logger.info("Creating product", { name: validatedData.name });

    // Extract images and colors from body if present
    const { images, colors, ...productData } = validatedData;
    const userId = parseInt((session.user as any).id);

    const product = await Product.create({
      ...productData,
      createdBy: userId,
      updatedBy: userId,
    });

    logger.success("Product created", { id: product.id, name: product.name });

    // Create product images if provided
    if (images && images.length > 0) {
      await ProductImage.bulkCreate(
        images.map((img: any) => ({
          productId: product.id,
          url: img.url,
          filename: img.filename,
          isPrimary: img.isPrimary,
          width: img.width || 800,
          height: img.height || 600,
        }))
      );
      logger.info("Product images created", { productId: product.id, count: images.length });
    }

    // Create product colors if provided
    if (colors && colors.length > 0) {
      await ProductColor.bulkCreate(
        colors.map((col: any) => ({
          productId: product.id,
          color: col.color,
        }))
      );
      logger.info("Product colors created", { productId: product.id, count: colors.length });
    }

    // Fetch the complete product with images and colors
    const completeProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: ProductImage,
          as: "images",
        },
        {
          model: ProductColor,
          as: "colors",
        },
      ],
    });

    return NextResponse.json(completeProduct, { status: 201 });
  } catch (error) {
    logger.error("Create product error", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

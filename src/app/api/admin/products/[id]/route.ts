import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Product, ProductImage, ProductColor } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Update Product", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validationResult = updateProductSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warning("Update product validation failed", validationResult.error.errors);
      return NextResponse.json({ error: "Validation failed", details: validationResult.error.errors }, { status: 400 });
    }

    const validatedData = validationResult.data;
    const { images, colors, ...productData } = validatedData;

    const product = await Product.findByPk(params.id);

    if (!product) {
      logger.warning("Product not found", { id: params.id });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userId = parseInt((session.user as any).id);

    await product.update({
      ...productData,
      updatedBy: userId
    });
    logger.success("Product updated", { id: params.id, name: product.name });

    // Handle images if provided
    if (images) {
      // Delete old images
      await ProductImage.destroy({ where: { productId: product.id } });

      // Create new images
      if (images.length > 0) {
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
      }
      logger.info('Product images updated', { productId: product.id, count: images.length });
    }

    // Handle colors if provided
    if (colors) {
      // Delete old colors
      await ProductColor.destroy({ where: { productId: product.id } });

      // Create new colors
      if (colors.length > 0) {
        await ProductColor.bulkCreate(
          colors.map((col: any) => ({
            productId: product.id,
            color: col.color,
          }))
        );
      }
      logger.info('Product colors updated', { productId: product.id, count: colors.length });
    }

    // Fetch the complete product with images and colors
    const completeProduct = await Product.findByPk(product.id, {
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

    return NextResponse.json(completeProduct);
  } catch (error) {
    logger.error("Update product error", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Delete Product", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product = await Product.findByPk(params.id);

    if (!product) {
      logger.warning("Product not found for deletion", { id: params.id });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete associated images and colors first
    await ProductImage.destroy({ where: { productId: product.id } });
    await ProductColor.destroy({ where: { productId: product.id } });

    await product.destroy();
    logger.success("Product deleted", { id: params.id });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    logger.error("Delete product error", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

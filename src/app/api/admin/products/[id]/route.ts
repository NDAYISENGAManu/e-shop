import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Product, ProductImage } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    const { images, ...productData } = body;
    const product = await Product.findByPk(params.id);

    if (!product) {
      logger.warning("Product not found", { id: params.id });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await product.update(productData);
    logger.success("Product updated", { id: params.id, name: product.name });

    // Handle new images if provided
    if (images && images.length > 0) {
      // Delete old images
      await ProductImage.destroy({ where: { productId: product.id } });

      // Create new images
      await ProductImage.bulkCreate(
        images.map((img: any) => ({
          productId: product.id,
          url: img.url,
          filename: img.filename,
          isPrimary: img.isPrimary,
        }))
      );
      logger.info('Product images updated', { productId: product.id, count: images.length });
    }

    // Fetch the complete product with images
    const completeProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: ProductImage,
          as: 'images',
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

    // Delete associated images first
    await ProductImage.destroy({ where: { productId: product.id } });

    await product.destroy();
    logger.success("Product deleted", { id: params.id });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    logger.error("Delete product error", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

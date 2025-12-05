import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Order, OrderItem, Product, ProductImage, Cart, CartItem } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    logger.apiRequest("GET", "/api/orders");
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      logger.authFailed("User Orders Access", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch completed orders
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price"],
              include: [
                {
                  model: ProductImage,
                  as: "images",
                  where: { isPrimary: true },
                  required: false,
                  attributes: ["url"],
                },
              ],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Fetch cart items as pending order
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price"],
              include: [
                {
                  model: ProductImage,
                  as: "images",
                  where: { isPrimary: true },
                  required: false,
                  attributes: ["url"],
                },
              ],
            },
          ],
        },
      ],
    });

    // Create a pending order object from cart if it exists and has items
    const allOrders: any[] = [...orders];
    if (cart && (cart as any).items && (cart as any).items.length > 0) {
      const cartItems = (cart as any).items;
      const total = cartItems.reduce((sum: number, item: any) => {
        return sum + (item.product?.price || 0) * item.quantity;
      }, 0);

      const pendingOrder = {
        id: 'pending',
        userId,
        total,
        status: 'pending',
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        items: cartItems.map((item: any) => ({
          id: `cart-${item.id}`,
          orderId: 'pending',
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          price: item.product?.price || 0,
          product: item.product,
        })),
      };

      allOrders.unshift(pendingOrder);
    }

    logger.success("User orders fetched", { userId, count: allOrders.length });
    return NextResponse.json(allOrders);
  } catch (error) {
    logger.error("User orders fetch error", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

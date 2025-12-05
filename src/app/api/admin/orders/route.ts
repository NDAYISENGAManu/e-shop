import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Order, User, OrderItem } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    logger.apiRequest("GET", "/api/admin/orders");
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Admin Orders Access", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName"],
        },
        {
          model: OrderItem,
          as: "items",
          attributes: ['id', 'quantity', 'price', 'color'],
        },
      ],
      attributes: ['id', 'userId', 'total', 'status', 'shippingFee', 'createdAt'],
      order: [["createdAt", "DESC"]],
      limit,
      subQuery: false,
    });

    logger.success("Admin orders fetched", { count: orders.length });
    return NextResponse.json(orders);
  } catch (error) {
    logger.error("Admin orders fetch error", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

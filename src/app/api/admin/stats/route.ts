import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Product, User, Order } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    logger.apiRequest("GET", "/api/admin/stats");
    
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Admin Stats Access", "Unauthorized - not admin");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalProducts, totalUsers, totalOrders, orders] = await Promise.all([
      Product.count(),
      User.count(),
      Order.count(),
      Order.findAll({
        attributes: ['total'],
      }),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const stats = {
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
    };

    logger.apiResponse("GET", "/api/admin/stats", 200, stats);
    return NextResponse.json(stats);
  } catch (error) {
    logger.error("Admin stats error", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

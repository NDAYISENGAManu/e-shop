import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Order } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Update Order", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const order = await Order.findByPk(params.id);

    if (!order) {
      logger.warning("Order not found", { id: params.id });
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await order.update({ status: body.status });
    logger.success("Order status updated", { id: params.id, status: body.status });

    return NextResponse.json(order);
  } catch (error) {
    logger.error("Update order error", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, Tag, Empty, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=/orders");
    }
  }, [status, router]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const response = await axios.get("/api/orders");
      return response.data;
    },
    enabled: !!session,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "blue";
      case "processing":
        return "warning";
      case "pending":
        return "error";
      default:
        return "default";
    }
  };

  if (status === "loading" || isLoading) {
    return <Loading fullScreen text="Loading your orders" />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            My Orders
          </h1>
          <Card className="shadow-lg">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-amber-700">
                    No Orders Yet
                  </h2>
                  <p className="text-gray-600">
                    You haven't placed any orders. Start shopping to see your
                    order history here.
                  </p>
                </div>
              }
            >
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  className="mt-4"
                >
                  Browse Products
                </Button>
              </Link>
            </Empty>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order: any) => (
            <Card
              key={order.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-100 hover:border-amber-300"
            >
              <div className="border-b-2 border-dashed border-orange-200 pb-4 mb-4">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-700 mb-2">
                      {order.id === "pending"
                        ? "Current Shopping Cart"
                        : `Order #${order.id}`}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Tag
                    color={getStatusColor(order.status)}
                    className="text-xs font-semibold uppercase px-4 py-1 rounded-full"
                  >
                    {order.id === "pending"
                      ? "Pending - In Cart"
                      : order.status}
                  </Tag>
                </div>
              </div>

              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100"
                  >
                    <img
                      src={
                        item.product?.images?.[0]?.url || "/placeholder.jpg"
                      }
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-amber-300"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-700 mb-1">
                        {item.product?.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      {item.color && (
                        <p className="text-gray-600 text-sm">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                    <div className="font-bold text-amber-700 text-lg">
                      ${((item.price || 0) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-orange-200 text-right">
                <h3 className="text-2xl font-bold text-amber-700">
                  Total: ${((order.total || 0) / 100).toFixed(2)}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { formatPrice } from "@/utils/helpers";

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
      case "delivered": return "#6b7f4a"; // Green
      case "shipped": return "#c87941"; // Primary
      case "processing": return "#d4a574"; // Gold
      case "pending": return "#e85d04"; // Orange
      default: return "#8b6f47"; // Brown
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "delivered": return "bg-[#6b7f4a]/10";
      case "shipped": return "bg-[#c87941]/10";
      case "processing": return "bg-[#d4a574]/10";
      case "pending": return "bg-[#e85d04]/10";
      default: return "bg-[#8b6f47]/10";
    }
  };

  if (status === "loading" || isLoading) {
    return <Loading fullScreen text="Loading your orders" />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] py-16 px-4 bg-[#fef9f3]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12 text-[#2d2416]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            My Orders
          </h1>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-[0_8px_30px_rgba(139,90,60,0.1)] border-2 border-[#e8d5c4] max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-[#fef9f3] rounded-full flex items-center justify-center mb-6 shadow-inner">
               <ShoppingOutlined className="text-4xl text-[#c87941]" />
            </div>
            <h2 className="text-3xl font-bold text-[#5c4028] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
               No Orders Yet
            </h2>
            <p className="text-[#8b6f47] mb-10 font-medium text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
               Your handcraft collection awaits.
            </p>
            <Link href="/products">
               <button 
                className="bg-gradient-to-r from-[#c87941] to-[#ba6f3e] border-none rounded-full px-10 py-4 h-auto font-bold text-lg text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all uppercase tracking-wider cursor-pointer"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
               >
                  Browse Collection
               </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-16 px-4 bg-[#fef9f3]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-[#2d2416]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          My Orders
        </h1>

        <div className="space-y-8">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(139,90,60,0.08)] hover:shadow-[0_8px_30px_rgba(139,90,60,0.15)] transition-all duration-300 border-2 border-[#e8d5c4] overflow-hidden"
            >
              <div className="p-6 border-b border-[#f5ebe0] bg-[#faf8f3] flex flex-wrap gap-4 justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-[#5c4028]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {order.id === "pending" ? "Current Shopping Cart" : `Order #${order.id}`}
                    </h3>
                  </div>
                  <p className="text-[#8b6f47] text-sm font-medium">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div 
                  className={`px-4 py-2 rounded-full font-bold uppercase text-xs tracking-wider flex items-center gap-2 ${getStatusBg(order.status)}`}
                  style={{ color: getStatusColor(order.status), fontFamily: "'Quicksand', sans-serif" }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(order.status) }}></span>
                  {order.id === "pending" ? "Pending" : order.status}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {order.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex gap-6 items-center"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#e8d5c4] shadow-sm flex-shrink-0 group">
                      <img
                        src={item.product?.images?.[0]?.url || "/placeholder.jpg"}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#2d2416] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {item.product?.name}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-[#8b6f47] font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        <span className="bg-[#fef9f3] px-3 py-1 rounded-lg border border-[#e8d5c4]">Qty: {item.quantity}</span>
                        {item.color && (
                          <span className="bg-[#fef9f3] px-3 py-1 rounded-lg border border-[#e8d5c4]">Color: {item.color}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-[#c87941]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {formatPrice(item.price || 0)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[#faf8f3] border-t border-[#f5ebe0] flex justify-end items-center">
                <div className="text-right">
                  <span className="text-[#8b6f47] mr-4 text-lg font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>Total Amount</span>
                  <span className="text-3xl font-bold text-[#2d2416]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatPrice(order.total || 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

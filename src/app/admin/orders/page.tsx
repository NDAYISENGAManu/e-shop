"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, Typography, Spin } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

export default function AdminOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/orders");
      return response.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: string }) =>
      axios.put(`/api/admin/orders/${orderId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  const getStatusStyle = (status: string) => {
    const styles: Record<
      string,
      { bg: string; text: string; border: string; icon: string }
    > = {
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-300",
        icon: "⏳",
      },
      processing: {
        bg: "bg-sky-50",
        text: "text-sky-800",
        border: "border-sky-300",
        icon: "🔨",
      },
      shipped: {
        bg: "bg-violet-50",
        text: "text-violet-800",
        border: "border-violet-300",
        icon: "📦",
      },
      delivered: {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        border: "border-emerald-300",
        icon: "✨",
      },
      cancelled: {
        bg: "bg-rose-50",
        text: "text-rose-800",
        border: "border-rose-300",
        icon: "✕",
      },
    };
    return styles[status] || styles.pending;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf7f2] to-[#e8d5c4]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🧵</span>
            </div>
          </div>
          <Text className="block mt-6 text-[#8b6f47] font-serif italic text-lg animate-pulse">
            Gathering the scrolls...
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#faf7f2] to-[#e8d5c4] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#d4a574]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#8b6f47]/10 to-transparent blur-3xl" />
        <svg
          className="absolute top-20 left-10 opacity-10"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <path
            d="M10,100 Q50,50 100,100 T190,100"
            stroke="#8b6f47"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
        <svg
          className="absolute bottom-40 right-20 opacity-10"
          width="150"
          height="150"
          viewBox="0 0 150 150"
        >
          <path
            d="M0,75 Q37.5,25 75,75 T150,75"
            stroke="#d4a574"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,4"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:px-8 md:py-16">
        {/* Artisanal Header */}
        <header className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[#d4a574]/60 text-4xl">
            ✦
          </div>

          <div className="inline-block relative">
            <div className="absolute -inset-4 border border-[#d4a574]/30 rounded-sm transform rotate-1" />
            <div className="absolute -inset-6 border border-[#8b6f47]/20 rounded-sm transform -rotate-1" />

            <div className="relative bg-[#faf7f2]/80 backdrop-blur-sm px-12 py-8 border-2 border-[#8b6f47]/40">
              <Text className="block text-xs uppercase tracking-[0.4em] text-[#d4a574] mb-3 font-medium">
                The Artisan&apos;s
              </Text>
              <Title
                level={1}
                className="!font-serif !text-[#5d4037] !mb-2 !text-4xl md:!text-5xl tracking-wide !font-normal"
                style={{ fontVariant: "small-caps" }}
              >
                Order Ledger
              </Title>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent" />
                <span className="text-[#d4a574]">✧</span>
                <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent" />
              </div>
              <Text className="block text-[#8b6f47]/70 font-serif italic text-sm mt-3">
                Each entry, a story of craftsmanship
              </Text>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-[#8b6f47]/50">
            <span className="text-lg">🪡</span>
            <span className="text-sm font-serif italic">
              {orders?.length || 0} tales recorded
            </span>
            <span className="text-lg">🧶</span>
          </div>
        </header>

        {/* Orders Grid */}
        {orders?.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-50">📜</div>
            <Text className="text-[#8b6f47] font-serif text-xl italic">
              The ledger awaits its first entry...
            </Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {orders?.map((order: any, index: number) => {
              const statusStyle = getStatusStyle(order.status);
              return (
                <article key={order.id} className="group relative">
                  {/* Washi tape decoration */}
                  <div
                    className="absolute -top-3 left-8 right-8 h-6 bg-gradient-to-r from-[#d4a574]/60 via-[#e8d5c4]/80 to-[#d4a574]/60 transform -rotate-1 z-20 shadow-sm"
                    style={{
                      clipPath: "polygon(2% 0%, 98% 5%, 100% 100%, 0% 95%)",
                    }}
                  />

                  {/* Paper stack effect */}
                  <div className="absolute inset-0 bg-[#f0e6d8] rounded transform rotate-2 translate-x-2 translate-y-2 shadow-md transition-transform duration-300 group-hover:rotate-3 group-hover:translate-x-3" />
                  <div className="absolute inset-0 bg-[#f5ebe0] rounded transform -rotate-1 translate-x-1 translate-y-1 shadow-sm transition-transform duration-300 group-hover:-rotate-2" />

                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-[#fffef9] via-[#fdfcf7] to-[#f8f4ed] rounded shadow-lg border border-[#e0d5c4] overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                    {/* Order number - Wax seal style */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b6f47] via-[#a67c52] to-[#5d4037] shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                          <div className="text-center">
                            <div className="text-[#f5ebe0] text-[10px] uppercase tracking-wider font-bold">
                              No.
                            </div>
                            <div className="text-[#f5ebe0] text-lg font-serif font-bold leading-none">
                              {order.id}
                            </div>
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-[#8b6f47] to-[#5d4037] rounded-b-full" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 pt-10">
                      <div className="mb-6">
                        <Text className="text-[#9ca3af] text-xs uppercase tracking-widest block mb-1">
                          Inscribed on
                        </Text>
                        <Text className="text-[#5d4037] font-serif text-lg italic">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/50 to-transparent" />
                        <span className="text-[#d4a574]/50 text-sm">❧</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-[#d4a574]/50 to-transparent" />
                      </div>

                      <div className="mb-6 pl-4 border-l-2 border-[#e8d5c4]">
                        <Text className="text-[#9ca3af] text-[10px] uppercase tracking-[0.2em] block mb-1">
                          For the Esteemed
                        </Text>
                        <Text
                          className="text-[#4b5563] font-serif text-xl block truncate"
                          title={order.user?.email}
                        >
                          {order.user?.firstName ||
                            order.user?.email?.split("@")[0] ||
                            "Valued Patron"}
                        </Text>
                        <Text className="text-[#9ca3af] text-sm italic block truncate">
                          {order.user?.email}
                        </Text>
                      </div>

                      <div className="bg-[#faf7f2]/50 rounded-sm p-4 mb-6 border border-dashed border-[#e0d5c4]">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📦</span>
                          <div>
                            <Text className="text-[#9ca3af] text-[10px] uppercase tracking-widest block">
                              Treasures Contained
                            </Text>
                            <Text className="text-[#5d4037] font-serif text-lg">
                              {order.items?.length || 0}{" "}
                              {order.items?.length === 1
                                ? "Handcrafted Piece"
                                : "Handcrafted Pieces"}
                            </Text>
                          </div>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="relative bg-[#5d4037] text-[#f5ebe0] p-4 -mx-8 mb-6">
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#4a3228] to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#4a3228] to-transparent" />
                        <div className="flex justify-between items-center px-4">
                          <Text className="text-[#d4a574] font-serif italic">
                            Sum Total
                          </Text>
                          <div className="flex items-baseline">
                            <span className="text-[#d4a574] text-sm mr-1 font-serif">
                              $
                            </span>
                            <span className="text-3xl font-serif font-light tracking-tight">
                              {((order.total || 0) / 100).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="relative">
                        <Text className="text-[#9ca3af] text-[10px] uppercase tracking-widest block mb-2 text-center">
                          Journey Status
                        </Text>
                        <div
                          className={`${statusStyle.bg} ${statusStyle.border} border-2 rounded-sm p-1`}
                        >
                          <Select
                            value={order.status}
                            onChange={(value) =>
                              updateStatusMutation.mutate({
                                orderId: order.id,
                                status: value,
                              })
                            }
                            className="w-full"
                            suffixIcon={
                              <span className="text-lg">
                                {statusStyle.icon}
                              </span>
                            }
                          >
                            {[
                              "pending",
                              "processing",
                              "shipped",
                              "delivered",
                              "cancelled",
                            ].map((status) => {
                              const style = getStatusStyle(status);
                              return (
                                <Select.Option key={status} value={status}>
                                  <div className="flex items-center gap-2 font-serif">
                                    <span>{style.icon}</span>
                                    <span className="capitalize">{status}</span>
                                  </div>
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="h-3 bg-gradient-to-r from-[#d4a574]/20 via-[#8b6f47]/30 to-[#d4a574]/20" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="w-20 h-px bg-gradient-to-r from-transparent to-[#d4a574]/50" />
            <span className="text-[#8b6f47]/40 text-2xl">✿</span>
            <span className="w-20 h-px bg-gradient-to-l from-transparent to-[#d4a574]/50" />
          </div>
          <Text className="block mt-4 text-[#8b6f47]/50 font-serif italic text-sm">
            Crafted with care, delivered with love
          </Text>
        </footer>
      </div>
    </div>
  );
}

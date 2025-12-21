"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Loading from "@/components/Loading";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { formatPrice } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/cart");
      return response.data;
    },
    enabled: !!session,
  });

  const handleRemove = async (itemId: number) => {
    try {
      await axios.delete("/api/cart", { data: { itemId } });
      showSuccess(t.common.itemRemoved);
      refetch();
    } catch (error) {
      showError(language === 'en' ? "Failed to remove item" : "Gukuramo igikoresho ntibyagenze neza");
    }
  };

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return <Loading fullScreen text={t.common.loading} />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const items = cart?.items || [];
  const total = items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-10rem)] py-20 bg-gradient-to-b from-[#fef9f3] to-[#fff5eb]">
        <div className="w-[90vw] max-w-[var(--max-width)] mx-auto">
          <h2 className="text-center mb-12 text-5xl bg-gradient-to-br from-[#8b6f47] to-[#d4a574] bg-clip-text text-transparent font-bold font-serif">
            {t.common.cart}
          </h2>
          <div className="text-center p-16 bg-white rounded-2xl shadow-[0_10px_30px_rgba(139,111,71,0.08)] border-2 border-[#f5ebe0]">
            <ShoppingCartOutlined className="text-[5rem] text-[#d4a574] mb-8 opacity-70" />
            <h2 className="text-[#8b6f47] mb-4 font-serif text-3xl">
              {t.common.emptyCart}
            </h2>
            <p className="text-[var(--clr-grey-5)] mb-8 text-lg leading-relaxed">
              {t.common.emptyCartMsg}
            </p>
            <Link
              href="/products"
              className="inline-block px-10 py-4 bg-gradient-to-br from-[#8b6f47] to-[#d4a574] text-white rounded-full font-bold tracking-wide transition-all duration-300 shadow-[0_8px_20px_rgba(139,111,71,0.3)] uppercase hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(139,111,71,0.4)]"
            >
              {t.common.browseProducts}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] py-20 bg-gradient-to-b from-[#fef9f3] to-[#fff5eb]">
      <div className="w-[90vw] max-w-[var(--max-width)] mx-auto">
        <h2 className="text-center mb-12 text-5xl bg-gradient-to-br from-[#8b6f47] to-[#d4a574] bg-clip-text text-transparent font-bold font-serif">
          {t.common.cart}
        </h2>

        {items.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-cols-[auto_1fr_auto] gap-8 items-center p-8 bg-white rounded-2xl mb-6 shadow-[0_4px_20px_rgba(139,111,71,0.1)] border-2 border-[#f5ebe0] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,111,71,0.15)]"
          >
            <img
              src={item.product.images?.[0]?.url || "/placeholder.jpg"}
              alt={item.product.name}
              className="w-[120px] h-[120px] object-cover rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
            <div>
              <h5 className="mb-3 text-xl text-[#8b6f47] font-serif">
                {item.product.name}
              </h5>
              <p className="text-[var(--clr-grey-5)] mb-2 text-sm">
                {t.common.color}: {item.color}
              </p>
              <p className="text-[var(--clr-grey-5)] mb-2 text-sm">
                {t.common.quantity}: {item.quantity}
              </p>
              <p className="text-lg font-bold text-[#8b6f47]">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
            <Button
              variant="danger"
              size="lg"
              onClick={() => handleRemove(item.id)}
              className="!px-6 !py-3 !h-auto !shadow-[0_4px_12px_rgba(220,53,69,0.3)] hover:!-translate-y-1 hover:!shadow-[0_6px_16px_rgba(220,53,69,0.4)] active:!translate-y-0"
            >
              {t.common.remove}
            </Button>
          </div>
        ))}

        <div className="mt-8 p-10 bg-gradient-to-br from-[#fff5eb] to-[#fef9f3] rounded-2xl text-right border-2 border-[#e8d5c4] shadow-[0_8px_24px_rgba(139,111,71,0.12)]">
          <h3 className="mb-6 text-3xl text-[#8b6f47] font-serif">
            {t.common.total}: {formatPrice(total)}
          </h3>
          <Button
            variant="primary"
            size="lg"
            className="!mt-4 !px-10 !py-6 !h-auto uppercase !font-bold tracking-wide !shadow-[0_8px_20px_rgba(139,111,71,0.3)] hover:!-translate-y-1 hover:!shadow-[0_12px_28px_rgba(139,111,71,0.4)] active:!translate-y-0"
          >
            {t.common.checkout}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Product } from "@/types";
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Loading from "@/components/Loading";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const { showSuccess, showError, showWarning } = useNotification();
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { t, language } = useLanguage();

  const [isAdding, setIsAdding] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    },
  });
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!session) return null;
      const response = await axios.get("/api/cart");
      return response.data;
    },
    enabled: !!session,
  });

  useEffect(() => {
    if (product && cart && session) {
      const cartItem = cart.items?.find((item: any) => item.productId === parseInt(id));
      const currentCartQuantity = cartItem ? cartItem.quantity : 0;

      if (currentCartQuantity > 0 && currentCartQuantity >= product.stock) {
        showWarning(language === 'en' 
          ? `You have all available stock (${product.stock}) in your cart.`
          : `Ufite ibikoresho byose bihari (${product.stock}) mu giseke cyawe.`);
        router.push("/cart");
      }
    }
  }, [product, cart, id, router, showWarning, session, language]);

  const handleIncrement = () => {
    const cartItem = cart?.items?.find((item: any) => item.productId === parseInt(id));
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;
    const availableStock = product.stock - currentCartQuantity;

    if (quantity >= availableStock) {
      const message = currentCartQuantity > 0
        ? (language === 'en' 
            ? `Cannot add more. You have ${currentCartQuantity} in cart and only ${product.stock} in stock.`
            : `Ntabwo wakongeraho. Ufite ${currentCartQuantity} mu giseke kandi hari ${product.stock} gusa.`)
        : (language === 'en'
            ? `Cannot add more. You have selected all available items (${product.stock} in stock).`
            : `Ntabwo wakongeraho. Wahisemo ibikoresho byose bihari (${product.stock} bihari).`);
      showError(message);
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!session) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    setIsAdding(true);
    try {
      await axios.post("/api/cart", {
        productId: parseInt(id),
        quantity,
        color: selectedColor || null,
      });
      showSuccess(t.common.productAdded);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setQuantity(1);
    } catch (error: any) {
      showError(error.response?.data?.error || (language === 'en' ? "Failed to add product to cart" : "Gushyira mu giseke ntibyagenze neza"));
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) return <Loading fullScreen text={t.common.loading} />;
  if (!product) return <Loading fullScreen text={t.common.productNotFound} />;

  return (
    <div className="min-h-[calc(100vh-10rem)] py-20 bg-gradient-to-b from-white to-[#f8f9ff] animate-[fadeIn_0.6s_ease-out]">
      <div className="w-[90vw] max-w-[var(--max-width)] mx-auto grid gap-16 md:grid-cols-2">
        <div>
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-transform duration-[0.4s] hover:scale-[1.02]"
          />
        </div>

        <div>
          <h2 className="mb-4 text-4xl bg-gradient-to-br from-[var(--clr-grey-1)] to-[var(--clr-primary-5)] bg-clip-text text-transparent font-bold">
            {product.name}
          </h2>
          <p className="text-[var(--clr-primary-5)] text-2xl font-semibold mb-4">
            {formatPrice(product.price)}
          </p>
          <p className="leading-14 mb-8">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2">{t.common.color}:</h4>
              <div className="flex gap-2">
                {product.colors.map((c: any) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.color)}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer transition-all duration-300 hover:scale-125"
                    style={{
                      backgroundColor: c.color,
                      border:
                        selectedColor === c.color
                          ? "3px solid var(--clr-primary-5)"
                          : "3px solid transparent",
                      boxShadow:
                        selectedColor === c.color
                          ? "0 0 0 3px rgba(99, 102, 241, 0.2), 0 4px 12px rgba(0, 0, 0, 0.2)"
                          : "0 2px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 font-quicksand">
            <h4 className="mb-2 uppercase text-xs font-bold tracking-widest text-[#7a5838]">{t.common.quantity}</h4>
            <div className="flex items-center gap-4 bg-[#fef9f3] w-fit p-1 rounded-full border border-[#e8d5c4]/50 shadow-inner">
              <Button
                variant="primary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="!p-3 !h-12 !w-12 !min-w-0 rounded-full flex items-center justify-center"
              >
                <MinusOutlined />
              </Button>
              <span className="text-2xl font-bold w-12 text-center text-[#2d2416] tabular-nums">{quantity}</span>
              <Button
                variant="primary"
                onClick={handleIncrement}
                className="!p-3 !h-12 !w-12 !min-w-0 rounded-full flex items-center justify-center"
              >
                <PlusOutlined />
              </Button>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            loading={isAdding}
            className="w-full sm:w-auto uppercase tracking-[var(--spacing)] !shadow-[0_8px_20px_rgba(200,121,65,0.3)] hover:!shadow-[0_12px_28px_rgba(200,121,65,0.4)]"
          >
            {t.common.addToCart}
          </Button>
        </div>
      </div>
    </div>
  );
}

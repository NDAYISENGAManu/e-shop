"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Loading from "@/components/Loading";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { showSuccess, showError, showWarning } = useNotification();
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${params.id}`);
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
      const cartItem = cart.items?.find((item: any) => item.productId === parseInt(params.id));
      const currentCartQuantity = cartItem ? cartItem.quantity : 0;

      if (currentCartQuantity > 0 && currentCartQuantity >= product.stock) {
        showWarning(`You have all available stock (${product.stock}) in your cart.`);
        router.push("/cart");
      }
    }
  }, [product, cart, params.id, router, showWarning, session]);

  const handleIncrement = () => {
    const cartItem = cart?.items?.find((item: any) => item.productId === parseInt(params.id));
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;
    const availableStock = product.stock - currentCartQuantity;

    if (quantity >= availableStock) {
      const message = currentCartQuantity > 0
        ? `Cannot add more. You have ${currentCartQuantity} in cart and only ${product.stock} in stock.`
        : `Cannot add more. You have selected all available items (${product.stock} in stock).`;
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

    try {
      await axios.post("/api/cart", {
        productId: params.id,
        quantity,
        color: selectedColor || null,
      });
      showSuccess("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setQuantity(1);
    } catch (error: any) {
      showError(error.response?.data?.error || "Failed to add product to cart");
    }
  };

  if (isLoading) return <Loading fullScreen text="Loading product" />;
  if (!product) return <Loading fullScreen text="Product not found" />;

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
            ${(product.price / 100).toFixed(2)}
          </p>
          <p className="leading-14 mb-8">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2">Colors:</h4>
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

          <div className="mb-8">
            <h4 className="mb-2">Quantity:</h4>
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                icon={<MinusOutlined />}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <span className="text-2xl font-semibold">{quantity}</span>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleIncrement}
              />
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleAddToCart}
            className="!bg-gradient-to-br from-[var(--clr-primary-5)] to-[var(--clr-primary-7)] !px-10 !py-6 !h-auto uppercase tracking-[var(--spacing)] !font-bold !shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:!-translate-y-1 hover:!shadow-[0_12px_28px_rgba(99,102,241,0.4)] active:!translate-y-0"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

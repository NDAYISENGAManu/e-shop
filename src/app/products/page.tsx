"use client";

import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import Link from "next/link";
import axios from "axios";
import { Product } from "@/types";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function ProductsPage() {
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [sort, setSort] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", category, company, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (company) params.append("company", company);
      if (sort) params.append("sort", sort);

      const response = await axios.get(`/api/products?${params.toString()}`);
      return response.data;
    },
  });

  const products = data?.products || [];

  return (
    <div className="min-h-[calc(100vh-10rem)] py-20 bg-gradient-to-b from-white to-[#f8f9ff] animate-[fadeIn_0.5s_ease-out]">
      <div className="w-[90vw] max-w-[var(--max-width)] mx-auto">
        <h2 className="text-center mb-12 text-5xl bg-gradient-to-br from-[var(--clr-primary-5)] to-[var(--clr-primary-7)] bg-clip-text text-transparent font-bold tracking-tight">
          All Products
        </h2>

        <div className="grid gap-4 mb-12 md:grid-cols-4">
          <Select
            size="large"
            value={category || undefined}
            onChange={setCategory}
            placeholder="All Categories"
            className="w-full"
            options={[
              { value: "", label: "All Categories" },
              { value: "office", label: "Office" },
              { value: "living room", label: "Living Room" },
              { value: "kitchen", label: "Kitchen" },
              { value: "bedroom", label: "Bedroom" },
              { value: "dining", label: "Dining" },
              { value: "kids", label: "Kids" },
            ]}
          />

          <Select
            size="large"
            value={company || undefined}
            onChange={setCompany}
            placeholder="All Companies"
            className="w-full"
            options={[
              { value: "", label: "All Companies" },
              { value: "marcos", label: "Marcos" },
              { value: "liddy", label: "Liddy" },
              { value: "ikea", label: "IKEA" },
              { value: "caressa", label: "Caressa" },
            ]}
          />

          <Select
            size="large"
            value={sort || undefined}
            onChange={setSort}
            placeholder="Sort By"
            className="w-full"
            options={[
              { value: "", label: "Sort By" },
              { value: "price-lowest", label: "Price (Lowest)" },
              { value: "price-highest", label: "Price (Highest)" },
              { value: "name-a", label: "Name (A-Z)" },
              { value: "name-z", label: "Name (Z-A)" },
            ]}
          />
        </div>

        {isLoading ? (
          <Loading text="Loading products" />
        ) : (
          <div className="grid gap-8 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {products.map((product: Product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden relative block cursor-pointer hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-br before:from-[var(--clr-primary-5)] before:to-[var(--clr-primary-7)] before:opacity-0 before:transition-opacity before:duration-[0.4s] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] hover:before:opacity-100"
              >
                <div className="overflow-hidden rounded-t-2xl group">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-[225px] object-cover rounded-t-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                  />
                </div>
                <footer className="p-4 px-6">
                  <h5 className="mb-2 font-normal">{product.name}</h5>
                  <p className="text-[var(--clr-primary-5)] font-semibold">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                </footer>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

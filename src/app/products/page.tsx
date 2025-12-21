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

        <div className="grid gap-6 mb-12 md:grid-cols-3">
          {/* Category Filter */}
          <div className="relative group">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-[#c87941] uppercase tracking-wider z-10 transition-colors group-hover:text-[#ba6f3e]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[56px] px-4 appearance-none rounded-xl border-2 border-[#e8d5c4] bg-[#fef9f3] text-base text-[#5c4028] focus:border-[#c87941] focus:shadow-[0_0_0_4px_rgba(200,121,65,0.1)] focus:outline-none transition-all cursor-pointer hover:border-[#d6c0ad]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <option value="">All Categories</option>
              {["office", "living room", "kitchen", "bedroom", "dining", "kids"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c87941] group-hover:translate-y-[-10%] transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

          {/* Company Filter */}
          <div className="relative group">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-[#c87941] uppercase tracking-wider z-10 transition-colors group-hover:text-[#ba6f3e]">Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-[56px] px-4 appearance-none rounded-xl border-2 border-[#e8d5c4] bg-[#fef9f3] text-base text-[#5c4028] focus:border-[#c87941] focus:shadow-[0_0_0_4px_rgba(200,121,65,0.1)] focus:outline-none transition-all cursor-pointer hover:border-[#d6c0ad]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <option value="">All Companies</option>
              {["marcos", "liddy", "ikea", "caressa"].map((comp) => (
                <option key={comp} value={comp}>
                  {comp.charAt(0).toUpperCase() + comp.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c87941] group-hover:translate-y-[-10%] transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="relative group">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-bold text-[#c87941] uppercase tracking-wider z-10 transition-colors group-hover:text-[#ba6f3e]">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full h-[56px] px-4 appearance-none rounded-xl border-2 border-[#e8d5c4] bg-[#fef9f3] text-base text-[#5c4028] focus:border-[#c87941] focus:shadow-[0_0_0_4px_rgba(200,121,65,0.1)] focus:outline-none transition-all cursor-pointer hover:border-[#d6c0ad]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <option value="">Default</option>
              <option value="price-lowest">Price (Lowest)</option>
              <option value="price-highest">Price (Highest)</option>
              <option value="name-a">Name (A-Z)</option>
              <option value="name-z">Name (Z-A)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c87941] group-hover:translate-y-[-10%] transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
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

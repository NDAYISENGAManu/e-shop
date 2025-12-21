"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { Card } from "antd";
import { Product } from "@/types";
import Loading from "./Loading";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { formatPrice } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";

const { Meta } = Card;

export default function FeaturedProducts() {
  const { t, language } = useLanguage();
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await axios.get("/api/products?featured=true&limit=3");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#fffefa] via-[#fff5eb] to-[#fffefa]">
        <Loading text={t.common.loading + '...'} />
      </section>
    );
  }

  const products = data?.products || [];

  return (
    <section className="py-24 bg-gradient-to-b from-[#fffefa] via-[#fff5eb] to-[#fffefa] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-[#c87941]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-radial from-[#6b7f4a]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="w-[90vw] max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-[#e8d5c4] mb-6">
            <StarFilled className="text-[#c87941]" />
            <span 
              className="text-[#7a5838] font-bold tracking-[3px] uppercase text-sm"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {language === 'en' ? 'Curated For You' : 'Byatoranyirijwe wowe'}
            </span>
          </div>

          <h2 
            className="text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {/* <span className="block text-[#2d2416]">Featured</span> */}
            <span className="block bg-gradient-to-r from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] bg-clip-text text-transparent">
              {t.common.featuredProducts}
            </span>
          </h2>
          
          <p 
            className="text-lg text-[#5a4a3a] max-w-[600px] mx-auto"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {language === 'en' 
              ? 'Discover our hand-picked selection of unique, artisan-made pieces'
              : 'Iyumvire amateka n\'ubuhanga muri buri gikoresho byatoranyijwe'}
          </p>

          {/* Decorative underline */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#c87941] to-[#6b7f4a] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block group"
            >
              <div className="relative">
                {/* Product Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4] transition-all duration-500 group-hover:shadow-[0_12px_40px_rgba(139,90,60,0.2)] group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#faf8f3] to-[#fff5eb]">
                    <img
                      alt={product.name}
                      src={product.images?.[0]?.url || "/placeholder.jpg"}
                      className="w-full h-[280px] object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Handmade Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[#e8d5c4] flex items-center gap-2">
                      <HeartOutlined className="text-[#c87941] text-sm" />
                      <span 
                        className="text-xs font-bold text-[#7a5838]"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {language === 'en' ? 'Handmade' : 'Ubuhoro'}
                      </span>
                    </div>

                    {/* Floating decorative dots */}
                    <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#c87941]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-[-4px]"></div>
                    <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-[#6b7f4a]/60 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-y-[-6px]"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 
                      className="text-2xl font-bold mb-2 text-[#2d2416] capitalize group-hover:text-[#c87941] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <p 
                        className="text-2xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {formatPrice(product.price)}
                      </p>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarFilled 
                            key={i} 
                            className="text-[#c87941] text-sm opacity-80" 
                          />
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button 
                      className="w-full mt-4 bg-gradient-to-r from-[#c87941] to-[#ba6f3e] text-white py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                      style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
                    >
                      {language === 'en' ? 'View Details' : 'Reba ibindi'}
                    </button>
                  </div>
                </div>

                {/* Decorative background blur */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#c87941]/20 to-[#6b7f4a]/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <Link href="/products">
            <button 
              className="bg-white border-2 border-[#c87941] text-[#c87941] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#c87941] hover:text-white transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
            >
              {language === 'en' ? 'Explore All Products' : 'Reba ibikoresho byose'} →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

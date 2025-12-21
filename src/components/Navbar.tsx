"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCartOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";
import { Badge, Space, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { data: session } = useSession();

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/cart");
      return response.data;
    },
    enabled: !!session,
    refetchInterval: 5000,
  });

  const cartItemCount =
    cart?.items?.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    ) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#faf8f3] via-[#fffefa] to-[#fff5eb] shadow-[0_8px_32px_rgba(139,90,60,0.12)] backdrop-blur-sm border-b-2 border-[#e8d5c4]">
      {/* Decorative top border with organic pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c87941] via-[#6b7f4a] to-[#c87941] opacity-60"></div>
      
      <div className="w-[90vw] max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between h-28 relative">
          {/* Logo - Handcrafted Style */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-4 transition-transform hover:scale-105"
            >
              {/* Decorative handcraft icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-[0_4px_16px_rgba(139,90,60,0.25)] group-hover:shadow-[0_6px_20px_rgba(139,90,60,0.35)] transition-all">
                  <HeartOutlined className="text-white text-2xl" />
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#6b7f4a] opacity-70"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#c87941] opacity-70"></div>
              </div>
              
              {/* Brand Text - Horizontal Layout */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#7a5838] via-[#c87941] to-[#6b7f4a] bg-clip-text text-transparent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Manu
                </span>
                {/* <span className="hidden md:inline-block text-sm tracking-[3px] uppercase text-[#8b6f47] opacity-70" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
                  Handcraft
                </span> */}
              </div>
            </Link>
          </div>

          {/* Navigation Links - Artistic Curved Style */}
          <ul className="hidden md:flex gap-3 items-center bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(139,90,60,0.1)] border border-[#e8d5c4]">
            <li>
              <Link
                href="/"
                className="relative px-6 py-3 text-[#7a5838] text-base font-bold capitalize tracking-wide rounded-full transition-all hover:text-[#c87941] group overflow-hidden"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c87941]/10 to-[#6b7f4a]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </li>
            <li className="w-px h-8 bg-gradient-to-b from-transparent via-[#e8d5c4] to-transparent"></li>
            <li>
              <Link
                href="/about"
                className="relative px-6 py-3 text-[#7a5838] text-base font-bold capitalize tracking-wide rounded-full transition-all hover:text-[#c87941] group overflow-hidden"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c87941]/10 to-[#6b7f4a]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </li>
            <li className="w-px h-8 bg-gradient-to-b from-transparent via-[#e8d5c4] to-transparent"></li>
            <li>
              <Link
                href="/products"
                className="relative px-6 py-3 text-[#7a5838] text-base font-bold capitalize tracking-wide rounded-full transition-all hover:text-[#c87941] group overflow-hidden"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <span className="relative z-10">Shop</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c87941]/10 to-[#6b7f4a]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                {/* Small decorative underline dot */}
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#c87941] rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"></div>
              </Link>
            </li>
            <li className="w-px h-8 bg-gradient-to-b from-transparent via-[#e8d5c4] to-transparent"></li>
            <li>
              <Link
                href="/orders"
                className="relative px-6 py-3 text-[#7a5838] text-base font-bold capitalize tracking-wide rounded-full transition-all hover:text-[#c87941] group overflow-hidden"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <span className="relative z-10">Orders</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c87941]/10 to-[#6b7f4a]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </li>
          </ul>

          {/* Right Side Actions */}
          <Space size="middle" className="flex items-center">
            <SearchModal />

            {/* Cart Button - Handcraft Style */}
            <Link
              href="/cart"
              className="group relative flex items-center gap-2 px-4 py-2.5 text-default hover:text-[#c87941] transition-all rounded-full hover:bg-gradient-to-r hover:from-[#c87941]/10 hover:to-[#6b7f4a]/10"
              style={{textDecoration: 'none', color: '#7a5838', fontFamily: "'Quicksand', sans-serif"}}
            >
              <Badge
                count={cartItemCount}
                size="small"
                style={{ 
                  backgroundColor: '#c87941', 
                  boxShadow: '0 2px 8px rgba(200, 121, 65, 0.3)',
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 600
                }}
                offset={[4, -4]}
              >
                <ShoppingCartOutlined className="text-xl transition-transform group-hover:scale-110" />
              </Badge>
              <span className="font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Cart</span>
            </Link>

            {session ? (
              <>
                {(session.user as any)?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="px-5 py-2.5 text-[#7a5838] bg-gradient-to-r from-[#6b7f4a]/20 to-[#c87941]/20 font-bold rounded-full hover:from-[#6b7f4a]/30 hover:to-[#c87941]/30 transition-all shadow-sm hover:shadow-md border border-[#e8d5c4]"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Back Office
                  </Link>
                )}
                <Button
                  type="primary"
                  onClick={() => signOut()}
                  className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-7 !py-2.5 !h-auto !font-bold !shadow-[0_4px_16px_rgba(139,90,60,0.25)] hover:!shadow-[0_6px_20px_rgba(139,90,60,0.35)] hover:!-translate-y-0.5 !transition-all"
                  style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <button
                  className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-7 !py-2.5 !h-auto !font-bold !shadow-[0_4px_16px_rgba(139,90,60,0.25)] hover:!shadow-[0_6px_20px_rgba(139,90,60,0.35)] hover:!-translate-y-0.5 !transition-all text-white cursor-pointer"
                  style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
                >
                  Login
                </button>
              </Link>
            )}
          </Space>
        </div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 90, 60, 1) 10px, rgba(139, 90, 60, 1) 20px)`
      }}></div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#faf8f3] via-[#fff5eb] to-[#fffefa]">
      {/* Organic Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative circles */}
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-radial from-[#c87941]/20 via-[#c87941]/5 to-transparent animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-20%] left-[-15%] w-[900px] h-[900px] rounded-full bg-gradient-radial from-[#6b7f4a]/15 via-[#6b7f4a]/5 to-transparent animate-[float_25s_ease-in-out_infinite_reverse]"></div>
        
        {/* Organic waves */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z" fill="#c87941"/>
        </svg>
        
        {/* Handcraft texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #c87941 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #6b7f4a 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #c87941 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 80px 80px'
        }}></div>
      </div>

      <div className="w-[90vw] max-w-[1280px] mx-auto grid gap-12 relative z-10 md:grid-cols-2 md:items-center py-16">
        {/* Content Side */}
        <article className="space-y-6 animate-[fadeInUp_0.8s_ease-out]">
          {/* Decorative Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border-2 border-[#e8d5c4]">
            <div className="w-2 h-2 rounded-full bg-[#c87941] animate-pulse"></div>
            <span 
              className="text-[#7a5838] font-bold tracking-[3px] uppercase text-sm"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              ✨ Made with Love & Care
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-6xl mb-0 leading-[1.1] md:text-7xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block text-[#2d2416] font-bold">
              Discover the
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] bg-clip-text text-transparent font-extrabold">
              Art of Handcraft
            </span>
          </h1>

          {/* Handwritten Accent */}
          <div 
            className="text-4xl text-[#c87941] opacity-80 -rotate-2 inline-block"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Made by passionate artisans
          </div>

          {/* Description */}
          <p 
            className="text-lg leading-relaxed text-[#5a4a3a] mb-8 max-w-[550px]"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Every piece tells a unique story of tradition, creativity, and soul.
            Browse our curated collection of handmade treasures, each crafted with
            dedication and heart by talented artisans from around the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/products">
              <Button
                size="lg"
                variant="primary"
                className="!px-10 !py-7 !h-auto !text-lg !font-bold !shadow-[0_8px_24px_rgba(200,121,65,0.3)] hover:!shadow-[0_12px_32px_rgba(200,121,65,0.4)] hover:!-translate-y-1 !transition-all group"
                style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
              >
                <span className="flex items-center gap-3">
                  Explore Collection
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Button>
            </Link>
            
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="!px-10 !py-7 !h-auto !text-lg !font-bold !transition-all hover:!-translate-y-1 hover:!shadow-lg"
                style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-[#e8d5c4]/50">
            <div className="flex items-center gap-2">
              <div className="w-15 h-15 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center text-white font-bold shadow-md">
                ✓
              </div>
              <div>
                <div className="font-bold text-[#2d2416]" style={{ fontFamily: "'Quicksand', sans-serif" }}>100% Handmade</div>
                <div className="text-sm text-[#7a5838]">No mass production</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-15 h-15 rounded-full bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] flex items-center justify-center text-white font-bold shadow-md">
                ♥
              </div>
              <div>
                <div className="font-bold text-[#2d2416]" style={{ fontFamily: "'Quicksand', sans-serif" }}>Eco-Friendly</div>
                <div className="text-sm text-[#7a5838]">Sustainable materials</div>
              </div>
            </div>
          </div>
        </article>

        {/* Image Side - Creative Layout */}
        <article className="hidden md:block relative animate-[fadeInUp_1s_ease-out_0.3s_backwards]">
          {/* Main Image with Organic Shape */}
          <div className="relative group">
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#c87941]/30 to-[#6b7f4a]/30 rounded-[3rem] rotate-3 blur-xl group-hover:rotate-6 transition-transform duration-500"></div>
            
            {/* Image container */}
            <div className="relative overflow-hidden rounded-[3rem] shadow-[0_20px_60px_rgba(139,90,60,0.3)] border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800"
                alt="Handcrafted artisan products"
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d2416]/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border-2 border-[#e8d5c4] animate-[float_6s_ease-in-out_infinite]">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                15+
              </div>
              <div className="text-sm font-semibold text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Unique Items
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] rounded-full opacity-80 shadow-lg animate-[float_8s_ease-in-out_2s_infinite]"></div>
            <div className="absolute top-1/2 -left-6 w-16 h-16 bg-gradient-to-br from-[#c87941] to-[#ba6f3e] rounded-full opacity-70 shadow-lg animate-[float_7s_ease-in-out_1s_infinite]"></div>
          </div>
        </article>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c87941]/30 to-transparent"></div>
    </section>
  );
}

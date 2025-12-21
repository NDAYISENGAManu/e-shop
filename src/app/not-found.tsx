"use client";

import { Button } from "@/components/ui/Button";
import { SearchOutlined, HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t, language } = useLanguage();
  const isKinyarwanda = language === 'rw';

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#fef9f3] relative overflow-hidden">
      {/* Decorative Handcraft Elements */}
      <div className="absolute top-[10%] left-[5%] text-[15rem] font-serif text-[#c87941]/5 select-none pointer-events-none -rotate-12">4</div>
      <div className="absolute top-[10%] right-[10%] text-[15rem] font-serif text-[#6b7f4a]/5 select-none pointer-events-none rotate-12">0</div>
      <div className="absolute bottom-[10%] left-[15%] text-[15rem] font-serif text-[#8b6f47]/5 select-none pointer-events-none rotate-6">4</div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-[0_20px_50px_rgba(139,111,71,0.1)] border-2 border-[#e8d5c4] animate-bounce">
          <SearchOutlined className="text-5xl text-[#d4a574]" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#2d2416] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {isKinyarwanda ? "Ntabwo Bibonetse" : "Lost in the Gallery?"}
        </h1>

        <p className="text-xl text-[#8b6f47] mb-12 max-w-lg mx-auto leading-relaxed font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {isKinyarwanda 
            ? "Ipadiko ushaka ntabwo riri hano. Wenda ryahindutse cyangwa ryasibwe." 
            : "The handcrafted masterpiece you're looking for seems to have moved to a different corner of our gallery."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-10 py-4 h-auto rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingOutlined />
              {isKinyarwanda ? "Reba Ibihimbano" : "Browse Collection"}
            </Button>
          </Link>
          
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-10 py-4 h-auto rounded-full font-bold border-2 border-[#e8d5c4] text-[#8b6f47] bg-white hover:bg-[#fef9f3] transition-all flex items-center justify-center gap-2"
            >
              <HomeOutlined />
              {isKinyarwanda ? "Subira Ahabanza" : "Back to Home"}
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-[#d6c0ad] text-sm uppercase tracking-[0.2em] font-bold">
          {isKinyarwanda ? "Manu Handcraft - Ubuhanga Nyabwo" : "Manu Handcraft - Authentic Craftsmanship"}
        </div>
      </div>
    </div>
  );
}

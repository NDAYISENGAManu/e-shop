"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { WarningOutlined, HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const isKinyarwanda = language === 'rw';

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#fef9f3] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#c87941]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#6b7f4a]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-[0_20px_50px_rgba(200,121,65,0.15)] border-2 border-[#e8d5c4] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <WarningOutlined className="text-5xl text-[#c87941]" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#2d2416] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {isKinyarwanda ? "Habaye Ikibazo" : "Something Went Wrong"}
        </h1>

        <p className="text-xl text-[#8b6f47] mb-12 max-w-lg mx-auto leading-relaxed font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {isKinyarwanda 
            ? "Murengere, habaye ikibazo kidateganyijwe. Turimo kugikemura mu kanya kashize." 
            : "Oops! We encountered an unexpected error while crafting your experience. Our artisans are already looking into it."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-10 py-4 h-auto rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <ReloadOutlined />
            {isKinyarwanda ? "Ongera Uzamure" : "Try Again"}
          </Button>
          
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-10 py-4 h-auto rounded-full font-bold border-2 border-[#e8d5c4] text-[#8b6f47] bg-white hover:bg-[#fef9f3] transition-all flex items-center justify-center gap-2"
            >
              <HomeOutlined />
              {isKinyarwanda ? "Guterera mu Rugo" : "Back to Home"}
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-[#d6c0ad] text-sm uppercase tracking-[0.2em] font-bold">
          {isKinyarwanda ? "Manu Handcraft - Ibisubizo by'ubuhanga" : "Manu Handcraft - Artisan Excellence"}
        </div>
      </div>
    </div>
  );
}

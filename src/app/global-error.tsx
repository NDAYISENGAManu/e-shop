"use client";

import { WarningOutlined, ReloadOutlined } from "@ant-design/icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#fef9f3] relative overflow-hidden font-sans">
          {/* Decorative Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#c87941]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#6b7f4a]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="max-w-2xl w-full text-center relative z-10">
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-[0_20px_50px_rgba(200,121,65,0.15)] border-2 border-[#e8d5c4] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <WarningOutlined className="text-5xl text-[#c87941]" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#2d2416] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Critical Craft Error
            </h1>

            <p className="text-xl text-[#8b6f47] mb-12 max-w-lg mx-auto leading-relaxed font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              A critical issue occurred in our artisan workshop. Please try reloading the entire application to continue your journey.
            </p>

            <button
              onClick={() => reset()}
              className="bg-gradient-to-r from-[#c87941] to-[#ba6f3e] border-none rounded-full px-12 py-5 font-bold text-xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <ReloadOutlined />
              Re-Craft Experience
            </button>

            <div className="mt-16 text-[#d6c0ad] text-sm uppercase tracking-[0.2em] font-bold">
              Manu Handcraft - Artisan Excellence
            </div>
          </div>
        </div>

        {/* CSS for animation and fonts if needed, though Tailwind classes are used */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; background: #fef9f3; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}} />
      </body>
    </html>
  );
}

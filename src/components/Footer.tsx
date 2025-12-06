"use client";

import { HeartOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-gradient-to-br from-[#2d2416] via-[#3a2d1d] to-[#2d2416] text-white overflow-hidden">
      {/* Decorative top wave */}
      <svg className="absolute top-0 left-0 w-full -translate-y-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0,50 Q300,90 600,50 T1200,50 L1200,0 L0,0 Z" fill="url(#footerGradient)"/>
        <defs>
          <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d2416" />
            <stop offset="50%" stopColor="#3a2d1d" />
            <stop offset="100%" stopColor="#2d2416" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200, 121, 65, 1) 10px, rgba(200, 121, 65, 1) 20px)`
      }}></div>

      <div className="relative z-10 w-[90vw] max-w-[1280px] mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-lg">
                <HeartOutlined className="text-white text-xl" />
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold bg-gradient-to-r from-[#c87941] to-[#d4a574] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Manu Handcraft
                </h3>
                <p className="text-xs text-[#d4a574]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Made with love
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Curating authentic handmade treasures from passionate artisans around the world. Each piece tells a unique story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-bold mb-4 text-[#d4a574]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <li>
                <a href="/about" className="text-gray-300 hover:text-[#c87941] transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-[#c87941] transition-colors text-sm">
                  Shop
                </a>
              </li>
              <li>
                <a href="/orders" className="text-gray-300 hover:text-[#c87941] transition-colors text-sm">
                  Track Order
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-[#c87941] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 
              className="text-lg font-bold mb-4 text-[#d4a574]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Connect With Us
            </h4>
            <div className="flex gap-3 mb-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c87941] flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
              >
                <InstagramOutlined className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c87941] flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c87941] flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
              >
                <TwitterOutlined className="text-lg" />
              </a>
            </div>
            <p className="text-sm text-gray-300" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Follow us for artisan stories and new collections
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p style={{ fontFamily: "'Quicksand', sans-serif" }}>
              © {new Date().getFullYear()} 
              <span className="text-[#c87941] font-semibold"> Manu Handcraft</span>. 
              All rights reserved.
            </p>
            <p className="flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Crafted with 
              <HeartOutlined className="text-[#c87941] animate-pulse" /> 
              by Manu Handcraft
            </p>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#c87941]/10 to-transparent rounded-tl-full"></div>
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#6b7f4a]/10 to-transparent rounded-br-full"></div>
    </footer>
  );
}

"use client";

import { HeartOutlined, ThunderboltOutlined, SafetyOutlined, SmileOutlined } from "@ant-design/icons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f3] via-[#fff5eb] to-[#faf8f3]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#c87941]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-[#6b7f4a]/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="w-[90vw] max-w-[1280px] mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-[#e8d5c4] mb-6">
              <div className="w-2 h-2 rounded-full bg-[#c87941] animate-pulse"></div>
              <span 
                className="text-[#7a5838] font-bold tracking-[3px] uppercase text-sm"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block text-[#2d2416]">Celebrating the</span>
              <span className="block bg-gradient-to-r from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] bg-clip-text text-transparent">
                Art of Handcraft
              </span>
            </h1>

            <p 
              className="text-xl text-[#5a4a3a] max-w-[700px] mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Where every piece tells a story of passion, tradition, and the timeless beauty of handmade craftsmanship.
            </p>

            {/* Handwritten accent */}
            <div 
              className="text-3xl text-[#c87941] opacity-80 -rotate-1"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Made with love, by hands that care
            </div>
          </div>

          {/* Image Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#c87941]/30 to-[#6b7f4a]/30 rounded-3xl blur-lg group-hover:blur-xl transition-all"></div>
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700"
                alt="Artisan at work"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white"
              />
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#6b7f4a]/30 to-[#c87941]/30 rounded-3xl blur-lg group-hover:blur-xl transition-all"></div>
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=700"
                alt="Handcrafted products"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 relative">
        <div className="w-[90vw] max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-6 text-[#2d2416]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c87941] to-[#6b7f4a] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border-2 border-[#e8d5c4] max-w-[900px] mx-auto">
            <p 
              className="text-xl text-[#5a4a3a] leading-relaxed text-center mb-6"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              At <span className="font-bold text-[#c87941]">Manu Handcraft</span>, we're more than just a marketplace. 
              We're a community that celebrates the beauty of handmade artistry. Each piece in our collection 
              is carefully curated from talented artisans around the world who pour their heart and soul into 
              their craft.
            </p>
            <p 
              className="text-xl text-[#5a4a3a] leading-relaxed text-center"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              We believe that handcrafted items carry a special energy—the warmth of human touch, the pride of 
              creation, and the joy of artistry. When you choose handmade, you're not just buying a product; 
              you're embracing a story, supporting a dream, and preserving traditional craftsmanship for future 
              generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/40">
        <div className="w-[90vw] max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-6 text-[#2d2416]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              What We Stand For
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c87941] to-[#6b7f4a] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#e8d5c4] hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <HeartOutlined className="text-white text-3xl" />
              </div>
              <h3 
                className="text-2xl font-bold mb-4 text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Authenticity
              </h3>
              <p 
                className="text-[#5a4a3a] leading-relaxed"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                100% genuine handmade products. No mass production, no shortcuts—just pure, authentic craftsmanship.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#e8d5c4] hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <SafetyOutlined className="text-white text-3xl" />
              </div>
              <h3 
                className="text-2xl font-bold mb-4 text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Sustainability
              </h3>
              <p 
                className="text-[#5a4a3a] leading-relaxed"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Eco-friendly materials and sustainable practices. We care for our planet as much as our craft.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#e8d5c4] hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <ThunderboltOutlined className="text-white text-3xl" />
              </div>
              <h3 
                className="text-2xl font-bold mb-4 text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Empowerment
              </h3>
              <p 
                className="text-[#5a4a3a] leading-relaxed"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Supporting artisans worldwide by providing fair wages and a global platform for their talents.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#e8d5c4] hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <SmileOutlined className="text-white text-3xl" />
              </div>
              <h3 
                className="text-2xl font-bold mb-4 text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Joy
              </h3>
              <p 
                className="text-[#5a4a3a] leading-relaxed"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Bringing happiness to your home with unique pieces that spark conversation and warm hearts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="w-[90vw] max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="text-6xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                10+
              </div>
              <p 
                className="text-lg text-[#5a4a3a] font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Unique Products
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-6xl font-bold bg-gradient-to-r from-[#6b7f4a] to-[#5a6d3d] bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                5+
              </div>
              <p 
                className="text-lg text-[#5a4a3a] font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Talented Artisans
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-6xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                5
              </div>
              <p 
                className="text-lg text-[#5a4a3a] font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c87941] to-[#6b7f4a] opacity-5"></div>
        <div className="w-[90vw] max-w-[800px] mx-auto text-center relative z-10">
          <h2 
            className="text-5xl font-bold mb-6 text-[#2d2416]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Start Your Journey
          </h2>
          <p 
            className="text-xl text-[#5a4a3a] mb-10 leading-relaxed"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Discover unique handcrafted treasures that will transform your space and touch your heart.
          </p>
          <a href="/products">
            <button 
              className="bg-gradient-to-r from-[#c87941] to-[#ba6f3e] text-white px-12 py-5 rounded-full text-lg font-bold shadow-[0_8px_24px_rgba(200,121,65,0.3)] hover:shadow-[0_12px_32px_rgba(200,121,65,0.4)] hover:-translate-y-1 transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
            >
              Explore Collection →
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}

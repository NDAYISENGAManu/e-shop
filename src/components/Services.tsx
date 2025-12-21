"use client";

import { Card } from "antd";
import { HeartOutlined, SafetyOutlined, TruckOutlined, CustomerServiceOutlined } from "@ant-design/icons";

const services = [
  {
    id: 1,
    icon: <HeartOutlined />,
    title: "Handmade With Love",
    text: "Every piece is crafted by skilled artisans who pour their passion and expertise into creating unique treasures.",
    color: "from-[#c87941] to-[#ba6f3e]",
  },
  {
    id: 2,
    icon: <SafetyOutlined />,
    title: "Quality Guaranteed",
    text: "We carefully curate each item, ensuring authentic craftsmanship and sustainable materials for lasting beauty.",
    color: "from-[#6b7f4a] to-[#5a6d3d]",
  },
  {
    id: 3,
    icon: <TruckOutlined />,
    title: "Fast & Safe Delivery",
    text: "Your handcrafted treasures are packaged with care and delivered securely to your doorstep.",
    color: "from-[#c87941] to-[#ba6f3e]",
  },
  {
    id: 4,
    icon: <CustomerServiceOutlined />,
    title: "Dedicated Support",
    text: "Our friendly team is here to help you find the perfect piece and ensure your complete satisfaction.",
    color: "from-[#6b7f4a] to-[#5a6d3d]",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#faf8f3] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#c87941]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="w-[90vw] max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-4 text-[#2d2416]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why Choose <span className="bg-gradient-to-r from-[#c87941] to-[#6b7f4a] bg-clip-text text-transparent">Handcraft</span>
          </h2>
          <p 
            className="text-lg text-[#5a4a3a] max-w-[600px] mx-auto"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Experience the difference that authentic craftsmanship makes
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#c87941] to-[#6b7f4a] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_20px_rgba(139,90,60,0.1)] hover:shadow-[0_12px_32px_rgba(139,90,60,0.2)] border-2 border-[#e8d5c4] hover:border-[#c87941]/30 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-4xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl font-bold mb-4 text-[#2d2416] group-hover:text-[#c87941] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-[#5a4a3a] leading-relaxed flex-grow"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {service.text}
                </p>

                {/* Decorative bottom accent */}
                <div className="mt-6 pt-6 border-t border-[#e8d5c4]">
                  <div className={`w-12 h-1 mx-auto rounded-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>

              {/* Decorative background blur */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl -z-10 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

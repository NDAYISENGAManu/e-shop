"use client";

import { Input, Button, Form } from "antd";
import { MailOutlined, GiftOutlined } from "@ant-design/icons";

export default function Contact() {
  const [form] = Form.useForm();

  const handleSubmit = (values: { email: string }) => {
    console.log("Email:", values.email);
    form.resetFields();
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Organic shapes */}
      <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,50 Q300,10 600,50 T1200,50 L1200,0 L0,0 Z" fill="white"/>
      </svg>
      <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,70 Q300,110 600,70 T1200,70 L1200,120 L0,120 Z" fill="white"/>
      </svg>

      <div className="w-[90vw] max-w-[900px] mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-8 shadow-xl border-2 border-white/30">
          <GiftOutlined className="text-white text-4xl" />
        </div>

        {/* Heading */}
        <h2 
          className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Join Our Artisan Community
        </h2>

        {/* Handwritten accent */}
        <div 
          className="text-3xl text-white/90 mb-6 -rotate-1"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          & get exclusive handcraft treasures
        </div>

        <p 
          className="text-xl text-white/90 mb-10 max-w-[600px] mx-auto leading-relaxed"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Subscribe to discover new artisans, get special offers, and receive <strong>20% off</strong> your first handcrafted piece
        </p>

        {/* Newsletter Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/50">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              className="flex-1 !mb-0"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                size="large"
                prefix={<MailOutlined className="text-[#7a5838]" />}
                className="!rounded-full !px-6 !py-3 !text-base border-2 !border-[#e8d5c4] focus:!border-[#c87941] hover:!border-[#c87941]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] hover:!from-[#ba6f3e] hover:!to-[#c87941] !border-none !rounded-full !px-10 !py-3 !h-auto !text-base !font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:!-translate-y-0.5 !transition-all"
                style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
              >
                Subscribe
              </Button>
            </Form.Item>
          </Form>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-[#e8d5c4]">
            <div className="flex items-center gap-2 text-[#7a5838]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center text-white font-bold text-xs">
                ✓
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                No spam, ever
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#7a5838]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] flex items-center justify-center text-white font-bold text-xs">
                ✓
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Unsubscribe anytime
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#7a5838]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center text-white font-bold text-xs">
                ✓
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Exclusive artisan stories
              </span>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-8 flex items-center justify-center gap-3 text-white/90">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-lg"></div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-lg"></div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-lg"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c87941] to-[#ba6f3e] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
              +5K
            </div>
          </div>
          <p 
            className="font-semibold"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Join 5,000+ happy subscribers
          </p>
        </div>
      </div>
    </section>
  );
}

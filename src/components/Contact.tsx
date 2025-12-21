"use client";

import { Input, Button, Form } from "antd";
import { MailOutlined, GiftOutlined } from "@ant-design/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useNotification } from "./Notification";

export default function Contact() {
  const [form] = Form.useForm();
  const { t } = useLanguage();
  const { showSuccess } = useNotification();

  const handleSubmit = (values: { email: string }) => {
    console.log("Email:", values.email);
    showSuccess(t.newsletter.success);
    form.resetFields();
  };

  return (
    <section className="py-24 bg-linear-to-br from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] relative overflow-hidden">
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

        {/* Handwritten accent */}
        <div 
          className="text-3xl text-white/90 mb-6 -rotate-1"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
         {t.newsletter.accent}
        </div>

        <p 
          className="text-xl text-white/90 mb-10 max-w-[600px] mx-auto leading-relaxed"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {t.newsletter.title}
        </p>

        {/* Newsletter Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/50">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: t.newsletter.invalidEmail,
                },
              ]}
              className="flex mb-0!"
            >
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                size="large"
                prefix={<MailOutlined className="text-[#7a5838]" />}
                className="rounded-full! px-6! py-3! text-base! border-2 border-[#e8d5c4]! focus:border-[#c87941]! hover:border-[#c87941]!"
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
                {t.newsletter.button}
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
                {t.newsletter.noSpam}
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
                {t.newsletter.unsubscribe}
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
                {t.newsletter.stories}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

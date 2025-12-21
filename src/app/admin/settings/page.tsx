"use client";

import { Form, message } from "antd";
import { SettingOutlined, ShoppingOutlined, DollarOutlined, InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettings() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  // Sync settings with forms once they are rendered (loading is false)
  useEffect(() => {
    if (settings && !loading) {
      form1.setFieldsValue({
        storeName: settings.storeName,
        email: settings.email,
        phone: settings.phone,
      });
      
      form2.setFieldsValue({
        shippingFee: settings.shippingFee,
        freeShippingThreshold: settings.freeShippingThreshold,
      });
      
      form3.setFieldsValue({
        taxRate: settings.taxRate,
      });
    }
  }, [settings, loading, form1, form2, form3]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      message.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: any) => {
    setSaving(true);
    try {
      await axios.post('/api/settings', values);
      message.success('Settings updated successfully');
      await fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
      message.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-6">
        <div className="w-16 h-16 border-4 border-[#c87941] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-[#7a5838] font-medium animate-pulse" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Unrolling the workshop parchment...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-[fadeIn_0.5s_ease-out]">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white/70 backdrop-blur-md rounded-[3rem] p-12 shadow-[0_25px_60px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]/50">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <SettingOutlined style={{ fontSize: '180px' }} />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-36 h-36 rounded-[2.5rem] bg-gradient-to-br from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] flex items-center justify-center shadow-[0_15px_35px_rgba(200,121,65,0.3)] rotate-3">
            <SettingOutlined className="text-white text-6xl" />
          </div>
          <div className="text-center md:text-left">
            <h1 
              className="text-6xl font-bold text-[#2d2416] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Marketplace Control
            </h1>
            <p 
              className="text-xl text-[#7a5838] font-medium"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Configuring the soul and logic of your artisan world
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Store Information Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-12 shadow-[0_15px_45px_rgba(139,90,60,0.08)] border-2 border-[#e8d5c4] hover:shadow-[0_20px_60px_rgba(139,90,60,0.12)] transition-all duration-500 group">
          <div className="flex items-center gap-6 mb-12 border-b border-[#e8d5c4]/50 pb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#fef9f3] flex items-center justify-center text-[#c87941] group-hover:bg-[#c87941] group-hover:text-white transition-all duration-500 shadow-sm">
              <InfoCircleOutlined className="text-3xl" />
            </div>
            <div>
              <h2 
                className="text-4xl font-bold text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Store Identity
              </h2>
              <p className="text-[#8b6f47] font-medium mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Managing your presence in the artisan community</p>
            </div>
          </div>
          
          <Form 
            form={form1} 
            layout="vertical" 
            onFinish={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          >
            <Form.Item 
              label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Store Name</span>}
              name="storeName"
              className="md:col-span-2"
              rules={[{ required: true, message: 'Please enter store name' }]}
            >
              <Input 
                placeholder="e.g. Handcrafted Treasures & Co."
                className="!text-xl !py-4"
              />
            </Form.Item>
            
            <Form.Item 
              label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Contact Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                type="email" 
                placeholder="hello@yourstore.com"
                className="!py-4"
              />
            </Form.Item>
            
            <Form.Item 
              label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Support Phone</span>}
              name="phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="!py-4"
              />
            </Form.Item>
            
            <div className="md:col-span-2 mt-6">
              <Button 
                variant="primary"
                type="submit"
                loading={saving}
                className="!px-16 !py-6 !h-auto !text-xl shadow-[0_12px_24px_rgba(200,121,65,0.25)] rounded-full group"
              >
                <span className="flex items-center gap-3">
                  <SaveOutlined className="group-hover:rotate-12 transition-transform" />
                  Update Identity
                </span>
              </Button>
            </div>
          </Form>
        </div>

        {/* Financial & Logistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Settings Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-12 shadow-[0_15px_45px_rgba(139,90,60,0.08)] border-2 border-[#e8d5c4] hover:border-[#6b7f4a]/30 transition-all duration-500 group">
            <div className="flex items-center gap-6 mb-12 border-b border-[#e8d5c4]/50 pb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#f8faf2] flex items-center justify-center text-[#6b7f4a] group-hover:bg-[#6b7f4a] group-hover:text-white transition-all duration-500 shadow-sm">
                <ShoppingOutlined className="text-3xl" />
              </div>
              <h2 
                className="text-4xl font-bold text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Logistics
              </h2>
            </div>
            
            <Form 
              form={form2} 
              layout="vertical" 
              onFinish={handleSave}
              className="space-y-8"
            >
              <Form.Item 
                label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Standard Shipping Fee (Rwf)</span>}
                name="shippingFee"
                rules={[{ required: true, message: 'Please enter shipping fee' }]}
              >
                <Input 
                  type="number"
                  step="0.01"
                  min="0"
                  className="!text-xl !py-4"
                />
              </Form.Item>
              
              <Form.Item 
                label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Free Shipping Threshold (Rwf)</span>}
                name="freeShippingThreshold"
                rules={[{ required: true, message: 'Please enter threshold' }]}
              >
                <Input 
                  type="number"
                  step="0.01"
                  min="0"
                  className="!text-xl !py-4"
                />
              </Form.Item>
              
              <Button 
                variant="primary"
                type="submit"
                loading={saving}
                className="!bg-gradient-to-r !from-[#6b7f4a] !to-[#5a6d3d] !px-12 !py-6 !h-auto !text-xl shadow-[0_12px_24px_rgba(107,127,74,0.25)] rounded-full"
              >
                Save Logistics
              </Button>
            </Form>
          </div>

          {/* Tax Settings Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-12 shadow-[0_15px_45px_rgba(139,90,60,0.08)] border-2 border-[#e8d5c4] hover:border-[#c87941]/30 transition-all duration-500 group">
            <div className="flex items-center gap-6 mb-12 border-b border-[#e8d5c4]/50 pb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#fef9f3] flex items-center justify-center text-[#c87941] group-hover:bg-[#c87941] group-hover:text-white transition-all duration-500 shadow-sm">
                <DollarOutlined className="text-3xl" />
              </div>
              <h2 
                className="text-4xl font-bold text-[#2d2416]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Taxation
              </h2>
            </div>
            
            <Form 
              form={form3} 
              layout="vertical" 
              onFinish={handleSave}
              className="space-y-8"
            >
              <Form.Item 
                label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Standard Tax Rate (%)</span>}
                name="taxRate"
                rules={[{ required: true, message: 'Please enter tax rate' }]}
              >
                <Input 
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  className="!text-xl !py-4"
                />
              </Form.Item>
              
              <div className="p-8 bg-[#fef9f3] rounded-[2rem] border border-[#e8d5c4]/50 shadow-inner">
                <p className="text-[#7a5838] leading-relaxed italic" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  <strong>Workshop Note:</strong> This tax rate will be applied to all customers during checkout. Make sure it complies with your regional artisan trade regulations.
                </p>
              </div>
              
              <Button 
                variant="primary"
                type="submit"
                loading={saving}
                className="!px-12 !py-6 !h-auto !text-xl shadow-[0_12px_24px_rgba(200,121,65,0.25)] rounded-full"
              >
                Save Tax Settings
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

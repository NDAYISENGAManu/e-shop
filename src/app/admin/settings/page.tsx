"use client";

import { Form, Input, Button, InputNumber, message, Spin } from "antd";
import { SettingOutlined, ShoppingOutlined, DollarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSettings() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      const settings = response.data;
      
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
      // Refresh settings to ensure consistency
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
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-lg">
            <SettingOutlined className="text-white text-3xl" />
          </div>
          <div>
            <h1 
              className="text-4xl font-bold text-[#2d2416] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Settings
            </h1>
            <p 
              className="text-[#7a5838]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Manage your handcraft marketplace configuration
            </p>
          </div>
        </div>
      </div>

      {/* Store Information Card */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center">
            <ShoppingOutlined className="text-white text-xl" />
          </div>
          <h2 
            className="text-2xl font-bold text-[#2d2416]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Store Information
          </h2>
        </div>
        <Form 
          form={form1} 
          layout="vertical" 
          className="space-y-4"
          onFinish={handleSave}
        >
          <Form.Item 
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Store Name</span>}
            name="storeName"
            rules={[{ required: true, message: 'Please enter store name' }]}
          >
            <Input 
              size="large" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>
          <Form.Item 
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Contact Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              type="email" 
              size="large" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>
          <Form.Item 
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Phone</span>}
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input 
              type="tel" 
              size="large" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            loading={saving}
            className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-8 !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-0.5 !transition-all"
            style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
          >
            Save Changes
          </Button>
        </Form>
      </div>

      {/* Grid Layout for Shipping and Tax Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Settings Card */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6b7f4a] to-[#5a6d3d] flex items-center justify-center">
              <ShoppingOutlined className="text-white text-xl" />
            </div>
            <h2 
              className="text-2xl font-bold text-[#2d2416]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Shipping Settings
            </h2>
          </div>
          <Form 
            form={form2} 
            layout="vertical" 
            className="space-y-4"
            onFinish={handleSave}
          >
            <Form.Item 
              label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Standard Shipping Fee ($)</span>}
              name="shippingFee"
              rules={[{ required: true, message: 'Please enter shipping fee' }]}
            >
              <InputNumber 
                size="large"
                step={0.01}
                min={0}
                className="w-full !rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              />
            </Form.Item>
            <Form.Item 
              label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Free Shipping Threshold ($)</span>}
              name="freeShippingThreshold"
              rules={[{ required: true, message: 'Please enter threshold' }]}
            >
              <InputNumber 
                size="large"
                step={0.01}
                min={0}
                className="w-full !rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              />
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              loading={saving}
              className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-8 !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-0.5 !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
            >
              Save Changes
            </Button>
          </Form>
        </div>

        {/* Tax Settings Card */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c87941] to-[#ba6f3e] flex items-center justify-center">
              <DollarOutlined className="text-white text-xl" />
            </div>
            <h2 
              className="text-2xl font-bold text-[#2d2416]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tax Settings
            </h2>
          </div>
          <Form 
            form={form3} 
            layout="vertical" 
            className="space-y-4"
            onFinish={handleSave}
          >
            <Form.Item 
              label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Tax Rate (%)</span>}
              name="taxRate"
              rules={[{ required: true, message: 'Please enter tax rate' }]}
            >
              <InputNumber 
                size="large"
                step={0.01}
                min={0}
                max={100}
                className="w-full !rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              />
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              loading={saving}
              className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-8 !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-0.5 !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

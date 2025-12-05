"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Button, Modal, Form, Input, Select, InputNumber, Checkbox, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useNotification } from "@/components/Notification";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/products");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/admin/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSuccess("Product deleted successfully");
    },
    onError: () => {
      showError("Failed to delete product");
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (editingProduct) {
        return axios.put(`/api/admin/products/${editingProduct.id}`, data);
      }
      return axios.post("/api/admin/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setShowModal(false);
      setEditingProduct(null);
      form.resetFields();
      showSuccess(
        editingProduct
          ? "Product updated successfully"
          : "Product created successfully"
      );
    },
    onError: () => {
      showError(
        editingProduct ? "Failed to update product" : "Failed to create product"
      );
    },
  });

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete);
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleSubmit = async (values: any) => {
    const data: any = {
      name: values.name,
      price: Number(values.price) * 100,
      description: values.description,
      category: values.category,
      company: values.company,
      stock: Number(values.stock),
      featured: values.featured || false,
      shipping: values.shipping || false,
    };

    if (values.images?.fileList && values.images.fileList.length > 0) {
      const imageFormData = new FormData();
      values.images.fileList.forEach((file: any) => {
        if (file.originFileObj) {
          imageFormData.append("images", file.originFileObj);
        }
      });

      try {
        const uploadResponse = await axios.post(
          "/api/admin/upload",
          imageFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        data.images = uploadResponse.data.images;
      } catch (error) {
        showError("Failed to upload images");
        return;
      }
    }

    saveMutation.mutate(data);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price / 100,
      description: product.description,
      category: product.category,
      company: product.company,
      stock: product.stock,
      featured: product.featured,
      shipping: product.shipping,
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingProduct(null);
    form.resetFields();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-[#c87941] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Loading Products...
          </p>
          <p className="text-sm text-[#8b6f47] mt-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Fetching your handcraft collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-lg">
              <PlusOutlined className="text-white text-3xl" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold text-[#2d2416] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Products Management
              </h1>
              <p 
                className="text-[#7a5838]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Manage your handcraft marketplace inventory
              </p>
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowModal(true)}
            size="large"
            className="!bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !px-8 !py-6 !h-auto !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-1 !transition-all"
            style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <Card
            key={product.id}
            hoverable
            className="overflow-hidden shadow-[0_4px_20px_rgba(139,90,60,0.12)] hover:shadow-[0_12px_32px_rgba(139,90,60,0.25)] transition-all duration-500 rounded-2xl border-2 border-[#e8d5c4] hover:border-[#c87941]/40 hover:-translate-y-1 bg-white"
            cover={
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="h-56 w-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            }
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(product)}
                className="!text-[#6b7f4a] hover:!text-[#5a6d3d] !font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(product.id)}
                className="hover:!text-red-700 !font-semibold"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Delete
              </Button>,
            ]}
          >
            <Card.Meta
              title={
                <span 
                  className="text-xl font-bold text-[#2d2416]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.name}
                </span>
              }
              description={
                <div className="space-y-3 mt-2">
                  <div 
                    className="text-[#7a5838] font-medium"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {product.category} • {product.company}
                  </div>
                  <div 
                    className="text-3xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ${(product.price / 100).toFixed(2)}
                  </div>
                  <div 
                    className="text-sm text-[#8b6f47] font-semibold"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Stock: {product.stock}
                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title={null}
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="handcraft-modal"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#c87941] to-[#6b7f4a] -mx-6 -mt-6 mb-6 px-8 py-6 rounded-t-md">
          <h2 
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <p 
            className="text-white/80"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {editingProduct ? "Update product details" : "Create a new handcraft item for your marketplace"}
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {/* Product Name */}
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Product Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input 
              size="large" 
              placeholder="Enter product name" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Price ($)</span>}
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              size="large"
              className="w-full !rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              min={0}
              step={0.01}
              placeholder="0.00"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Description</span>}
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe your handcraft product..."
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          {/* Category and Company */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Category</span>}
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select 
                size="large" 
                placeholder="Select category"
                className="handcraft-select"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <Select.Option value="office">Office</Select.Option>
                <Select.Option value="living room">Living Room</Select.Option>
                <Select.Option value="kitchen">Kitchen</Select.Option>
                <Select.Option value="bedroom">Bedroom</Select.Option>
                <Select.Option value="dining">Dining</Select.Option>
                <Select.Option value="kids">Kids</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Company/Artisan</span>}
              name="company"
              rules={[{ required: true, message: "Please enter company" }]}
            >
              <Input 
                size="large" 
                placeholder="Artisan or company name" 
                className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              />
            </Form.Item>
          </div>

          {/* Stock */}
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Stock Quantity</span>}
            name="stock"
            rules={[{ required: true, message: "Please enter stock" }]}
          >
            <InputNumber
              size="large"
              className="w-full !rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              min={0}
              placeholder="Available stock"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          {/* Product Images */}
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Product Images</span>}
            name="images"
            extra={<span className="text-[#8b6f47]" style={{ fontFamily: "'Quicksand', sans-serif" }}>Upload one or more images for this product</span>}
          >
            <Upload
              listType="picture-card"
              multiple
              accept="image/*"
              beforeUpload={() => false}
              className="handcraft-upload"
            >
              <div className="text-[#c87941]">
                <UploadOutlined className="text-2xl mb-2" />
                <div style={{ fontFamily: "'Quicksand', sans-serif" }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          {/* Checkboxes */}
          <div className="bg-[#faf8f3] rounded-xl p-4 space-y-2 border-2 border-[#e8d5c4]">
            <Form.Item name="featured" valuePropName="checked" className="mb-2">
              <Checkbox className="text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <span className="font-semibold">Featured Product</span>
                <span className="text-sm text-[#8b6f47] block">Show this product on the homepage</span>
              </Checkbox>
            </Form.Item>

            <Form.Item name="shipping" valuePropName="checked" className="mb-0">
              <Checkbox className="text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <span className="font-semibold">Free Shipping</span>
                <span className="text-sm text-[#8b6f47] block">Offer free shipping for this item</span>
              </Checkbox>
            </Form.Item>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t-2 border-[#e8d5c4]">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={saveMutation.isPending}
              className="flex-1 !bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-0.5 !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
            >
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
            <Button
              size="large"
              onClick={handleCancel}
              className="flex-1 !border-2 !border-[#c87941] !text-[#c87941] !rounded-full !font-bold hover:!bg-[#c87941] hover:!text-white !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setProductToDelete(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

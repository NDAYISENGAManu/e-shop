"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Upload } from "antd";
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  UploadOutlined, 
} from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useNotification } from "@/components/Notification";
import ConfirmModal from "@/components/ConfirmModal";
import { NativeSelect } from "@/components/ui/NativeSelect";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Modal } from "@/components/ui/Modal";
import { Card, CardMeta } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatPrice } from "@/utils/helpers";

// Helper for upload value
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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
      colors: values.colors ? values.colors.map((c: string) => ({ color: c })) : [],
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
      colors: product.colors?.map((c: any) => c.color) || [],
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 border-4 border-[#c87941] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="text-xl font-semibold text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Unveiling your masterpieces...
          </p>
          <p className="text-sm text-[#8b6f47] mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Curating the collection for your appraisal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Page Header */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(139,90,60,0.1)] border-2 border-[#e8d5c4]/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#c87941] via-[#ba6f3e] to-[#6b7f4a] flex items-center justify-center shadow-xl rotate-3">
              <PlusOutlined className="text-white text-3xl" />
            </div>
            <div>
              <h1 
                className="text-5xl font-bold text-[#2d2416] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Collection Manager
              </h1>
              <p 
                className="text-lg text-[#7a5838]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Curating your global handcraft marketplace
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            size="lg"
            className="rounded-full shadow-lg !px-8 !py-6 !h-auto"
          >
            <span className="flex items-center gap-2">
              <PlusOutlined /> Add Masterpiece
            </span>
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product: any) => (
          <Card
            key={product.id}
            hoverable
            cover={
              <div className="relative overflow-hidden group">
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white font-serif text-lg italic">{product.company}</div>
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#c87941] to-[#ba6f3e] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    FEATURED
                  </div>
                )}
              </div>
            }
            actions={[
              <Button
                key="edit"
                variant="ghost"
                onClick={() => handleEdit(product)}
                className="hover:!bg-transparent group"
              >
                <span className="flex items-center gap-2 text-[#6b7f4a] group-hover:text-[#5a6d3d] font-bold">
                  <EditOutlined /> Edit
                </span>
              </Button>,
              <Button
                key="delete"
                variant="ghost"
                onClick={() => handleDeleteClick(product.id)}
                className="hover:!bg-transparent group"
              >
                <span className="flex items-center gap-2 text-red-500 group-hover:text-red-600 font-bold">
                  <DeleteOutlined /> Delete
                </span>
              </Button>,
            ]}
          >
            <CardMeta
              title={product.name}
              description={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#7a5838] font-medium text-sm uppercase tracking-wider">
                    <span className="bg-[#fef9f3] px-3 py-1 rounded-full border border-[#e8d5c4]">{product.category}</span>
                    <span>•</span>
                    <span>{product.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.colors?.map((c: any) => (
                      <div 
                        key={c.id} 
                        className="w-5 h-5 rounded-full border border-gray-200 shadow-inner"
                        style={{ backgroundColor: c.color }}
                        title={c.color}
                      />
                    ))}
                  </div>

                  <div className="flex items-end justify-between items-center border-t border-[#e8d5c4]/30 pt-4 mt-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#c87941] to-[#ba6f3e] bg-clip-text text-transparent italic">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-xs font-bold text-[#8b6f47] bg-[#f8faf2] px-3 py-1 rounded-full border border-[#d6e0c0]">
                      STOCK: {product.stock}
                    </div>
                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        width={850}
        title={
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#c87941] to-[#ba6f3e] rounded-2xl shadow-lg">
              <PlusOutlined className="text-white text-xl" />
            </div>
            <div>
              <div className="text-3xl">{editingProduct ? "Edit Masterpiece" : "New Collection Item"}</div>
              <div className="text-sm font-normal text-[#7a5838] font-sans">Curating detail for the artisans' creation</div>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4"
        >
          {/* Product Name */}
          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Product Name</span>}
            name="name"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="e.g. Hand-Woven Silk Scarf" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Price (Rwf)</span>}
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" step="0.01" placeholder="0.00" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Stock Quantity</span>}
            name="stock"
            rules={[{ required: true, message: "Please enter stock" }]}
          >
            <Input type="number" placeholder="0" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Category</span>}
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <NativeSelect 
              placeholder="Select category"
              options={[
                { value: 'office', label: 'Office' },
                { value: 'living room', label: 'Living Room' },
                { value: 'kitchen', label: 'Kitchen' },
                { value: 'bedroom', label: 'Bedroom' },
                { value: 'dining', label: 'Dining' },
                { value: 'kids', label: 'Kids' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Artisan / Company</span>}
            name="company"
            rules={[{ required: true, message: "Please enter company" }]}
          >
            <Input placeholder="Master artisan or studio" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Description</span>}
            name="description"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Tell the story of this unique piece..." />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Color Palette</span>}
            name="colors"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#fef9f3] p-6 rounded-[2rem] border-2 border-[#e8d5c4]/50">
              {[
                { label: 'Sienna', value: '#8B4513' },
                { label: 'Sand', value: '#F5F5DC' },
                { label: 'Ink', value: '#000000' },
                { label: 'Paper', value: '#FFFFFF' },
                { label: 'Moss', value: '#808000' },
                { label: 'Cream', value: '#FFFDD0' },
                { label: 'Coral', value: '#E2725B' },
                { label: 'Sun', value: '#FFD700' },
              ].map(color => (
                <Checkbox 
                  key={color.value} 
                  value={color.value} 
                  label={color.label}
                  className="!items-center"
                  checked={form.getFieldValue('colors')?.includes(color.value)}
                  onChange={(e) => {
                    const currentColors = form.getFieldValue('colors') || [];
                    const newColors = e.target.checked 
                      ? [...currentColors, color.value]
                      : currentColors.filter((c: string) => c !== color.value);
                    form.setFieldsValue({ colors: newColors });
                  }}
                >
                  <div className="w-5 h-5 rounded-full border border-gray-200 ml-auto" style={{ backgroundColor: color.value }} />
                </Checkbox>
              ))}
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-[#5c4028] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Gallery</span>}
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            className="md:col-span-2"
          >
            <Upload
              listType="picture-card"
              multiple
              accept="image/*"
              beforeUpload={() => false}
              className="handcraft-upload"
            >
              <div className="flex flex-col items-center gap-2 text-[#c87941]">
                <UploadOutlined className="text-3xl" />
                <span className="text-xs font-bold uppercase">Add Photos</span>
              </div>
            </Upload>
          </Form.Item>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#faf8f3] rounded-[2rem] p-8 border-2 border-[#e8d5c4]">
            <Form.Item name="featured" valuePropName="checked" className="mb-0">
              <Checkbox label="Featured Acquisition">
                <span className="text-sm text-[#8b6f47] block mt-1">Spotlight this item on your homepage gallery</span>
              </Checkbox>
            </Form.Item>

            <Form.Item name="shipping" valuePropName="checked" className="mb-0">
              <Checkbox label="Artisan Delivery">
                <span className="text-sm text-[#8b6f47] block mt-1">Provide complimentary worldwide shipping</span>
              </Checkbox>
            </Form.Item>
          </div>

          <div className="md:col-span-2 flex gap-4 mt-8 pt-8 border-t-2 border-[#e8d5c4]/30">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              loading={saveMutation.isPending}
              className="flex-1 !py-6 !h-auto !text-xl shadow-[0_10px_20px_rgba(200,121,65,0.2)]"
            >
              <span className="flex items-center gap-2 justify-center">
                <PlusOutlined /> {editingProduct ? "Finalize Updates" : "Curate Masterpiece"}
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              size="lg"
              className="flex-1 !py-6 !h-auto !text-xl"
            >
              Return to Gallery
            </Button>
          </div>
        </Form>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        title="Remove Masterpiece"
        message="Are you certain you wish to withdraw this item from the collection? This transition is permanent."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Modal, Form, Input, Select, Tag } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useNotification } from "@/components/Notification";

export default function AdminUsers() {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();
  
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/users");
      return response.data;
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: any) => axios.post("/api/admin/users", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setShowModal(false);
      form.resetFields();
      showSuccess("User created successfully");
    },
    onError: (error: any) => {
      showError(error.response?.data?.error || "Failed to create user");
    },
  });

  const handleSubmit = (values: any) => {
    createUserMutation.mutate(values);
  };

  const columns = [
    {
      title: <span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>ID</span>,
      dataIndex: "id",
      key: "id",
      render: (id: number) => <span className="text-[#2d2416] font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>#{id}</span>,
      width: 80,
    },
    {
      title: <span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Name</span>,
      key: "name",
      render: (record: any) => (
        <span className="text-[#2d2416] font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: <span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-[#2d2416]" style={{ fontFamily: "'Quicksand', sans-serif" }}>{email}</span>,
    },
    {
      title: <span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Role</span>,
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={role === "admin" ? "#c87941" : "#6b7f4a"}
          className="uppercase font-bold px-3 py-1 rounded-full"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: <span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Joined</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span className="text-[#2d2416]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-[#c87941] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Loading Users...
          </p>
          <p className="text-sm text-[#8b6f47] mt-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Fetching user data
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
              <UserOutlined className="text-white text-3xl" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold text-[#2d2416] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Users Management
              </h1>
              <p 
                className="text-[#7a5838]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Manage your handcraft marketplace users
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
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4] overflow-hidden">
        <Table
          dataSource={users}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => <span className="text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>Total {total} users</span>,
          }}
          className="handcraft-table"
        />
      </div>

      {/* Add User Modal */}
      <Modal
        title={null}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
        className="handcraft-modal"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#c87941] to-[#6b7f4a] -mx-6 -mt-6 mb-6 px-8 py-6 rounded-t-md">
          <h2 
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Add New User
          </h2>
          <p 
            className="text-white/80"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Create a new user account for your marketplace
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>First Name</span>}
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input 
              size="large" 
              placeholder="Enter first name" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Last Name</span>}
            name="lastName"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input 
              size="large" 
              placeholder="Enter last name" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input 
              size="large" 
              placeholder="user@example.com" 
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Min 6 characters"
              className="!rounded-xl !border-2 !border-[#e8d5c4] focus:!border-[#c87941]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Role</span>}
            name="role"
            initialValue="user"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select 
              size="large"
              className="handcraft-select"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <Select.Option value="user">Customer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex gap-4 mt-8 pt-6 border-t-2 border-[#e8d5c4]">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={createUserMutation.isPending}
              className="flex-1 !bg-gradient-to-r !from-[#c87941] !to-[#ba6f3e] !border-none !rounded-full !font-bold !shadow-lg hover:!shadow-xl hover:!-translate-y-0.5 !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px' }}
            >
              Create User
            </Button>
            <Button
              size="large"
              onClick={() => {
                setShowModal(false);
                form.resetFields();
              }}
              className="flex-1 !border-2 !border-[#c87941] !text-[#c87941] !rounded-full !font-bold hover:!bg-[#c87941] hover:!text-white !transition-all"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

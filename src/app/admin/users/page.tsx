"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Modal, Form, Input, Select, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => `#${id}`,
      width: 80,
    },
    {
      title: "Name",
      key: "name",
      render: (record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={role === "admin" ? "blue" : "default"}
          className="uppercase font-semibold"
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowModal(true)}
          size="large"
          className="shadow-lg hover:shadow-xl transition-all"
        >
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Table
          dataSource={users}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          className="ant-table-hover"
        />
      </div>

      <Modal
        title={<span className="text-xl font-semibold">Add New User</span>}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input size="large" placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input size="large" placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input size="large" placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Min 6 characters"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            initialValue="user"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select size="large">
              <Select.Option value="user">Customer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex gap-3 mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={createUserMutation.isPending}
              className="flex-1"
            >
              Create User
            </Button>
            <Button
              size="large"
              onClick={() => {
                setShowModal(false);
                form.resetFields();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

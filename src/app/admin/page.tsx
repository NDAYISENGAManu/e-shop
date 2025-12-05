"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, Table, Tag, Statistic } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/stats");
      return response.data;
    },
  });

  const { data: recentOrders } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/orders?limit=5");
      return response.data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#6b7f4a";
      case "processing":
        return "#c87941";
      case "pending":
        return "#d4a574";
      default:
        return "#8b6f47";
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <span className="font-bold text-[#7a5838]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          #{id}
        </span>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      render: (record: any) => (
        <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {record.user?.email || "N/A"}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <span className="font-bold text-[#c87941]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          ${((total || 0) / 100).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag 
          color={getStatusColor(status)} 
          className="uppercase font-semibold px-3 py-1 rounded-full"
          style={{ fontFamily: "'Quicksand', sans-serif", border: 'none' }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: <ShoppingOutlined />,
      gradient: "from-[#c87941] to-[#ba6f3e]",
      lightBg: "bg-[#c87941]/10",
      border: "border-[#c87941]/20",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <UserOutlined />,
      gradient: "from-[#6b7f4a] to-[#5a6d3d]",
      lightBg: "bg-[#6b7f4a]/10",
      border: "border-[#6b7f4a]/20",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCartOutlined />,
      gradient: "from-[#c87941] to-[#ba6f3e]",
      lightBg: "bg-[#c87941]/10",
      border: "border-[#c87941]/20",
    },
    {
      title: "Total Revenue",
      value: `$${((stats?.totalRevenue || 0) / 100).toFixed(2)}`,
      icon: <DollarOutlined />,
      gradient: "from-[#6b7f4a] to-[#5a6d3d]",
      lightBg: "bg-[#6b7f4a]/10",
      border: "border-[#6b7f4a]/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4]">
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-lg">
            <RiseOutlined className="text-white text-3xl" />
          </div>
          <div>
            <h1 
              className="text-4xl font-bold text-[#2d2416] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Dashboard Overview
            </h1>
            <p 
              className="text-[#7a5838]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Monitor your handcraft marketplace performance
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`group relative ${stat.lightBg} rounded-2xl p-6 border-2 ${stat.border} shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
              </div>
              
              <div>
                <p 
                  className="text-[#7a5838] text-sm font-semibold uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {stat.title}
                </p>
                <p 
                  className="text-4xl font-bold text-[#2d2416]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(139,90,60,0.12)] border-2 border-[#e8d5c4] overflow-hidden">
        <div className="p-6 border-b-2 border-[#e8d5c4] bg-gradient-to-r from-[#faf8f3] to-[#fff5eb]">
          <h2 
            className="text-3xl font-bold text-[#2d2416]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recent Orders
          </h2>
          <p 
            className="text-[#7a5838] mt-1"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Latest transactions from your customers
          </p>
        </div>
        
        <div className="p-6">
          <Table
            dataSource={recentOrders}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="handcraft-table"
            rowClassName="hover:bg-[#faf8f3] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

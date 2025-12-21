"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/ui/Table";
import {
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { formatPrice } from "@/utils/helpers";

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
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
          {formatPrice(total || 0)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span 
          className={`uppercase text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusColor(status)}`}
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {status}
        </span>
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
      value: formatPrice(stats?.totalRevenue || 0),
      icon: <DollarOutlined />,
      gradient: "from-[#6b7f4a] to-[#5a6d3d]",
      lightBg: "bg-[#6b7f4a]/10",
      border: "border-[#6b7f4a]/20",
    },
  ];

  return (
    <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
      {/* Page Header */}
      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(139,90,60,0.1)] border-2 border-[#e8d5c4]/50">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-2xl rotate-3">
            <RiseOutlined className="text-white text-5xl" />
          </div>
          <div className="text-center md:text-left">
            <h1 
              className="text-6xl font-bold text-[#2d2416] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Artisan Dashboard
            </h1>
            <p 
              className="text-xl text-[#7a5838] font-medium"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Surveillance of your marketplace's performance and prosperity
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`group relative ${stat.lightBg} rounded-[2rem] p-8 border-2 ${stat.border} shadow-[0_10px_30px_rgba(139,90,60,0.05)] hover:shadow-[0_20px_50px_rgba(139,90,60,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden`}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-4xl shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="space-y-2">
                <p 
                  className="text-[#7a5838] text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {stat.title}
                </p>
                <p 
                  className="text-5xl font-bold text-[#2d2416]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] shadow-[0_15px_45px_rgba(139,90,60,0.1)] border-2 border-[#e8d5c4] overflow-hidden">
        <div className="p-10 border-b-2 border-[#e8d5c4] bg-gradient-to-r from-[#faf8f3] to-[#fff5eb]">
          <h2 
            className="text-5xl font-bold text-[#2d2416]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recent Acquisitions
          </h2>
          <p 
            className="text-[#7a5838] mt-2 font-medium"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            The latest exchange of artisan treasures from around the globe
          </p>
        </div>
        
        <div className="p-10">
          <Table
            dataSource={recentOrders}
            columns={columns}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
}

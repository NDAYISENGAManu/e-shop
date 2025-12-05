"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LogoutOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";

const { Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf8f3] to-[#fff5eb]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#c87941] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: <Link href="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/products">Products</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">Settings</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        width={280}
        className="!bg-gradient-to-b !from-[#2d2416] !to-[#3a2d1d] shadow-[0_0_40px_rgba(0,0,0,0.3)] !overflow-visible relative"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c87941] via-[#6b7f4a] to-[#c87941]"></div>

        {/* Logo & Branding */}
        <Link href="/admin" className="block p-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c87941] to-[#6b7f4a] flex items-center justify-center shadow-lg">
              <HeartOutlined className="text-white text-xl" />
            </div>
            <div>
              <h3 
                className="text-2xl font-bold bg-gradient-to-r from-[#c87941] to-[#d4a574] bg-clip-text text-transparent"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                CPANEL
              </h3>
              {/* <p className="text-xs text-[#d4a574] uppercase tracking-wider" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Back Office
              </p> */}
            </div>
          </div>
          <div className="mt-4 px-12 py-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-[#d4a574] mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Welcome back,</p>
            <p className="text-sm text-white font-semibold truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {session?.user?.name}
            </p>
          </div>
        </Link>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[pathname || "/admin"]}
          items={menuItems}
          className="!bg-transparent !border-r-0 !mt-4"
          style={{
            color: '#d4a574',
          }}
          theme="dark"
        />

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-[#c87941]/20 to-[#6b7f4a]/20 border-2 border-[#c87941]/30 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 hover:from-[#c87941]/30 hover:to-[#6b7f4a]/30 hover:border-[#c87941]/50 hover:shadow-lg hover:-translate-y-1 group"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <LogoutOutlined className="text-xl group-hover:rotate-12 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </Sider>

      <Layout style={{ marginLeft: 280 }}>
        <Content className="bg-gradient-to-br from-[#faf8f3] to-[#fff5eb] p-8 min-h-screen">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

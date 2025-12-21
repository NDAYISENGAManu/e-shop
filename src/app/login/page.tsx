"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const redirectUrl = searchParams?.get("redirect") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(redirectUrl);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3] relative overflow-hidden">
        <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[500px] relative z-10 border-2 border-[#f5ebe0]">
          <Title level={2} className="text-center">
            Loading...
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3] relative overflow-hidden before:content-[''] before:absolute before:top-[-50%] before:right-[-10%] before:w-[500px] before:h-[500px] before:bg-[radial-gradient(circle,rgba(212,165,116,0.1)_0%,transparent_70%)] before:rounded-full after:content-[''] after:absolute after:bottom-[-30%] after:left-[-5%] after:w-[400px] after:h-[400px] after:bg-[radial-gradient(circle,rgba(139,111,71,0.08)_0%,transparent_70%)] after:rounded-full">
      <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[500px] relative z-10 border-2 border-[#f5ebe0] before:content-['🛍️'] before:absolute before:top-[-30px] before:left-1/2 before:-translate-x-1/2 before:text-5xl before:bg-white before:w-[70px] before:h-[70px] before:flex before:items-center before:justify-center before:rounded-full before:shadow-[0_8px_20px_rgba(139,111,71,0.2)]">
        <Title
          level={2}
          className="text-center mb-2 mt-4 !text-4xl bg-gradient-to-br from-[#8b6f47] to-[#d4a574] bg-clip-text !text-transparent font-serif"
        >
          Welcome Back
        </Title>
        <Text className="block text-center text-[var(--clr-grey-5)] mb-8 text-sm">
          Sign in to continue your shopping journey
        </Text>

        <Form onFinish={handleSubmit} layout="vertical" className="space-y-5">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3] !w-full focus:!border-[#d4a574] focus:!bg-white focus:!shadow-[0_0_0_3px_rgba(212,165,116,0.1)]"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              size="large"
              placeholder="Password"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3] !w-full focus:!border-[#d4a574] focus:!bg-white focus:!shadow-[0_0_0_3px_rgba(212,165,116,0.1)]"
            />
          </Form.Item>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[#8b6f47] text-sm transition-all duration-300 underline decoration-transparent hover:text-[#d4a574] hover:decoration-[#d4a574]"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <Text type="danger" className="block text-center">
              {error}
            </Text>
          )}

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full !bg-gradient-to-br from-[#8b6f47] to-[#d4a574] !h-auto !py-4 uppercase tracking-wider !font-bold !shadow-[0_8px_20px_rgba(139,111,71,0.3)] hover:!-translate-y-1 hover:!shadow-[0_12px_28px_rgba(139,111,71,0.4)] active:!translate-y-0"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <div className="flex items-center my-6 text-[var(--clr-grey-5)] text-sm before:content-[''] before:flex-1 before:h-[1px] before:bg-[#e8d5c4] before:mr-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[#e8d5c4] after:ml-4">
          OR
        </div>

        <Text className="text-center mt-2 text-[var(--clr-grey-5)]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#8b6f47] font-semibold transition-all duration-300 hover:text-[#d4a574]"
          >
            Register
          </Link>
        </Text>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3]">
        <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[500px] border-2 border-[#f5ebe0]">
          <Title level={2} className="text-center">Loading...</Title>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

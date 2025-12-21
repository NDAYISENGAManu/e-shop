"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Typography } from "antd";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLanguage } from "@/context/LanguageContext";
import { useNotification } from "@/components/Notification";

const { Title, Text } = Typography;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { t, language } = useLanguage();
  const { showError } = useNotification();
  const redirectUrl = searchParams?.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        showError(result.error);
      } else {
        router.push(redirectUrl);
      }
    } catch (error) {
      showError(language === 'en' ? "An error occurred. Please try again." : "Habaye ikibazo. Ongera ugerageze.");
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
            {t.common.loading}...
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
          {t.auth.loginTitle}
        </Title>
        <Text className="block text-center text-[var(--clr-grey-5)] mb-8 text-sm">
          {t.auth.loginSubtitle}
        </Text>

        <Form onFinish={handleSubmit} layout="vertical" className="space-y-5">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: language === 'en' ? "Please enter a valid email" : "Andika imeli yukuri",
              },
            ]}
          >
            <Input placeholder={t.auth.email} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: language === 'en' ? "Please enter your password" : "Andika ijambo ry'ibanga" }]}
          >
            <PasswordInput placeholder={t.auth.password} />
          </Form.Item>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[#8b6f47] text-sm transition-all duration-300 underline decoration-transparent hover:text-[#d4a574] hover:decoration-[#d4a574]"
            >
              {t.auth.forgotPassword}
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            fullWidth
            className="uppercase tracking-wider !py-4"
          >
            {loading ? `${t.common.loading}...` : t.auth.loginBtn}
          </Button>
        </Form>

        <div className="flex items-center my-6 text-[var(--clr-grey-5)] text-sm before:content-[''] before:flex-1 before:h-[1px] before:bg-[#e8d5c4] before:mr-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[#e8d5c4] after:ml-4">
          OR
        </div>

        <Text className="text-center mt-2 text-[var(--clr-grey-5)]">
          {t.auth.noAccount}{" "}
          <Link
            href="/register"
            className="text-[#8b6f47] font-semibold transition-all duration-300 hover:text-[#d4a574]"
          >
            {t.auth.registerLink}
          </Link>
        </Text>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3]">
        <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[500px] border-2 border-[#f5ebe0]">
          <Title level={2} className="text-center">{t.common.loading}...</Title>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

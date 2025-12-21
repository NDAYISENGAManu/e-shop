"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import { useNotification } from "@/components/Notification";
import { NativeSelect } from "@/components/ui/NativeSelect";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLanguage } from "@/context/LanguageContext";

const { Title, Text } = Typography;

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your elementary school?",
  "What is your favorite book?",
  "What was your childhood nickname?",
];

export default function RegisterPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/register", values);
      showSuccess(language === 'en' ? "Registration successful! Redirecting to login..." : "Kwiyandikisha byagenze neza! Turakugeza ahabanza...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      showError(error.response?.data?.error || (language === 'en' ? "Registration failed" : "Kwiyandikisha ntibyagenze neza"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3] relative overflow-hidden before:content-[''] before:absolute before:top-[-30%] before:left-[-10%] before:w-[500px] before:h-[500px] before:bg-[radial-gradient(circle,rgba(212,165,116,0.1)_0%,transparent_70%)] before:rounded-full after:content-[''] after:absolute after:bottom-[-40%] after:right-[-5%] after:w-[450px] after:h-[450px] after:bg-[radial-gradient(circle,rgba(139,111,71,0.08)_0%,transparent_70%)] after:rounded-full">
      <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[550px] relative z-10 border-2 border-[#f5ebe0]">
        <Title
          level={2}
          className="text-center mb-2 mt-4 !text-4xl bg-gradient-to-br from-[#8b6f47] to-[#d4a574] bg-clip-text !text-transparent font-serif"
        >
          {t.auth.registerTitle}
        </Title>
        <Text className="block text-center text-[var(--clr-grey-5)] mb-8 text-sm">
          {t.auth.registerSubtitle}
        </Text>

        <Form
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            securityQuestion1: SECURITY_QUESTIONS[0],
            securityQuestion2: SECURITY_QUESTIONS[1],
          }}
          className="space-y-5"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: language === 'en' ? "Please enter your first name" : "Andika izina ry'idini" }]}
          >
            <Input placeholder={language === 'en' ? "First Name" : "Izina ry'idini"} />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: language === 'en' ? "Please enter your last name" : "Andika izina rya se" }]}
          >
            <Input placeholder={language === 'en' ? "Last Name" : "Izina rya se"} />
          </Form.Item>

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
            rules={[
              { required: true, message: language === 'en' ? "Please enter your password" : "Andika ijambo ry'ibanga" },
              { min: 6, message: language === 'en' ? "Password must be at least 6 characters" : "Ijambo ry'ibanga rigomba kugira inyuguti nibura 6" },
            ]}
          >
            <PasswordInput placeholder={`${t.auth.password} (min 6 characters)`} />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: language === 'en' ? "Please select your date of birth" : "Hitamo itariki y'amavuko" },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <h3 className="w-full text-left text-base text-[#8b6f47] mb-2 font-semibold uppercase tracking-wide">
            🔒 {language === 'en' ? "Security Questions" : "Ibibazo by'umutekano"}
          </h3>

          <div className="space-y-2">
            <Form.Item
              name="securityQuestion1"
              rules={[{ required: true, message: language === 'en' ? "Please select a question" : "Hitamo ikibazo" }]}
            >
              <NativeSelect
                placeholder={language === 'en' ? "Select your first question" : "Hitamo ikibazo cya mbere"}
                options={SECURITY_QUESTIONS.map((q) => ({
                  label: q,
                  value: q,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="securityAnswer1"
              rules={[{ required: true, message: language === 'en' ? "Please enter your answer" : "Andika igisubizo" }]}
            >
              <Input placeholder={language === 'en' ? "Your Answer" : "Igisubizo cyawe"} />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.securityQuestion1 !== currentValues.securityQuestion1
              }
            >
              {({ getFieldValue }) => {
                const q1 = getFieldValue("securityQuestion1");
                return (
                  <Form.Item
                    name="securityQuestion2"
                    dependencies={["securityQuestion1"]}
                    rules={[{ required: true, message: language === 'en' ? "Please select a question" : "Hitamo ikibazo" }]}
                  >
                    <NativeSelect
                      placeholder={language === 'en' ? "Select your second question" : "Hitamo ikibazo cya kabiri"}
                      options={SECURITY_QUESTIONS.filter((q) => q !== q1).map((q) => ({
                        label: q,
                        value: q,
                      }))}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <Form.Item
              name="securityAnswer2"
              rules={[{ required: true, message: language === 'en' ? "Please enter your answer" : "Andika igisubizo" }]}
            >
              <Input placeholder={language === 'en' ? "Your Answer" : "Igisubizo cyawe"} />
            </Form.Item>
          </div>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            fullWidth
            className="uppercase tracking-wider !py-4"
          >
            {loading ? `${t.common.loading}...` : t.auth.registerBtn}
          </Button>
        </Form>

        <Text className="text-center mt-2 text-[var(--clr-grey-5)]">
          {t.auth.alreadyHaveAccount}{" "}
          <Link
            href="/login"
            className="text-[#8b6f47] font-semibold transition-all duration-300 hover:text-[#d4a574]"
          >
            {t.auth.loginLink}
          </Link>
        </Text>
      </div>
    </div>
  );
}

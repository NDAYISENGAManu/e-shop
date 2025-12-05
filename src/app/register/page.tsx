"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import { useNotification } from "@/components/Notification";

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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/register", values);
      showSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      showError(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#fef9f3] via-[#fff5eb] to-[#fef9f3] relative overflow-hidden before:content-[''] before:absolute before:top-[-30%] before:left-[-10%] before:w-[500px] before:h-[500px] before:bg-[radial-gradient(circle,rgba(212,165,116,0.1)_0%,transparent_70%)] before:rounded-full after:content-[''] after:absolute after:bottom-[-40%] after:right-[-5%] after:w-[450px] after:h-[450px] after:bg-[radial-gradient(circle,rgba(139,111,71,0.08)_0%,transparent_70%)] after:rounded-full">
      <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[550px] relative z-10 border-2 border-[#f5ebe0] before:content-['✨'] before:absolute before:top-[-30px] before:left-1/2 before:-translate-x-1/2 before:text-5xl before:bg-white before:w-[70px] before:h-[70px] before:flex before:items-center before:justify-center before:rounded-full before:shadow-[0_8px_20px_rgba(139,111,71,0.2)]">
        <Title
          level={2}
          className="text-center mb-2 mt-4 !text-4xl bg-gradient-to-br from-[#8b6f47] to-[#d4a574] bg-clip-text !text-transparent font-serif"
        >
          Join Our Community
        </Title>
        <Text className="block text-center text-[var(--clr-grey-5)] mb-8 text-sm">
          Create an account to start your creative journey
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
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              size="large"
              placeholder="First Name"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              size="large"
              placeholder="Last Name"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
            />
          </Form.Item>

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
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password (min 6 characters)"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
            />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <Input
              type="date"
              size="large"
              className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
            />
          </Form.Item>

          <h3 className="text-base text-[#8b6f47] mb-2 font-semibold uppercase tracking-wide">
            🔒 Security Questions
          </h3>

          <div className="space-y-2">
            <Form.Item
              name="securityQuestion1"
              rules={[{ required: true, message: "Please select a question" }]}
            >
              <Select
                size="large"
                placeholder="Select your first question"
                className="w-full"
                options={SECURITY_QUESTIONS.map((q) => ({
                  label: q,
                  value: q,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="securityAnswer1"
              rules={[{ required: true, message: "Please enter your answer" }]}
            >
              <Input
                size="large"
                placeholder="Your Answer"
                className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
              />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              name="securityQuestion2"
              dependencies={["securityQuestion1"]}
              rules={[{ required: true, message: "Please select a question" }]}
            >
              {({ getFieldValue }) => {
                const q1 = getFieldValue("securityQuestion1");
                return (
                  <Select
                    size="large"
                    placeholder="Select your second question"
                    className="w-full"
                  >
                    {SECURITY_QUESTIONS.filter((q) => q !== q1).map((q) => (
                      <Select.Option key={q} value={q}>
                        {q}
                      </Select.Option>
                    ))}
                  </Select>
                );
              }}
            </Form.Item>
            <Form.Item
              name="securityAnswer2"
              rules={[{ required: true, message: "Please enter your answer" }]}
            >
              <Input
                size="large"
                placeholder="Your Answer"
                className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#fef9f3]"
              />
            </Form.Item>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full !bg-gradient-to-br from-[#8b6f47] to-[#d4a574] !h-auto !py-4 uppercase tracking-wider !font-bold !shadow-[0_8px_20px_rgba(139,111,71,0.3)]"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>

        <Text className="text-center mt-2 text-[var(--clr-grey-5)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#8b6f47] font-semibold transition-all duration-300 hover:text-[#d4a574]"
          >
            Login
          </Link>
        </Text>
      </div>
    </div>
  );
}

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
      <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,111,71,0.15)] w-[90vw] max-w-[550px] relative z-10 border-2 border-[#f5ebe0]">
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
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last Name" />
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
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <PasswordInput placeholder="Password (min 6 characters)" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <h3 className="w-full text-left text-base text-[#8b6f47] mb-2 font-semibold uppercase tracking-wide">
            🔒 Security Questions
          </h3>

          <div className="space-y-2">
            <Form.Item
              name="securityQuestion1"
              rules={[{ required: true, message: "Please select a question" }]}
            >
              <NativeSelect
                placeholder="Select your first question"
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
              <Input placeholder="Your Answer" />
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
                    rules={[{ required: true, message: "Please select a question" }]}
                  >
                    <NativeSelect
                      placeholder="Select your second question"
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
              rules={[{ required: true, message: "Please enter your answer" }]}
            >
              <Input placeholder="Your Answer" />
            </Form.Item>
          </div>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            fullWidth
            className="uppercase tracking-wider !py-4"
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

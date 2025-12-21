"use client";

import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import { useNotification } from "@/components/Notification";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [userQuestions, setUserQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/forgot-password/verify-email",
        { email: values.email }
      );
      setUserQuestions(response.data.questions);
      setEmail(values.email);
      setStep(1);
    } catch (error: any) {
      showError(error.response?.data?.error || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (values.newPassword.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/forgot-password/reset", {
        email,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        answer1: values.answer1,
        answer2: values.answer2,
        newPassword: values.newPassword,
      });

      showSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      showError(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] grid place-items-center py-16 bg-gradient-to-br from-[#faf8f3] via-[#fff5eb] to-[#faf8f3] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-40%] right-[-15%] w-[550px] h-[550px] bg-gradient-radial from-[#c87941]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-35%] left-[-10%] w-[450px] h-[450px] bg-gradient-radial from-[#6b7f4a]/8 to-transparent rounded-full blur-3xl"></div>

      <div className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,90,60,0.15)] w-[90vw] max-w-[550px] relative z-10 border-2 border-[#e8d5c4]">
        {/* Icon Badge */}
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] bg-gradient-to-br from-[#c87941] to-[#6b7f4a] rounded-full shadow-[0_8px_20px_rgba(139,90,60,0.25)] flex items-center justify-center text-4xl">
          🔐
        </div>

        <Title
          level={2}
          className="text-center mb-3 mt-6 !text-4xl"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            background: 'linear-gradient(to right, #c87941, #6b7f4a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Reset Password
        </Title>

        {/* Custom Handcraft Stepper */}
        <div className="relative flex justify-between items-center w-full max-w-[300px] mx-auto my-10">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#e8d5c4] -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
              step >= 0 
                ? "bg-gradient-to-br from-[#c87941] to-[#ba6f3e] text-white shadow-[0_4px_12px_rgba(200,121,65,0.3)] scale-110" 
                : "bg-white border-2 border-[#e8d5c4] text-[#e8d5c4]"
            }`}>
              1
            </div>
            <span className={`text-xs font-bold tracking-wider uppercase ${step >= 0 ? "text-[#c87941]" : "text-[#d6c0ad]"}`}>
              Verify
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
              step >= 1 
                ? "bg-gradient-to-br from-[#c87941] to-[#ba6f3e] text-white shadow-[0_4px_12px_rgba(200,121,65,0.3)] scale-110" 
                : "bg-white border-2 border-[#e8d5c4] text-[#e8d5c4]"
            }`}>
              2
            </div>
            <span className={`text-xs font-bold tracking-wider uppercase ${step >= 1 ? "text-[#c87941]" : "text-[#d6c0ad]"}`}>
              Reset
            </span>
          </div>
        </div>

        {step === 0 ? (
          <>
            <Text 
              className="block text-center text-[#7a5838] mb-6 leading-relaxed"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Enter your email address to begin the password reset process.
            </Text>
            <Form onFinish={handleEmailSubmit} layout="vertical">
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
                  placeholder="Email Address"
                  className="!p-4 !border-2 mb-12 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941] "
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="w-full !bg-gradient-to-r from-[#c87941] to-[#6b7f4a] !border-none !h-auto !py-4 uppercase tracking-wider !font-bold !shadow-[0_8px_20px_rgba(200,121,65,0.3)] hover:!shadow-[0_12px_28px_rgba(200,121,65,0.4)] !rounded-full"
                style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>
            </Form>
          </>
        ) : (
          <>
            <Text 
              className="block text-center text-[#7a5838] mb-6 leading-relaxed"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Please answer your security questions and provide additional
              information to verify your identity.
            </Text>
            <Form onFinish={handleResetPassword} layout="vertical">
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>First Name</span>}
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input
                  size="large"
                  placeholder="First Name"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Last Name</span>}
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input
                  size="large"
                  placeholder="Last Name"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Date of Birth</span>}
                name="dateOfBirth"
                rules={[{ required: true, message: "Please select your date of birth" }]}
              >
                <Input
                  type="date"
                  size="large"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>

              <Form.Item
                name="answer1"
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{userQuestions[0]}</span>}
                rules={[{ required: true, message: "Please answer this question" }]}
              >
                <Input
                  size="large"
                  placeholder="Your Answer"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>

              <Form.Item
                name="answer2"
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{userQuestions[1]}</span>}
                rules={[{ required: true, message: "Please answer this question" }]}
              >
                <Input
                  size="large"
                  placeholder="Your Answer"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>New Password</span>}
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter your new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="New Password (min 6 characters)"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Confirm Password</span>}
                name="confirmPassword"
                rules={[{ required: true, message: "Please confirm your password" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm New Password"
                  className="!p-4 !border-2 !border-[#e8d5c4] !rounded-xl !bg-[#faf8f3] !w-full focus:!border-[#c87941]"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="w-full !bg-gradient-to-r from-[#c87941] to-[#6b7f4a] !border-none !h-auto !py-4 uppercase tracking-wider !font-bold !shadow-[0_8px_20px_rgba(200,121,65,0.3)] hover:!shadow-[0_12px_28px_rgba(200,121,65,0.4)] !rounded-full"
                style={{ fontFamily: "'Quicksand', sans-serif", letterSpacing: '1px' }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          </>
        )}

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-[#c87941] font-semibold transition-all duration-300 hover:text-[#6b7f4a]"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Form, Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import { useNotification } from "@/components/Notification";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLanguage } from "@/context/LanguageContext";

const { Title, Text } = Typography;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [userQuestions, setUserQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();

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
      showError(error.response?.data?.error || (language === 'en' ? "Email not found" : "Imeli ntibonetse"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      showError(language === 'en' ? "Passwords do not match" : "Amagambo y'ibanga ntabwo ahuye");
      return;
    }

    if (values.newPassword.length < 6) {
      showError(language === 'en' ? "Password must be at least 6 characters" : "Ijambo ry'ibanga rigomba kugira inyuguti nibura 6");
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

      showSuccess(language === 'en' ? "Password reset successful! Redirecting to login..." : "Ijambo ry'ibanga ryahinduwe neza! Turakugeza ahabanza...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      showError(error.response?.data?.error || (language === 'en' ? "Failed to reset password" : "Guhindura ijambo ry'ibanga ntibyagenze neza"));
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
          {t.auth.resetTitle}
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
              {language === 'en' ? 'Verify' : 'Genzura'}
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
              {language === 'en' ? 'Reset' : 'Hindura'}
            </span>
          </div>
        </div>

        {step === 0 ? (
          <>
            <Text 
              className="block text-center text-[#7a5838] mb-6 leading-relaxed"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {t.auth.resetSubtitle}
            </Text>
            <Form onFinish={handleEmailSubmit} layout="vertical">
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
                <Input placeholder={t.auth.email} className="mb-12" />
              </Form.Item>
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                className="uppercase tracking-wider !py-4"
              >
                {loading ? `${language === 'en' ? 'Verifying' : 'Turagenzura'}...` : (language === 'en' ? 'Continue' : 'Komeza')}
              </Button>
            </Form>
          </>
        ) : (
          <>
            <Text 
              className="block text-center text-[#7a5838] mb-6 leading-relaxed"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {language === 'en' 
                ? "Please answer your security questions and provide additional information to verify your identity."
                : "Subiza ibibazo by'umutekano hanyuma utange andi makuru kugira ngo tumenye ko ari wowe."}
            </Text>
            <Form onFinish={handleResetPassword} layout="vertical">
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{language === 'en' ? "First Name" : "Izina ry'idini"}</span>}
                name="firstName"
                rules={[{ required: true, message: language === 'en' ? "Please enter your first name" : "Andika izina ry'idini" }]}
              >
                <Input placeholder={language === 'en' ? "First Name" : "Izina ry'idini"} />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{language === 'en' ? "Last Name" : "Izina rya se"}</span>}
                name="lastName"
                rules={[{ required: true, message: language === 'en' ? "Please enter your last name" : "Andika izina rya se" }]}
              >
                <Input placeholder={language === 'en' ? "Last Name" : "Izina rya se"} />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{language === 'en' ? "Date of Birth" : "Itariki y'amavuko"}</span>}
                name="dateOfBirth"
                rules={[{ required: true, message: language === 'en' ? "Please select your date of birth" : "Hitamo itariki y'amavuko" }]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                name="answer1"
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{userQuestions[0]}</span>}
                rules={[{ required: true, message: language === 'en' ? "Please answer this question" : "Subiza iki kibazo" }]}
              >
                <Input placeholder={language === 'en' ? "Your Answer" : "Igisubizo cyawe"} />
              </Form.Item>

              <Form.Item
                name="answer2"
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{userQuestions[1]}</span>}
                rules={[{ required: true, message: language === 'en' ? "Please answer this question" : "Subiza iki kibazo" }]}
              >
                <Input placeholder={language === 'en' ? "Your Answer" : "Igisubizo cyawe"} />
              </Form.Item>

              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{language === 'en' ? "New Password" : "Ijambo ry'ibanga rishya"}</span>}
                name="newPassword"
                rules={[
                  { required: true, message: language === 'en' ? "Please enter your new password" : "Andika ijambo ry'ibanga rishya" },
                  { min: 6, message: language === 'en' ? "Password must be at least 6 characters" : "Ijambo ry'ibanga rigomba kugira inyuguti nibura 6" },
                ]}
              >
                <PasswordInput placeholder={`${language === 'en' ? "New Password" : "Ijambo ry'ibanga rishya"} (min 6 characters)`} />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#7a5838] font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{language === 'en' ? "Confirm Password" : "Soma ijambo ry'ibanga"}</span>}
                name="confirmPassword"
                rules={[{ required: true, message: language === 'en' ? "Please confirm your password" : "Soma ijambo ry'ibanga" }]}
              >
                <PasswordInput placeholder={language === 'en' ? "Confirm New Password" : "Soma ijambo ry'ibanga rishya"} />
              </Form.Item>

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                className="uppercase tracking-wider !py-4"
              >
                {loading ? `${language === 'en' ? 'Resetting' : 'Turahindura'}...` : t.auth.resetTitle}
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
            ← {t.auth.backToLogin}
          </Link>
        </div>
      </div>
    </div>
  );
}

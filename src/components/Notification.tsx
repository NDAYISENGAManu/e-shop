"use client";

import { createContext, useContext, ReactNode } from "react";
import { notification } from "antd";
import { 
  CheckCircleFilled, 
  CloseCircleFilled, 
  InfoCircleFilled, 
  ExclamationCircleFilled 
} from "@ant-design/icons";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [api, contextHolder] = notification.useNotification();

  const getNotificationConfig = (type: NotificationType) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircleFilled className="text-2xl text-[#6b7f4a]" />,
          style: {
            border: "2px solid #6b7f4a",
            background: "#f8faf5",
            borderRadius: "16px",
          },
          title: "Craft Success",
        };
      case "error":
        return {
          icon: <CloseCircleFilled className="text-2xl text-[#e85d04]" />,
          style: {
            border: "2px solid #e85d04",
            background: "#fff5f0",
            borderRadius: "16px",
          },
          title: "Artisan Error",
        };
      case "warning":
        return {
          icon: <ExclamationCircleFilled className="text-2xl text-[#c87941]" />,
          style: {
            border: "2px solid #c87941",
            background: "#fff9f5",
            borderRadius: "16px",
          },
          title: "Awaiting Attention",
        };
      default:
        return {
          icon: <InfoCircleFilled className="text-2xl text-[#d4a574]" />,
          style: {
            border: "2px solid #d4a574",
            background: "#fef9f3",
            borderRadius: "16px",
          },
          title: "Information",
        };
    }
  };

  const showNotification = (text: string, type: NotificationType = "info") => {
    const config = getNotificationConfig(type);
    
    api[type]({
      message: (
        <span className="font-serif font-bold text-lg text-[#2d2416]">
          {config.title}
        </span>
      ),
      description: (
        <span className="font-sans font-medium text-[#8b6f47]">
          {text}
        </span>
      ),
      placement: "topRight",
      duration: 4,
      icon: config.icon,
      style: {
        ...config.style,
        boxShadow: "0 15px 40px rgba(139, 90, 60, 0.12)",
      },
    } as any);
  };

  const showSuccess = (message: string) => showNotification(message, "success");
  const showError = (message: string) => showNotification(message, "error");
  const showInfo = (message: string) => showNotification(message, "info");
  const showWarning = (message: string) => showNotification(message, "warning");

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, ReactNode } from "react";
import { notification } from "antd";

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

  const showNotification = (text: string, type: NotificationType = "info") => {
    api[type]({
      message: text,
      placement: "topRight",
      duration: 5,
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

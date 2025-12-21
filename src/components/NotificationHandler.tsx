"use client";

import { useEffect } from "react";
import axios from "axios";
import { useNotification } from "./Notification";
import { useLanguage } from "@/context/LanguageContext";

export default function NotificationHandler() {
  const { showError } = useNotification();
  const { language } = useLanguage();

  useEffect(() => {
    // Set up axios interceptor
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only handle errors if they haven't been handled or if we want global reporting
        // In many cases, we might want to let the component handle it,
        // but for unexpected 500s or network errors, global is good.
        
        const isInternalError = error.response?.status === 500;
        const errorMessage = error.response?.data?.error || error.message;

        // If it's a 500 or a specific type of error we want to mask/improve
        if (isInternalError || errorMessage?.toLowerCase().includes("internal server error")) {
          const betterMessage = language === 'rw' 
            ? "Habaye ikibazo kuri seriveri yacu. Turimo kugikemura."
            : "We encountered a technical issue in our workshop. Our artisans are fixing it!";
          showError(betterMessage);
        } else if (error.code === "ERR_NETWORK") {
          const networkMessage = language === 'rw'
            ? "Ntabwo tubasha kugera kuri interineti. Reba niba ufunguye."
            : "Connection lost. Please check your internet craftsmanship.";
          showError(networkMessage);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [showError, language]);

  return null; // This component doesn't render anything
}

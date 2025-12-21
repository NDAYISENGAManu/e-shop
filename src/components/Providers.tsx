"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { NotificationProvider } from "./Notification";
import { LanguageProvider } from "@/context/LanguageContext";
import NotificationHandler from "./NotificationHandler";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
            gcTime: 10 * 60 * 1000, // 10 minutes - cache kept in memory longer (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Don't refetch on component mount if data is fresh
            retry: 2, // Retry failed requests twice
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <NotificationProvider>
            <NotificationHandler />
            {children}
          </NotificationProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

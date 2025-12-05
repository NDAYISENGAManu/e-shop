"use client";

import { Spin } from "antd";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  text = "Loading",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full p-12 ${
        fullScreen ? "min-h-screen" : "min-h-[400px]"
      }`}
    >
      <Spin size="large" />
      {text && (
        <p className="mt-6 text-[var(--clr-grey-5)] text-lg font-medium animate-pulse">
          {text}...
        </p>
      )}
    </div>
  );
}

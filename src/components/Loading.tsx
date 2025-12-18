"use client";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
      <div className="flex items-center gap-4">
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 48, color: "#c87941" }} spin />
          }
        />
      </div>
      {text && (
        <p className="mt-6 text-[#c87941] text-lg font-medium animate-pulse">
          {text}...
        </p>
      )}
    </div>
  );
}

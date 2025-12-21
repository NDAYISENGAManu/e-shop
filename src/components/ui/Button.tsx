
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-full focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95";
    
    const variants = {
      primary: "bg-gradient-to-r from-[#c87941] to-[#ba6f3e] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-none",
      secondary: "bg-[#e8d5c4] text-[#5c4028] hover:bg-[#d6c0ad]",
      outline: "border-2 border-[#c87941] text-[#c87941] bg-transparent hover:bg-[#c87941] hover:text-white",
      ghost: "bg-transparent text-[#c87941] hover:bg-[#fef9f3]",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        disabled={disabled || loading}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
        {...props}
      >
        {loading && <LoadingOutlined className="mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

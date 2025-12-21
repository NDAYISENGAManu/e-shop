
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, fullWidth = true, error, value, ...props }, ref) => {
    return (
      <div className={`relative ${fullWidth ? "w-full" : ""}`}>
        <input
          type={type}
          value={value ?? ""}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef9f3] outline-none transition-all placeholder:text-gray-400 text-[#5c4028] disabled:cursor-not-allowed disabled:opacity-50
            ${error 
              ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" 
              : "border-[#e8d5c4] focus:border-[#c87941] focus:shadow-[0_0_0_4px_rgba(200,121,65,0.1)]"
            }
            ${className}
          `}
          style={{ fontFamily: "'Quicksand', sans-serif" }}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

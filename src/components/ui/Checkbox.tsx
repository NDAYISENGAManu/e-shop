
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <label className={`flex items-start gap-3 cursor-pointer group ${className || ""}`}>
        <div className="relative mt-1">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className="w-5 h-5 border-2 border-[#e8d5c4] rounded bg-white transition-all peer-checked:bg-[#c87941] peer-checked:border-[#c87941] peer-focus:shadow-[0_0_0_4px_rgba(200,121,65,0.1)] group-hover:border-[#c87941]/50" />
          <svg
            className="absolute top-0 left-0 w-5 h-5 text-white scale-0 transition-transform peer-checked:scale-100 p-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {(children || label) && (
          <div className="flex flex-col">
            {label && <span className="text-[#2d2416] font-semibold select-none">{label}</span>}
            {children}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

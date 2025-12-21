
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, fullWidth = true, error, ...props }, ref) => {
    return (
      <div className={`relative ${fullWidth ? "w-full" : ""}`}>
        <textarea
          className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef9f3] outline-none transition-all placeholder:text-gray-400 text-[#5c4028] disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]
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

TextArea.displayName = "TextArea";

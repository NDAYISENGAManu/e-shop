
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  className?: string;
  closeIcon?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 520,
  className = "",
  closeIcon = true,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeInUp_0.3s_ease-out]"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-[modalIn_0.3s_ease-out] w-full ${className}`}
        style={{ maxWidth: width }}
      >
        {/* Header */}
        {(title || closeIcon) && (
          <div className="px-8 py-6 border-b border-[#e8d5c4]/50 flex items-center justify-between">
            {title && (
              <div className="text-2xl font-bold text-[#2d2416] font-serif">
                {title}
              </div>
            )}
            {closeIcon && (
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#fef9f3] text-[#7a5838] transition-colors"
              >
                <CloseOutlined className="text-xl" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-5 border-t border-[#e8d5c4]/50 bg-[#faf8f3]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

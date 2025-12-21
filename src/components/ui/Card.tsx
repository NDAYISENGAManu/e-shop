
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}

export const Card = ({ children, className = "", hoverable = false, cover, actions }: CardProps) => {
  return (
    <div className={`
      bg-white rounded-3xl overflow-hidden border-2 border-[#e8d5c4] transition-all duration-300
      ${hoverable ? "hover:shadow-[0_12px_32px_rgba(139,90,60,0.2)] hover:-translate-y-1 hover:border-[#c87941]/30" : "shadow-[0_4px_20px_rgba(139,90,60,0.1)]"}
      ${className}
    `}>
      {cover && (
        <div className="relative overflow-hidden">
          {cover}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {actions && actions.length > 0 && (
        <div className="flex border-t border-[#e8d5c4]/50 bg-[#faf8f3]/50">
          {actions.map((action, index) => (
            <div 
              key={index}
              className={`flex-1 flex justify-center py-4 px-2 hover:bg-[#fef9f3] transition-colors ${index !== actions.length - 1 ? "border-r border-[#e8d5c4]/50" : ""}`}
            >
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CardMeta = ({ title, description }: { title: React.ReactNode; description: React.ReactNode }) => {
  return (
    <div className="space-y-2">
      <div className="text-xl font-bold font-serif text-[#2d2416]">{title}</div>
      <div className="text-[#7a5838] leading-relaxed">{description}</div>
    </div>
  );
};

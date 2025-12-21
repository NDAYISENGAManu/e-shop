
"use client";

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: '', flag: '🇬🇧' },
    { code: 'rw', label: '', flag: '🇷🇼' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-[#7a5838] bg-white/60 backdrop-blur-sm border border-[#e8d5c4] rounded-full hover:bg-white transition-all shadow-sm"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        <GlobalOutlined className="text-[#c87941]" />
        <span className="font-bold text-sm tracking-wide uppercase">
          {language === 'en' ? 'EN' : 'RW'}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-3 w-48 bg-white border-2 border-[#f5ebe0] rounded-2xl shadow-[0_10px_30px_rgba(139,111,71,0.15)] z-[70] overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                    language === lang.code 
                      ? 'bg-gradient-to-r from-[#c87941]/10 to-[#ba6f3e]/10 text-[#c87941]' 
                      : 'text-[#8b6f47] hover:bg-[#fef9f3] hover:text-[#c87941]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {lang.label}
                    </span>
                  </div>
                  {language === lang.code && (
                    <CheckOutlined className="text-[#c87941]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

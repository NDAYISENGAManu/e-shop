"use client";

import { useState } from "react";
import { Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { formatPrice } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t, language } = useLanguage();

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const response = await axios.get(`/api/products?search=${searchTerm}`);
      return response.data.products;
    },
    enabled: searchTerm.length > 0,
  });

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title={t.common.search}
        className="bg-transparent border-none text-[#8b6f47] text-xl cursor-pointer p-2 transition-all duration-300 flex items-center justify-center rounded-full hover:bg-[rgba(139,111,71,0.1)] hover:scale-110"
      >
        <SearchOutlined />
      </button>

      <Modal
        open={isOpen}
        onCancel={handleClose}
        maskClosable={false}
        footer={null}
        width={700}
        centered
        className="search-modal"
        bodyStyle={{ padding: 0 }}
      >
        <div className="bg-gradient-to-br from-[#8b6f47] to-[#d4a574] text-white p-6 m-0">
          <h2 className="font-serif text-2xl m-0">
            {language === 'en' ? "Search Handcrafted Products" : "Shaka Ibihimbano by'intoki"}
          </h2>
        </div>

        <div className="p-8 bg-white">
          <Input
            size="large"
            placeholder={language === 'en' ? "Search for artisan products..." : "Shakisha ibihimbano bibereye ijisho..."}
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="rounded-full"
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto px-8 pb-8 bg-white">
          {isLoading ? (
            <div className="text-center py-12 text-[#8b6f47] text-lg">
              {language === 'en' ? "Searching our artisan collection..." : "Turishakira umuhengeri w'ubuhanga..."}
            </div>
          ) : searchTerm && results && results.length > 0 ? (
            results.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={handleClose}
                className="flex gap-4 p-4 mb-4 bg-gradient-to-br from-[#fef9f3] to-white rounded-2xl border-2 border-transparent transition-all duration-300 hover:border-[#d4a574] hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(139,111,71,0.15)]"
              >
                <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl border-2 border-[#d4a574]"
                />
                <div className="flex-1">
                  <h4 className="text-[#8b6f47] mb-2 font-serif">
                    {product.name}
                  </h4>
                  <p className="text-[var(--clr-grey-5)] text-sm">
                    {product.category}
                  </p>
                  <p className="text-[#d4a574] font-bold text-lg mt-2">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))
          ) : searchTerm ? (
            <div className="text-center py-12 text-[var(--clr-grey-5)]">
              <SearchOutlined className="text-5xl text-[#d4a574] mb-4" />
              <p className="text-lg">{language === 'en' ? "No handcrafted items found" : "Ntabwo tubonye ibihimbano bijyanye n'ibyo ushaka"}</p>
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--clr-grey-5)]">
              <SearchOutlined className="text-5xl text-[#d4a574] mb-4" />
              <p className="text-lg">
                {language === 'en' ? "Start typing to search our artisan collection" : "Tangira wandike dushakishe mu buhanga bwacu"}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

// src/components/ProductSidebarFilter.jsx
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import GlobalButton from "./GlobalButton";

import { X } from "lucide-react";

export default function ProductSidebarFilter({
  subCategories = [],
  selectedSubs = [],
  onChangeSubs,
  isMobile = false,
  showMobileSidebar,
  setShowMobileSidebar,
}) {
  const { lang } = useI18n();

  const toggle = (id) => {
    if (selectedSubs.includes(id))
      onChangeSubs(selectedSubs.filter((s) => s !== id));
    else onChangeSubs([...selectedSubs, id]);
  };

  const clearAll = () => onChangeSubs([]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = showMobileSidebar ? "hidden" : "auto";
    }
  }, [isMobile, showMobileSidebar]);

  const SidebarContent = (
    <div
      className="flex flex-col h-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg 
                 border-r border-gray-200 dark:border-neutral-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
        <h4 className="font-semibold text-sm tracking-wide">
          {lang === "id" ? "Filter Subkategori" : "Subcategory Filter"}
        </h4>

        {isMobile ? (
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        ) : selectedSubs.length > 0 ? (
          <button
            onClick={clearAll}
            className="text-[12px] text-sky-600 hover:underline"
          >
            {lang === "id" ? "Hapus Semua" : "Clear All"}
          </button>
        ) : null}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-3">
        {subCategories.length === 0 ? (
          <p className="text-gray-400 text-sm">
            {lang === "id"
              ? "Tidak ada subkategori."
              : "No subcategories available."}
          </p>
        ) : (
          subCategories.map((s) => (
            <div
              key={s.id}
              className="border-b border-gray-100 dark:border-neutral-800 pb-2"
            >
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={selectedSubs.includes(s.id)}
                  onChange={() => toggle(s.id)}
                  className="mt-1 w-4 h-4 accent-sky-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium group-hover:text-sky-600 transition-colors">
                    {lang === "id" ? s.name_id : s.name_en}
                  </div>
                  {s.products?.length > 0 && (
                    <div className="text-xs text-gray-400">
                      {s.products.length}{" "}
                      {lang === "id" ? "produk" : "products"}
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t dark:border-neutral-700">
        <GlobalButton
          text={lang === "id" ? "Bersihkan Filter" : "Clear Filter"}
          onClick={clearAll}
          variant="outline"
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* === Desktop Sidebar (Sticky + Independent Scroll) === */}
      {!isMobile && (
        <div className="lg:w-72 sticky top-[120px] h-[calc(100vh-120px)] overflow-hidden">
          {SidebarContent}
        </div>
      )}

      {/* === Mobile Sidebar Overlay === */}
      <AnimatePresence>
        {isMobile && showMobileSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="ml-auto w-full sm:w-[80%] h-full shadow-xl"
            >
              {SidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

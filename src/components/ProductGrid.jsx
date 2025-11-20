import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { useI18n } from "../i18n/I18nProvider";

export default function ProductGrid({ products = [] }) {
  const { lang } = useI18n();

  return (
    <div className="w-full">
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                     gap-6 sm:gap-8 px-0 sm:px-4 place-items-center"
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10"
          >
            {lang === "id"
              ? "Tidak ada produk yang sesuai filter."
              : "No products match your filters."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

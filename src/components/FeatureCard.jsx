// src/components/FeatureCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ item, onOpen }) {
  const { title, subtitle, image } = item;

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }} // visual hover only (no layout shift)
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm
                 bg-white dark:bg-gray-900/80 backdrop-blur-md cursor-pointer"
      onClick={() => onOpen && onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen && onOpen(item)}
    >
      {/* image area (portrait on desktop, landscape on mobile via aspect ratio) */}
      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </motion.article>
  );
}

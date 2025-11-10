import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

/**
 * ✅ GlobalCard — reusable untuk Principle, Success Story, dsb.
 * @param {object} props
 * @param {string} props.title - Judul card
 * @param {string} props.subtitle - Deskripsi card
 * @param {string} props.image - Gambar opsional
 * @param {JSX.Element} props.icon - Ikon opsional
 * @param {string} props.className - Tambahan class
 */
export default function GlobalCard({
  title,
  subtitle,
  image,
  icon,
  className = "",
  onClick,
  date,
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg",
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transition-all duration-500 cursor-pointer",
        "hover:shadow-2xl hover:border-blue-400/50 dark:hover:border-cyan-500/40",
        className
      )}
    >
      {/* === Image Section (untuk Success Story) === */}
      {image && (
        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      {/* === Content Section === */}
      <div className="p-6 sm:p-7">
        {/* Icon */}
        {icon && (
          <div className="text-blue-600 dark:text-cyan-400 mb-4">{icon}</div>
        )}
        {formattedDate && (
          <div className="flex justify-end">
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
              {formattedDate}
            </p>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
          {title}
        </h3>

        {/* Subtitle — sekarang tanpa clamp */}
        <p
          className="
            mt-2 sm:mt-3 
            text-gray-700 dark:text-gray-300 
            text-sm sm:text-base 
            leading-relaxed sm:leading-loose
            break-words whitespace-pre-line
          "
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

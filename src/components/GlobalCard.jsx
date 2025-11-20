import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

/**
 * Premium GlobalCard with 3D tilt, gloss, and animated lighting
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.04, rotateX: 6, rotateY: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-white/20 dark:border-white/10",
        "bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-xl",
        "transition-all duration-500 cursor-pointer",
        "hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
        "premium-card group",
        className
      )}
    >
      {/* Glass Shine */}
      <div
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Animated Edge Glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(0,200,255,0.5), rgba(0,120,255,0.3), transparent)",
          filter: "blur(14px)",
        }}
      />

      {/* === Image Section === */}
      {image && (
        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl relative z-10">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}

      {/* === Content Section === */}
      <div className="p-6 sm:p-7 relative z-10">
        {icon && (
          <div className="text-blue-600 dark:text-cyan-400 mb-4 text-3xl drop-shadow-md">
            {icon}
          </div>
        )}

        {formattedDate && (
          <div className="flex justify-end">
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
              {formattedDate}
            </p>
          </div>
        )}

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug drop-shadow-sm">
          {title}
        </h3>

        <p className="mt-2 sm:mt-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words whitespace-pre-line">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

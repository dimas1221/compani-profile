import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ title, subtitle, image }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="
        relative rounded-3xl overflow-hidden
        bg-gradient-to-br from-white/90 via-white/70 to-blue-50/70
        dark:from-gray-900/80 dark:via-gray-800/70 dark:to-cyan-950/70
        border border-gray-200/60 dark:border-gray-700/50
        shadow-sm dark:shadow-lg
        backdrop-blur-xl
        group cursor-pointer
        transition-all duration-700
      "
    >
      {/* Accent glow on hover */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100 
          bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-transparent
          blur-2xl transition-opacity duration-700 ease-out
        "
      />

      {/* Image */}
      <div className="h-48 sm:h-56 relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          draggable={false}
          className="
            w-full h-full object-cover object-center 
            scale-105 group-hover:scale-110 
            transition-transform duration-700 ease-out
          "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Text */}
      <div className="relative p-5 sm:p-6 z-10">
        <h3
          className="
            text-lg sm:text-xl font-semibold 
            bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 
            dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500
            bg-clip-text text-transparent leading-tight
          "
        >
          {title}
        </h3>
        <p
          className="
            mt-2 sm:mt-3 text-gray-700 dark:text-gray-300 
            text-sm sm:text-base leading-relaxed
            group-hover:text-gray-900 dark:group-hover:text-gray-100
            transition-colors duration-300
          "
        >
          {subtitle}
        </p>
      </div>

      {/* Glow border */}
      <div
        className="
          absolute inset-0 pointer-events-none rounded-3xl
          border border-transparent group-hover:border-cyan-400/40
          transition-colors duration-700
        "
      />
    </motion.div>
  );
}

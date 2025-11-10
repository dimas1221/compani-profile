import React from "react";
import { motion } from "framer-motion";

export default function GlobalSectionTitle({
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`mb-6 text-center max-w-3xl mx-auto px-4 sm:px-0 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          text-2xl sm:text-4xl font-extrabold
          bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400
          text-transparent bg-clip-text
          dark:from-cyan-400 dark:via-sky-400 dark:to-blue-600
          leading-tight
        "
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
            mt-2 sm:mt-4
            text-gray-600 dark:text-gray-300
            text-sm sm:text-lg
            leading-snug sm:leading-relaxed
          "
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

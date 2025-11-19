import React from "react";
import { motion } from "framer-motion";

export default function TemplateSection({
  children,
  className = "",
  showLogo = true,
  showBlur = true,
}) {
  return (
    <section
      className={`
        relative w-full py-10 sm:py-28 px-6 
        transition-colors duration-700 overflow-hidden
        ${className}
      `}
    >
      {/* === Floating Blur Decoration === */}
      {showBlur && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.14 }}
            transition={{ duration: 1.3 }}
            className="
              absolute top-10 left-10 
              w-52 h-52 sm:w-72 sm:h-72 
              bg-blue-500/20 blur-[80px] rounded-full
            "
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 1.3, delay: 0.2 }}
            className="
              absolute bottom-10 right-10 
              w-64 h-64 sm:w-80 sm:h-80 
              bg-cyan-400/20 blur-[90px] rounded-full
            "
          />
        </>
      )}

      {/* === Background Logo Decoration === */}
      {showLogo && (
        <motion.img
          src="/images/logo/ultra_light 1.png"
          alt="decor"
          className="
            pointer-events-none select-none 
            absolute right-0 top-10
            w-[350px] sm:w-[480px]
            opacity-[0.08] dark:opacity-[0.15]
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.4 }}
        />
      )}

      {/* === Main Content === */}
      <div className="relative z-20 max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

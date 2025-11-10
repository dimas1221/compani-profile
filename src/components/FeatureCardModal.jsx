// src/components/FeatureCardModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function FeatureCardModal({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal panel */}
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.28 }}
        className="relative z-10 max-w-4xl w-full mx-4 sm:mx-6 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* top image */}
        <div className="w-full h-[52vw] sm:h-72 md:h-96 lg:h-[480px] overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                {item.title}
              </h1>
              {item.date && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-auto rounded-full p-2 bg-white dark:bg-gray-800 border hover:shadow-md transition"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>

          <p className="mt-5 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {item.description || item.subtitle}
          </p>

          {/* optional action row */}
          <div className="mt-6 flex flex-wrap gap-3">
            {/* placeholder actions */}
            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow"
            >
              Contact Sales
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
export default function HeaderLearnMoreCard({ item, lang }) {
  return (
    <motion.div
      className="flex flex-col h-full gap-4 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={lang === 'id' ? item.title_id : item.title_en}
          className="w-full h-44 object-cover rounded-xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          {lang === 'id' ? item.title_id : item.title_en}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {lang === 'id' ? item.desc_id : item.desc_en}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-primary">
          {item.tag || 'Feature'}
        </span>
        <button
          className="text-sm font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
          aria-label="learn more"
        >
          {lang === 'id' ? 'Pelajari' : 'Learn'}
        </button>
      </div>
    </motion.div>
  );
}

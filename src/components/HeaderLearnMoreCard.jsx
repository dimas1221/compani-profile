import React from 'react';
import { motion } from 'framer-motion';

export default function HeaderLearnMoreCard({ item, lang }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col gap-3 p-4 bg-white dark:bg-[#0e1116] rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
    >
      <img
        src={item.image}
        className="w-full h-36 object-cover rounded-md"
        alt={lang === 'id' ? item.title_id : item.title_en}
      />
      <div>
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {lang === 'id' ? item.title_id : item.title_en}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {lang === 'id' ? item.desc_id : item.desc_en}
        </p>
      </div>
    </motion.div>
  );
}

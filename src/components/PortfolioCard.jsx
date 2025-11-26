import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PortfolioCard({ item, lang }) {
  const [open, setOpen] = useState(false);

  const title = lang === 'id' ? item.title_id : item.title_en;
  const desc = lang === 'id' ? item.desc_id : item.desc_en;

  return (
    <>
      {/* CARD WRAPPER — NO FLICKER */}
      <div
        onClick={() => setOpen(true)}
        className="relative group w-[280px] sm:w-[300px] cursor-pointer"
      >
        {/* Card Body — NO transform */}
        <div className="rounded-2xl overflow-hidden shadow-md bg-white/90 dark:bg-gray-900/70 border border-white/5 transition-all duration-300 group-hover:shadow-xl">
          <img
            src={item.image}
            className="w-full h-44 object-cover"
            loading="lazy"
          />

          <div className="p-4">
            <div className="font-calsans text-gray-900 dark:text-gray-100">
              {title}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 font-light">
              {desc}
            </p>
          </div>
        </div>

        {/* OVERLAY — FULL FIX (no motion) */}
        <div
          className="
            absolute inset-0 flex items-center justify-center 
            bg-black/0 group-hover:bg-black/25
            transition-all duration-300
            pointer-events-none
            transform-gpu
            will-change-[opacity]
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="
              opacity-0 group-hover:opacity-100
              px-4 py-1.5 rounded-full 
              bg-primary text-white shadow-lg
              transition-opacity duration-300
              pointer-events-auto
              will-change-[opacity]
            "
          >
            {lang === 'id' ? 'Lihat' : 'View'}
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 bg-black/60 z-[999]
              flex items-center justify-center p-4 backdrop-blur-sm
            "
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                bg-white dark:bg-gray-900 rounded-2xl 
                max-w-xl w-full shadow-xl overflow-hidden
              "
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-calsans text-xl text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={item.image}
                className="w-full max-h-80 object-cover"
                alt={title}
              />

              <div className="p-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {desc}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

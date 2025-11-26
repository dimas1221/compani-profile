import React from 'react';
import { motion } from 'framer-motion';

export default function TimelinePremium({ items }) {
  return (
    <section className="mb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative border-l border-gray-300/40 dark:border-gray-700/60">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative pl-10 py-10 group"
            >
              {/* Dot */}
              <div
                className="
                absolute -left-[8px] top-10 w-4 h-4 rounded-full
                bg-white dark:bg-gray-900
                border border-gray-400 dark:border-gray-600
                group-hover:scale-125 transition-transform
              "
              />

              {/* Line highlight */}
              <div
                className="
                absolute -left-[1px] top-0 bottom-0 w-[2px] 
                bg-gradient-to-b from-primary/80 to-primary/20 
                opacity-0 group-hover:opacity-100 transition-opacity
              "
              />

              {/* Content */}
              <div
                className="
                p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/80 
                bg-white/60 dark:bg-[#0b0c0f]/60 backdrop-blur-xl shadow-sm 
                group-hover:shadow-md transition
              "
              >
                {/* IMAGE */}
                {item.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-58 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>

                {item.subtitle &&
                  (() => {
                    const parts = item.subtitle.split('|').map((p) => p.trim());

                    const isSpecial =
                      item.title ===
                        'Memperoleh Banyak Hak Kekayaan Intelektual' ||
                      item.title ===
                        'Acquired Multiple Intellectual Property Rights';

                    return (
                      <div className="mt-4">
                        {/* SPECIAL TITLE BADGE (only for index 0) */}
                        {isSpecial && parts.length > 0 && (
                          <div
                            className="
            inline-block px-4 py-1.5 rounded-lg mb-3
            text-sm font-semibold tracking-wide
            bg-gradient-to-r from-primary/15 to-primary/5 text-primary
            dark:bg-gradient-to-r dark:from-primary/25 dark:to-primary/10
            shadow-sm dark:shadow-[0_0_10px_rgba(0,0,0,0.4)]
          "
                          >
                            {parts[0]}
                          </div>
                        )}

                        {/* BULLET LIST (starting from index 1 if special) */}
                        <ul className="space-y-2">
                          {parts.slice(isSpecial ? 1 : 0).map((part, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                              <span
                                className="
                  mt-1 w-2 h-2 rounded-full 
                  bg-blue-600
                  shadow-[0_0_6px_rgba(0,0,0,0.2)]
                "
                              />
                              <span className="text-[15px] font-light tracking-wide">
                                {part}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

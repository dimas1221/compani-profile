import React from 'react';
import { motion } from 'framer-motion';

export default function BentoMosaic({ items }) {
  if (!items || items.length === 0) return null;

  // Dynamic layout sizing (premium effect)
  const getTileClass = (i) => {
    const layout = [
      'row-span-2 col-span-2', // BIG
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
    ];
    return layout[i % layout.length];
  };

  return (
    <section className="mb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px] 
          gap-5
        "
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className={`
                relative rounded-3xl overflow-hidden shadow-md 
                bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10
                ${getTileClass(i)}
              `}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div
                className="
                absolute inset-0 
                bg-gradient-to-t from-black/60 via-black/10 to-transparent 
                dark:from-black/70
              "
              />

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-white/80 mt-1">{item.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

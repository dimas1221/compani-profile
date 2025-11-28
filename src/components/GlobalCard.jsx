import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function GlobalCard({
  title,
  subtitle,
  image,
  icon,
  className = '',
  onClick,
  date,
  layout = 'classic', // dynamic layout provided by DesignGlobal1
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className={clsx(
        'relative overflow-hidden rounded-3xl border border-white/20 dark:border-white/10',
        'bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-xl',
        'cursor-pointer transition-all duration-500 premium-card group',
        className,
        // === Layout Split ===
        layout === 'split' && 'flex flex-col sm:flex-row items-stretch h-auto'
      )}
    >
      {/* -------------------------------------- */}
      {/* LAYOUT: SPLIT (Magz style)            */}
      {/* -------------------------------------- */}
      {layout === 'split' && (
        <>
          {image && (
            <div className="w-full sm:w-1/2 h-48 sm:h-auto overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          <div className="p-6 sm:p-7 w-full sm:w-1/2 flex flex-col justify-between">
            {formattedDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">
                {formattedDate}
              </p>
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {subtitle}
            </p>
          </div>
        </>
      )}

      {/* -------------------------------------- */}
      {/* LAYOUT: OVERLAY                        */}
      {/* -------------------------------------- */}
      {layout === 'overlay' && image && (
        <div className="relative w-full h-64 sm:h-72">
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition duration-700"
            alt={title}
          />

          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
            {formattedDate && (
              <p className="text-xs opacity-80 mb-1">{formattedDate}</p>
            )}
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm mt-2 opacity-90 line-clamp-2">{subtitle}</p>
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* LAYOUT: HORIZONTAL                      */}
      {/* -------------------------------------- */}
      {layout === 'horizontal' && (
        <div className="flex gap-4 items-start p-5">
          {image && (
            <img
              src={image}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
              alt={title}
            />
          )}

          <div className="flex flex-col">
            {formattedDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {formattedDate}
              </p>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* LAYOUT: CLASSIC (default)              */}
      {/* -------------------------------------- */}
      {layout === 'classic' && (
        <>
          {image && (
            <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          <div className="p-6 sm:p-7">
            {formattedDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                {formattedDate}
              </p>
            )}

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
              {title}
            </h3>

            <p className="mt-2 sm:mt-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GlobalCard from './GlobalCard';
import GlobalSectionTitle from './GlobalSectionTitle';

/**
 * ✅ Reusable global grid layout for content sections.
 *
 * @param {string} title - Section title.
 * @param {string} subtitle - Section subtitle.
 * @param {Array} items - Data array (each item: { title, subtitle, image?, icon? }).
 * @param {boolean} useImage - Use image-based cards (Success Story, etc).
 * @param {boolean} useIcon - Use icon-based cards (Principle, etc).
 * @param {string} className - Additional class styling for the container.
 */
export default function DesignGlobal1({
  title,
  subtitle,
  items = [],
  useImage = false,
  useIcon = false,
  className = '',
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <section
      className={`relative py-20 sm:py-28 px-6                 
                  transition-colors duration-700 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* === Title Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* <h2
            className="text-3xl sm:text-4xl font-extrabold
                       bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400
                       text-transparent bg-clip-text dark:from-cyan-400 dark:via-sky-400 dark:to-blue-600"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          )} */}

          <GlobalSectionTitle title={title} subtitle={subtitle} />
        </motion.div>

        {/* === Grid Section === */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {items.map((item, i) => (
            <GlobalCard
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              date={item?.date}
              icon={useIcon ? item.icon : undefined}
              onClick={item.onClick}
              image={useImage ? item.image : undefined}
              className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            />
          ))}
        </motion.div>
      </div>

      {/* === Decorative Background === */}
      <motion.img
        src="/images/logo/ultra_light 1.png"
        alt="decor"
        className="absolute right-0 top-10 w-[350px] sm:w-[480px] opacity-[0.08] dark:opacity-[0.15] pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
}

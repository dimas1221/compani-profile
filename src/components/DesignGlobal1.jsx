import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GlobalCard from './GlobalCard';
import GlobalSectionTitle from './GlobalSectionTitle';

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

  const layouts = ['classic', 'split', 'overlay', 'horizontal'];

  const getRandomLayout = () => {
    return layouts[Math.floor(Math.random() * layouts.length)];
  };

  return (
    <section
      className={`relative py-20 sm:py-28 px-6 transition-colors duration-700 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlobalSectionTitle title={title} subtitle={subtitle} />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {items.map((item, i) => (
            <GlobalCard
              key={i}
              layout={getRandomLayout()} // ← DYNAMIC LAYOUT RANDOM
              title={item.title}
              subtitle={item.subtitle}
              date={item?.date}
              icon={useIcon ? item.icon : undefined}
              onClick={item.onClick}
              image={useImage ? item.image : undefined}
              className="hover:-translate-y-2 hover:shadow-2xl"
            />
          ))}
        </motion.div>
      </div>

      {/* Background Illustration */}
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

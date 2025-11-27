import React from 'react';
import { motion } from 'framer-motion';

export default function GlobalSectionTitle({
  title,
  subtitle,
  className = '',
}) {
  return (
    <div
      className={`mb-6 text-center max-w-3xl mx-auto px-4 sm:px-0 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="
          text-2xl sm:text-4xl font-extrabold
          text-primary-500
          leading-tight font-clash
        "
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="
    mb-10 
    text-gray-700 dark:text-gray-300 
    leading-relaxed 
    text-center
    text-base sm:text-lg 
    tracking-wide 
    space-y-4
    font-light
  "
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

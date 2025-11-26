import React from 'react';
import { motion } from 'framer-motion';
import GlobalSectionTitle from './GlobalSectionTitle';
import PremiumJustifiedParagraph from './PremiumJustifiedParagraph';

export default function GlobalSplitShowcase({
  title,
  paragraph,
  image,
  reverse = false, // jika true → gambar kanan, teks kiri
  imageAlt = '',
  className = '',
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className={`w-full mb-20 ${className}`}
    >
      <div
        className={`
          smx-auto px-5 py-10
          flex flex-col md:flex-row 
          items-start md:items-center 
          gap-12 md:gap-16
          ${reverse ? 'md:flex-row-reverse' : ''}
        `}
      >
        {/* IMAGE SIDE */}
        <div
          className="
            w-full md:w-1/2 
            rounded-3xl overflow-hidden 
            shadow-xl border border-white/10 
            dark:border-gray-800/40 
            bg-white/50 dark:bg-[#0c0d10]/60 
            backdrop-blur-md
          "
        >
          <motion.img
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            className="w-full h-[200px] md:h-[400px] object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>

        {/* TEXT SIDE */}
        <div className="md:w-1/2">
          <GlobalSectionTitle title={title} className="mb-6" />

          <PremiumJustifiedParagraph>{paragraph}</PremiumJustifiedParagraph>
        </div>
      </div>
    </motion.section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function SplitFeatureSection({ items, lang }) {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-24">
      {items?.map((item, i) => {
        const title = lang === 'id' ? item.title_id : item.title_en;
        const desc = lang === 'id' ? item.desc_id : item.desc_en;

        const imageFirst = i % 2 === 0; // layout bergantian kiri / kanan

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="
              flex flex-col lg:flex-row items-center gap-10 
              lg:gap-20
            "
          >
            {/* --- IMAGE --- */}
            <div
              className={`
                w-full lg:w-1/2 
                ${imageFirst ? '' : 'lg:order-2'} 
              `}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="
                  rounded-3xl overflow-hidden 
                  shadow-[0_8px_30px_rgb(0,0,0,0.10)] 
                  dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]
                "
              >
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </motion.div>
            </div>

            {/* --- TEXT CONTENT --- */}
            <div
              className={`
                w-full lg:w-1/2 flex flex-col space-y-4 
                ${imageFirst ? '' : 'lg:order-1'}
              `}
            >
              <h3 className="text-2xl lg:text-3xl font-clash text-gray-900 dark:text-gray-100 leading-snug">
                {title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {desc}
              </p>

              {item.tag && (
                <span className="inline-block w-fit mt-3 px-4 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {item.tag}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

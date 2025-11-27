import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

export default function PortfolioDetail() {
  const { id } = useParams();
  const { lang } = useI18n();

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data.portfolio || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load portfolio:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading…</div>;
  }

  const item = portfolio.find((x) => x.id === id);

  if (!item) {
    return (
      <div className="text-center py-20 text-2xl">Portfolio item not found</div>
    );
  }

  const title = item[`title_${lang}`] || item.title_en;
  const desc = item[`desc_${lang}`] || item.desc_en;

  // Siapkan array gambar gallery (fallback ke gambar utama jika tidak ada)
  const gallery =
    item.gallery && item.gallery.length > 0
      ? item.gallery.map((g) => g.image)
      : [item.image];

  const mainImage = gallery[mainImageIndex] || gallery[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-start gap-12"
      >
        {/* Left side: Image + Thumbnails */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black ring-opacity-5">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={`${title} image`}
                loading="lazy"
                draggable={false}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-auto object-cover block"
                style={{ borderRadius: '1.5rem' }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail gallery */}
          {gallery.length > 1 && (
            <div
              className="mt-6 flex gap-4 overflow-x-auto no-scrollbar"
              aria-label="Gallery Thumbnails"
            >
              {gallery.map((img, idx) => {
                const isActive = idx === mainImageIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden ring-2 ${
                      isActive
                        ? 'ring-sky-500'
                        : 'ring-transparent hover:ring-sky-300'
                    } transition-all duration-300`}
                    style={{ width: 80, height: 80 }}
                    aria-pressed={isActive}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right side: Text content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl"
          >
            {desc}
          </motion.p>
        </div>
      </motion.div>

      <div className="my-16 border-t border-gray-200 dark:border-gray-700"></div>
    </div>
  );
}

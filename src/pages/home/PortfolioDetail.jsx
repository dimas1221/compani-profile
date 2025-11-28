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
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading…</div>;

  const item = portfolio.find((x) => x.id === id);
  if (!item) return <div className="text-center py-20 text-2xl">Not found</div>;

  const title = item[`title_${lang}`] || item.title_en;
  const desc = item[`desc_${lang}`] || item.desc_en;

  const gallery =
    item.gallery?.length > 0 ? item.gallery.map((g) => g.image) : [item.image];

  const highlights =
    lang === 'id' ? item.key_highlights_id : item.key_highlights_en;

  // FIXED: main image changes with thumbnails
  const mainImage = gallery[mainImageIndex];

  return (
    <div className="w-full min-h-screen">
      {/* ─────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[260px] sm:h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden rounded-b-3xl shadow-xl">
        <img
          src={item.image}
          alt="hero"
          className="w-full h-full object-cover scale-105 opacity-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-6 left-4 sm:top-10 sm:left-8 md:left-12 z-[30] max-w-[90%] sm:max-w-[80%] md:max-w-3xl"
        >
          <div
            className="absolute -inset-x-4 -inset-y-3 sm:-inset-x-6 sm:-inset-y-4 
                       rounded-2xl bg-gradient-to-br 
                       from-black/60 via-black/30 to-transparent 
                       backdrop-blur-[3px] pointer-events-none z-[-1]"
          />

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white
                       leading-[1.2] sm:leading-[1.1] drop-shadow-2xl"
          >
            {title}
          </h1>
        </motion.div>
      </div>

      {/* FLOATING DESCRIPTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="
          max-w-4xl mx-auto
          -mt-14 sm:-mt-16 md:-mt-20
          mb-14 md:mb-20 px-4 sm:px-6 md:px-8 py-5 sm:py-6
          bg-white/20 dark:bg-black/30 backdrop-blur-xl
          rounded-3xl shadow-xl border border-white/30
        "
      >
        <p className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-200 leading-relaxed">
          {desc}
        </p>
      </motion.div>

      {/* CONTENT SECTION */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
          {/* LEFT: Main image + Thumbnails */}
          <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt="portfolio main"
                  className="w-full h-auto object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
                {gallery.map((img, idx) => {
                  const active = idx === mainImageIndex;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`
                        flex-shrink-0 rounded-xl overflow-hidden
                        border-2 transition-all duration-300
                        ${active ? 'border-sky-500' : 'border-transparent'}
                      `}
                      style={{ width: 80, height: 80 }}
                    >
                      <img
                        src={img}
                        alt={'Thumbnail ' + idx}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Text + Highlights */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold 
                         text-gray-900 dark:text-white"
            >
              Project Overview
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg 
                         leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {desc}
            </motion.p>

            {/* KEY HIGHLIGHTS */}
            {highlights && highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 sm:mt-12"
              >
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  {lang === 'id' ? 'Keunggulan Utama' : 'Key Highlights'}
                </h2>

                <ul className="space-y-3">
                  {highlights.map((point, index) => (
                    <li
                      key={index}
                      className="
                        flex items-start gap-3 bg-white/10 dark:bg-white/5 
                        border border-white/20 backdrop-blur-xl 
                        p-3 sm:p-4 rounded-2xl text-sm sm:text-base
                      "
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

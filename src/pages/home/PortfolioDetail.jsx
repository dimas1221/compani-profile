import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

export default function PortfolioDetail() {
  const { id } = useParams();
  const { lang } = useI18n();

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch portfolio data
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

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading…</div>;
  }

  const item = portfolio.find((x) => x.id === id);

  if (!item) {
    return (
      <div className="text-center py-20 text-2xl">Portfolio item not found</div>
    );
  }

  // Pilih bahasa sesuai lang context
  const title = item[`title_${lang}`] || item.title_en;
  const desc = item[`desc_${lang}`] || item.desc_en;

  // Gallery fallback (jika tidak ada gallery, gunakan gambar utama tiga kali)
  const gallery = item.gallery?.length ? item.gallery : [item.image];

  return (
    <div className="w-full pb-24 px-4">
      {/* HERO IMAGE SLIDER */}
      <section className="w-full overflow-hidden">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar gap-6 py-8 px-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#60a5fa transparent',
          }}
        >
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="
                min-w-[88%] md:min-w-[55%]
                backdrop-blur-xl rounded-3xl overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                bg-white/5 dark:bg-white/10
                cursor-grab
                active:cursor-grabbing
              "
            >
              <img
                src={img}
                alt={`${title} slide ${i + 1}`}
                className="w-full h-72 md:h-[480px] object-cover"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="max-w-4xl mx-auto px-6 mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight dark:text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {desc}
        </motion.p>

        {/* Premium Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-14"></div>

        {/* Additional content area for potential expansions */}
        {/* For example: project details, tech stack, client info, etc. */}
      </section>
    </div>
  );
}

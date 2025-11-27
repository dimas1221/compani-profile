import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  LayoutGroup,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';

export default function PortfolioSection() {
  const { lang } = useI18n();
  const [portfolioData, setPortfolioData] = useState([]);
  const [gridCols, setGridCols] = useState(1);
  const [layoutMode] = useState('masonry'); // fixed masonry
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // fetch portfolio data
  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => setPortfolioData(data.portfolio || []))
      .catch((err) => console.error('Failed to load portfolio:', err));
  }, []);

  // pagination logic
  const totalItems = portfolioData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [pageSize, totalPages]);

  const startIdx = (page - 1) * pageSize;
  const visibleItems = portfolioData.slice(startIdx, startIdx + pageSize);

  return (
    <section
      className="w-full py-24 relative overflow-hidden
      bg-gradient-to-b from-white via-white to-white
      dark:from-black dark:via-black/90 dark:to-black"
      aria-label="Portfolio"
    >
      {/* soft glow */}
      <div
        className="absolute inset-0 pointer-events-none
        bg-gradient-radial from-white/30 via-transparent to-transparent
        dark:from-white/10"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header + controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 font-clash">
            {lang === 'id' ? 'Portofolio' : 'Portfolio'}
          </h3>

          <div className="flex gap-3 items-center">
            {/* pageSize selector */}
            <label className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {lang === 'id' ? 'Per halaman' : 'Per page'}
              </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="px-3 py-2 rounded-lg bg-white dark:bg-white/6 backdrop-blur-md border border-white/20 dark:border-white/8 text-sm text-primary-500"
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
            </label>
          </div>
        </div>

        {/* LayoutGroup enables smooth morphing */}
        <LayoutGroup>
          {/* Desktop / Tablet grid or masonry */}
          <div
            className="hidden md:block"
            aria-hidden={false}
            style={{
              columnCount: gridCols,
              columnGap: '1.75rem',
            }}
          >
            {visibleItems.map((item, idx) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={idx}
                layoutMode={layoutMode}
                navigate={navigate}
                lang={lang}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Mobile slider — responsive dan snap */}
        <div
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar mt-6"
          style={{ scrollPaddingLeft: '1rem' }}
        >
          {visibleItems.map((item) => (
            <div
              className="snap-center flex-shrink-0 w-[85vw] max-w-xs"
              key={item.id}
            >
              <PortfolioCard
                item={item}
                layoutMode="grid"
                navigate={navigate}
                lang={lang}
              />
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg bg-white/60 dark:bg-white/6 border border-white/20 dark:border-white/8 text-sm disabled:opacity-40"
            >
              {lang === 'id' ? 'Sebelumnya' : 'Prev'}
            </button>

            <div className="px-3 py-2 rounded-lg text-sm bg-transparent">
              {lang === 'id' ? 'Halaman' : 'Page'}{' '}
              <span className="font-semibold mx-1">{page}</span> / {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg bg-white/60 dark:bg-white/6 border border-white/20 dark:border-white/8 text-sm disabled:opacity-40"
            >
              {lang === 'id' ? 'Berikutnya' : 'Next'}
            </button>
          </div>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                aria-label={`Go to page ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  page === i + 1
                    ? 'bg-sky-600 shadow-[0_6px_18px_rgba(99,102,241,0.24)]'
                    : 'bg-gray-300/60 dark:bg-gray-600/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------
   Premium Card (tilt + reflection + reveal)
   ------------------------- */
function PortfolioCard({ item, index, navigate, layoutMode, lang }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const isPointerFine =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;

  const rotateX = useTransform(my, [-80, 80], [12, -12]);
  const rotateY = useTransform(mx, [-80, 80], [-12, 12]);
  const tx = useTransform(mx, [-80, 80], [-10, 10]);
  const ty = useTransform(my, [-80, 80], [-8, 8]);
  const depthBlur = useTransform(mx, [-80, 80], [6, 18]);
  const blurFilter = useTransform(depthBlur, (v) => `blur(${v}px)`);

  const reflectX = useTransform(mx, [-80, 80], ['10%', '90%']);
  const reflectY = useTransform(my, [-80, 80], ['15%', '85%']);

  useEffect(() => {
    if (!ref.current || !isPointerFine) return;

    const el = ref.current;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left - r.width / 2;
      const py = e.clientY - r.top - r.height / 2;
      mx.set(px);
      my.set(py);
    }
    function onLeave() {
      mx.set(0);
      my.set(0);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, isPointerFine, mx, my]);

  const reveal = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={reveal.transition}
      onClick={() => navigate(`/portfolio/${item.id}`)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
        rotateX,
        rotateY,
      }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer
        bg-white/60 dark:bg-white/5 backdrop-blur-xl
        border border-white/30 dark:border-white/10 shadow-xl
        transition-all duration-500
        ${layoutMode === 'masonry' ? 'mb-8 break-inside-avoid' : ''}
        ${layoutMode === 'dribbble' && index === 0 ? 'h-[480px]' : ''}
      `}
    >
      <motion.div
        style={{
          filter: blurFilter,
          translateX: tx,
          translateY: ty,
        }}
        className="absolute -inset-6 rounded-3xl bg-black/6 opacity-0 group-hover:opacity-60 pointer-events-none"
      />

      <motion.div
        style={{
          left: reflectX,
          top: reflectY,
        }}
        className="pointer-events-none absolute w-44 h-28 rounded-full mix-blend-screen opacity-0 group-hover:opacity-50 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute inset-0 rounded-3xl border border-white/16 dark:border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
      </div>

      <motion.img
        layout="position"
        src={item.image}
        alt={lang === 'id' ? item.title_id : item.title_en}
        className={`w-full object-cover transition-all duration-700
          ${
            layoutMode === 'dribbble' && index === 0
              ? 'h-[480px]'
              : 'h-64 md:h-72'
          }
        `}
        style={{
          transform: `translateZ(0)`,
        }}
      />

      <div className="p-6 relative z-10">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {lang === 'id' ? item.title_id : item.title_en}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
          {lang === 'id' ? item.desc_id : item.desc_en}
        </p>
      </div>
    </motion.article>
  );
}

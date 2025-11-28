import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimation,
} from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';

function ImageWithSkeleton({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse w-14 h-14 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function PortfolioSection({
  autoPlay = true,
  autoPlayInterval = 6500,
}) {
  const [portfolioData, setPortfolioData] = useState([]);
  const [perSlide, setPerSlide] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  // Hooks (HARUS di top level)
  const dragPointX = useMotionValue(0);
  const parallaxOffset = useTransform(dragPointX, [-400, 400], [-25, 25]);
  const parallaxSpring = useSpring(parallaxOffset, {
    stiffness: 140,
    damping: 25,
  });
  const controls = useAnimation();
  const trackRef = useRef(null);

  // Hook magnetic konsisten (tidak di map)
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const magSpringX = useSpring(magX, { stiffness: 120, damping: 14 });
  const magSpringY = useSpring(magY, { stiffness: 120, damping: 14 });

  // Load JSON data
  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((json) => setPortfolioData(json.portfolio || []))
      .catch((err) => console.error('Failed to load portfolio:', err));
  }, []);

  // Detect mobile & lock 1 perSlide
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setItemsPerSlide(mobile ? 1 : perSlide);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [perSlide]);

  // Create slides
  const slides = useMemo(() => {
    const count = itemsPerSlide || 1;
    const output = [];
    for (let i = 0; i < portfolioData.length; i += count) {
      output.push(portfolioData.slice(i, i + count));
    }
    return output.length ? output : [[]];
  }, [portfolioData, itemsPerSlide]);

  const triplicated = useMemo(
    () => [...slides, ...slides, ...slides],
    [slides]
  );

  const [index, setIndex] = useState(slides.length);
  const widthRef = useRef(0);

  // Measure width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      widthRef.current = trackRef.current.getBoundingClientRect().width;
      controls.set({ x: -index * widthRef.current });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [index]);

  const moveTo = async (newIndex) => {
    const w = widthRef.current || 1;
    await controls.start({ x: -newIndex * w });
    setIndex(newIndex);

    const chunk = slides.length;
    if (newIndex < chunk) setIndex(newIndex + chunk);
    if (newIndex >= chunk * 2) setIndex(newIndex - chunk);
  };

  const next = () => moveTo(index + 1);
  const prev = () => moveTo(index - 1);

  // Autoplay desktop/tablet only
  useEffect(() => {
    if (!autoPlay || isMobile) return;
    const auto = setInterval(next, autoPlayInterval);
    return () => clearInterval(auto);
  }, [index, autoPlay, autoPlayInterval, isMobile]);

  // Magnetic effect handler
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    magX.set(mx * 0.1);
    magY.set(my * 0.1);
  };
  const handleMagneticLeave = () => {
    magX.set(0);
    magY.set(0);
  };

  // ratio konsisten
  const gridCols =
    itemsPerSlide === 1
      ? 'grid-cols-1'
      : itemsPerSlide === 2
      ? 'grid-cols-2 md:grid-cols-2'
      : 'grid-cols-3 md:grid-cols-3';

  return (
    <section className="w-full px-4 mt-5">
      {/* header */}
      <div className="text-center mb-10">
        <GlobalSectionTitle
          title={lang === 'en' ? 'Our Portfolio' : 'Portfolio Kami'}
          subtitle={
            lang === 'id'
              ? 'Solusi Pengawasan AI Premium'
              : 'Premium AI Surveillance Solutions'
          }
        />
        {!isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPerSlide(n)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  perSlide === n
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {n}/slide
              </button>
            ))}
          </div>
        )}
      </div>

      {/* carousel container */}
      <div className="relative overflow-hidden rounded-2xl max-w-6xl mx-auto">
        {/* blur edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

        {/* arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white px-3 py-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white px-3 py-2 rounded-full"
        >
          ›
        </button>

        {/* track */}
        <motion.div
          ref={trackRef}
          className="flex will-change-transform"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(e, info) => dragPointX.set(info.point.x)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) next();
            if (info.offset.x > 50) prev();
            else moveTo(index);
          }}
          animate={controls}
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: '100%',
          }}
        >
          {triplicated.map((slideChunk, si) => (
            <div key={si} className="min-w-full px-2">
              <motion.div
                className={`grid gap-6 ${gridCols}`}
                style={{ x: parallaxSpring }}
              >
                {slideChunk.map((item, ii) => {
                  const title = lang === 'id' ? item.title_id : item.title_en;
                  const desc = lang === 'id' ? item.desc_id : item.desc_en;

                  return (
                    <motion.div
                      key={item.id}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                      style={{ x: magSpringX, y: magSpringY }}
                      onClick={() => navigate(`/portfolio/${item.id}`)}
                      className="
                        flex flex-col grow bg-gray-50 dark:bg-gray-900
                        border border-gray-200 dark:border-gray-800
                        shadow-md hover:shadow-2xl transition-all
                        rounded-2xl overflow-hidden cursor-pointer
                      "
                    >
                      {/* IMAGE PART ⬇️ Anda bisa edit max-height di sini saat slide=1 */}
                      <div
                        className={`w-full aspect-[16/10] relative ${
                          itemsPerSlide === 1
                            ? 'h-32 md:h-[80vh] max-h-[520px]'
                            : ''
                        }`}
                      >
                        <ImageWithSkeleton src={item.image} alt={title} />
                      </div>
                      {/* IMAGE PART ⬆️ Anda bisa edit di sini */}

                      {/* body */}
                      <div className="p-5 flex flex-col grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[40px]">
                          {desc}
                        </p>
                        <span className="mt-auto text-xs tracking-widest text-blue-600 dark:text-blue-400 uppercase pt-4">
                          {t.section_portfolio?.label || 'AI SECURITY'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* dots */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => moveTo(slides.length + i)}
              className={`h-2 transition-all rounded-full ${
                index % slides.length === i
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 dark:bg-gray-700 w-2'
              }`}
              animate={{ scale: index % slides.length === i ? 1.4 : 1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

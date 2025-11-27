import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
/**
 * PortfolioSection Carousel:
 * - itemsPerSlide: 1/2/3 (mobile always 1)
 * - infinite drag/swipe via triplicated slides
 * - autoplay
 * - fade-edge overlays
 * - lazy images + skeleton
 */

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
  // optional props
  autoPlay = true,
  autoPlayInterval = 3500, // ms
}) {
  const [portfolioData, setPortfolioData] = useState([]);
  const [perSlide, setPerSlide] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  // --- load data
  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((json) => setPortfolioData(json.portfolio || []))
      .catch((err) => console.error('Failed to load portfolio:', err));
  }, []);

  // --- responsive detection
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

  // --- build slides (array of arrays)
  const slides = useMemo(() => {
    const count = itemsPerSlide || 1;
    const out = [];
    for (let i = 0; i < portfolioData.length; i += count) {
      out.push(portfolioData.slice(i, i + count));
    }
    // if no slides (empty), ensure at least one empty slide
    return out.length ? out : [[]];
  }, [portfolioData, itemsPerSlide]);

  // --- infinite technique: duplicate slides three times and start at middle chunk
  const triplicated = useMemo(
    () => [...slides, ...slides, ...slides],
    [slides]
  );

  // controls & refs
  const controls = useAnimation();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(slides.length); // start at middle chunk
  const slideWidthRef = useRef(0);

  // update index when slides length change -> reset to middle
  useEffect(() => {
    setIndex(slides.length);
  }, [slides.length]);

  // measure slide width (container width)
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const parent = trackRef.current.getBoundingClientRect();
      // For grid of N columns, each visible slide group width equals parent's width
      slideWidthRef.current = parent.width;
      // Immediately jump to the correct x
      const x = -index * slideWidthRef.current;
      controls.set({ x });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [index, controls]);

  // moveTo helper
  const moveTo = async (newIndex, opts = { animate: true }) => {
    if (!trackRef.current) return;
    const w =
      slideWidthRef.current ||
      trackRef.current.getBoundingClientRect().width ||
      1;
    const x = -newIndex * w;
    if (opts.animate) {
      await controls.start({
        x,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      });
    } else {
      controls.set({ x });
    }
    setIndex(newIndex);

    // if we're too close to edges, teleport back to middle equivalent
    // left edge threshold: < slides.length/2, right edge: >= slides.length*2 + something
    const chunk = slides.length;
    if (newIndex < chunk) {
      // teleport forward by +chunk
      const teleIndex = newIndex + chunk;
      controls.set({ x: -teleIndex * w });
      setIndex(teleIndex);
    } else if (newIndex >= chunk * 2) {
      // teleport backward by -chunk
      const teleIndex = newIndex - chunk;
      controls.set({ x: -teleIndex * w });
      setIndex(teleIndex);
    }
  };

  // next / prev
  const next = () => moveTo(index + 1);
  const prev = () => moveTo(index - 1);

  // autoplay
  useEffect(() => {
    if (!autoPlay || isMobile) return; // don't autoplay on mobile per requirement
    const iv = setInterval(() => {
      next();
    }, autoPlayInterval);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay, autoPlayInterval, isMobile, slides.length]);

  // drag handling: determine where to snap based on drag offset on release
  const onDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // if drag left (negative) -> next. right (positive) -> prev.
    // threshold: 50 px or velocity
    if (offsetX < -50 || velocityX < -400) {
      next();
    } else if (offsetX > 50 || velocityX > 400) {
      prev();
    } else {
      // small drag -> snap back
      moveTo(index);
    }
  };

  // keyboard left/right
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Styling helpers
  const gridColsClass =
    itemsPerSlide === 1
      ? 'grid-cols-1'
      : itemsPerSlide === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <section className="w-full px-4 py-16 ">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <GlobalSectionTitle
          title={lang === 'en' ? 'Our Portfolio' : 'Portofolio Kami'}
          subtitle={
            lang === 'en'
              ? 'Premium intelligent surveillance & monitoring solutions'
              : 'Solusi pengawasan & pemantauan cerdas premium'
          }
        />
        {/* controls (disabled on mobile) */}
        {!isMobile && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setPerSlide(n);
                  setItemsPerSlide(n);
                  // reset index to middle chunk after changing layout
                  setTimeout(() => setIndex(slides.length), 40);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  perSlide === n
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                {n} / slide
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Carousel area */}
      <div className="relative mx-auto">
        {/* Fade edge overlays */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 lg:w-36 z-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,12,17,1) 0%, rgba(10,12,17,0.0) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 lg:w-36 z-20"
          style={{
            background:
              'linear-gradient(270deg, rgba(10,12,17,1) 0%, rgba(10,12,17,0.0) 100%)',
          }}
        />

        {/* Prev / Next Buttons */}
        {/* {!isMobile && (
          <> */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-gray-900/80 shadow-lg hover:scale-105 transition"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-gray-900/80 shadow-lg hover:scale-105 transition"
        >
          ›
        </button>
        {/* </>
        )} */}

        {/* TRACK: a motion.div that translates horizontally */}
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // allow free drag, we'll control snap logic
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            animate={controls}
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: '100%',
            }}
            className="will-change-transform"
            onDoubleClick={() => {
              /* noop */
            }}
          >
            {/* render triplicated slides. each "slide" is a grid of itemsPerSlide */}
            {triplicated.map((slideChunk, si) => {
              // ensure slideChunk is an array of items (may be empty)
              const arrayChunk = Array.isArray(slideChunk) ? slideChunk : [];
              return (
                <div key={`chunk-${si}`} className={`w-full px-3 py-1`}>
                  <div className={`grid gap-6 ${gridColsClass}`}>
                    {arrayChunk.map((item, ii) => {
                      const title =
                        lang === 'id' ? item.title_id : item.title_en;
                      const desc = lang === 'id' ? item.desc_id : item.desc_en;
                      return (
                        <div
                          key={item.id + '-' + ii + '-' + si}
                          onClick={() => navigate(`/portfolio/${item.id}`)}
                          className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition"
                          style={{ minHeight: 240 }}
                        >
                          <div className="w-full aspect-[16/10]">
                            <ImageWithSkeleton src={item.image} alt={title} />
                          </div>

                          <div className="p-5">
                            <h3 className="text-lg font-semibold line-clamp-1">
                              {title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {desc}
                            </p>
                          </div>

                          {/* mini gallery for non-mobile when available */}
                          {!isMobile &&
                            item.gallery &&
                            Array.isArray(item.gallery) && (
                              <div className="px-5 pb-5 grid grid-cols-4 gap-2">
                                {item.gallery.slice(0, 4).map((g, gi) => (
                                  <img
                                    key={gi}
                                    src={g.image}
                                    alt=""
                                    className="h-10 w-full object-cover rounded-md"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* DOTS */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => {
            // compute representative index located at middle chunk + i
            const rep = slides.length + i;
            const active = index % slides.length === i;
            return (
              <button
                key={`dot-${i}`}
                onClick={() => moveTo(rep)}
                className={`w-2 h-2 rounded-full transition-all ${
                  active ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

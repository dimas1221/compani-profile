import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Premium Split Feature Section
 * - magnetic scroll fade (whileInView staggered)
 * - glass cards with blue galaxy glow
 * - parallax 3D tilt on desktop (mouse)
 *
 * Props:
 *  - items: array of feature items { id, image, title_en, title_id, desc_en, desc_id, tag }
 *  - lang: 'en' | 'id'
 */
export default function SplitFeatureSectionPremium({
  items = [],
  lang = 'en',
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="space-y-20">
        {items.map((item, i) => (
          <FeatureRow key={item.id ?? i} item={item} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
}

/* ------------------
   Helper / Row component
   ------------------ */
function FeatureRow({ item, index, lang }) {
  const title = lang === 'id' ? item.title_id : item.title_en;
  const desc = lang === 'id' ? item.desc_id : item.desc_en;
  const image = item.image;
  const imageFirst = index % 2 === 0;

  // parallax / tilt state
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tz: 0 });
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    // only enable tilt for pointer devices
    const mql = window.matchMedia && window.matchMedia('(pointer:fine)');
    setIsHoverable(mql ? mql.matches : true);

    const handler = (e) => setIsHoverable(e.matches);
    if (mql && mql.addEventListener) mql.addEventListener('change', handler);
    return () =>
      mql &&
      mql.removeEventListener &&
      mql.removeEventListener('change', handler);
  }, []);

  // mouse move -> calculate tilt
  function handleMouseMove(e) {
    if (!cardRef.current || !isHoverable) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 12; // rotateY
    const rx = (py - 0.5) * -8; // rotateX
    const tz = 6 + (0.5 - Math.abs(px - 0.5)) * 12; // pop Z
    setTilt({ rx, ry, tz });
  }
  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0, tz: 0 });
  }

  // magnetic scroll fade animation (staggered)
  const appear = {
    hidden: { opacity: 0, y: 28, scale: 0.995 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.12,
        duration: 0.7,
        ease: [0.2, 0.9, 0.3, 1],
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      custom={index}
      variants={appear}
      className={clsx(
        'flex flex-col lg:flex-row items-center gap-8 lg:gap-12',
        imageFirst ? '' : 'lg:flex-row-reverse'
      )}
    >
      {/* IMAGE / VISUAL */}
      <div className="w-full lg:w-1/2">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: 1200,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* glass card container with blue galaxy glow backdrop */}
          <motion.div
            className="
              relative
              rounded-2xl
              overflow-hidden
              bg-white/6 dark:bg-white/4
              border border-white/6 dark:border-white/8
              backdrop-blur-md
              shadow-[0_20px_50px_rgba(10,20,60,0.25)]
              transition-all duration-500
            "
            style={{
              transform: `translateZ(${tilt.tz}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
            whileHover={{}}
          >
            {/* Image with subtle parallax */}
            <motion.img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover block rounded-2xl"
              style={{
                transform: `translateZ(${tilt.tz / 6}px)`,
              }}
            />

            {/* blue galaxy glow (absolute) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                mixBlendMode: 'screen',
              }}
            >
              <div
                className="absolute -inset-12 rounded-[28px] blur-3xl opacity-60"
                style={{
                  background:
                    'radial-gradient(400px 200px at 10% 20%, rgba(80,140,255,0.18), transparent 20%), radial-gradient(300px 140px at 80% 80%, rgba(140,90,255,0.12), transparent 25%)',
                }}
              />
              {/* soft gloss highlight */}
              <div
                className="absolute top-0 left-0 w-full h-1/3 opacity-10"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06), transparent)',
                }}
              />
            </div>

            {/* subtle inner shine for dynamic glass */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                mixBlendMode: 'overlay',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* TEXT */}
      <div className="w-full lg:w-1/2">
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-50 leading-snug tracking-tight"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 text-gray-600 dark:text-gray-300 text-[17px] leading-[1.75] tracking-wide"
          style={{
            textAlign: 'left',
            maxWidth: '60ch',
          }}
        >
          {desc}
        </motion.p>

        {item.tag && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="inline-block mt-5 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary backdrop-blur-sm shadow-sm"
          >
            {item.tag}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

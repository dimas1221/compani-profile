import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlobalSectionTitle from './GlobalSectionTitle';
import PremiumJustifiedParagraph from './PremiumJustifiedParagraph';

export default function GlobalSplitShowcase({
  title,
  paragraph,
  image,
  reverse = false,
  imageAlt = '',
  className = '',
}) {
  /* ===== PARALLAX LOGIC ===== */
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tz: 0 });
  const [hoverable, setHoverable] = useState(false);

  // Enable tilt only on mouse devices
  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setHoverable(media.matches);
    const listener = (e) => setHoverable(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  function onMove(e) {
    if (!hoverable || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    const ry = (x - 0.5) * 16;
    const rx = (y - 0.5) * -12;
    const tz = 20 + (0.5 - Math.abs(x - 0.5)) * 18;

    setTilt({ rx, ry, tz });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0, tz: 0 });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className={`w-full mb-32 px-5 ${className}`}
    >
      <div
        className={`
          max-w-7xl mx-auto
          flex flex-col md:flex-row
          items-start md:items-center
          gap-16 md:gap-24
          ${reverse ? 'md:flex-row-reverse' : ''}
        `}
      >
        {/* ===== IMAGE SIDE ===== */}
        <div className="w-full md:w-1/2">
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <motion.div
              className="
                relative rounded-3xl overflow-hidden
                bg-white/10 dark:bg-white/5
                backdrop-blur-2xl
                border border-white/20 dark:border-white/10
                shadow-[0_25px_70px_rgba(0,0,0,0.22)]
                dark:shadow-[0_25px_70px_rgba(0,0,0,0.75)]
                transition-all duration-500
              "
              style={{
                transform: `translateZ(${tilt.tz}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                willChange: 'transform',
              }}
            >
              {/* Aura Glow */}
              <div
                className="
                  absolute -inset-10 opacity-70 mix-blend-soft-light pointer-events-none
                "
                style={{
                  background:
                    'radial-gradient(480px at 20% 20%, rgba(120,180,255,0.28), transparent 55%), radial-gradient(420px at 80% 75%, rgba(160,110,255,0.22), transparent 60%)',
                }}
              />

              {/* Animated subtle border */}
              <motion.div
                className="absolute inset-0 rounded-3xl border border-white/10"
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* HERO IMAGE */}
              <motion.img
                src={image}
                alt={imageAlt || title}
                loading="lazy"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-full h-[240px] md:h-[420px] object-cover rounded-3xl"
                style={{ transform: `translateZ(${tilt.tz / 6}px)` }}
              />

              {/* Gloss Light Sweep */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* ===== TEXT SIDE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="md:w-1/2 space-y-7"
        >
          <GlobalSectionTitle title={title} className="mb-1" />

          <PremiumJustifiedParagraph className="text-[17px] md:text-[18px] leading-relaxed">
            {paragraph}
          </PremiumJustifiedParagraph>
        </motion.div>
      </div>
    </motion.section>
  );
}

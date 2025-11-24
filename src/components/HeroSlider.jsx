import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { useI18n } from "../i18n/I18nProvider";
import { dataSlides } from "./utils/dataObject";
import GlobalButton from "./GlobalButton";
import ParticlesContainer from "./ParticlesContainer";

// pastikan tidak ada spasi di akhir

const slides = dataSlides;

export default function HeroSlider() {
  const { darkMode } = useApp();
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[idx];
  const imageSrc = darkMode ? currentSlide.imageDark : currentSlide.image;

  return (
    <section
      className="relative w-full font-[Inter] overflow-hidden"
      style={{ height: "85vh" }}
    >
      {/* Background Image with Motion */}
      <AnimatePresence mode="wait">
        <motion.img
          key={imageSrc}
          src={imageSrc}
          alt={currentSlide.alt}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70 dark:from-black/40 dark:via-black/60 dark:to-black/80" />

      {/* Particles Background */}
      <ParticlesContainer />

      {/* Floating Ambient Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-400/20 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-400/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Section */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-6">
        <motion.h2
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight font-clash"
        >
          {t.title_main}
        </motion.h2>

        <motion.p
          key={`desc-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-5 text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed font-light"
        >
          {t.description_main}
        </motion.p>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Bottom Blur Transition */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50/40 dark:from-gray-950/60 to-transparent backdrop-blur-sm" />
    </section>
  );
}

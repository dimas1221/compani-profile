import React, { useEffect, useState, useRef } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import DesignGlobal1 from "../../components/DesignGlobal1";
import "./stylePrinciple.css";

export default function Principle() {
  const { lang } = useI18n();

  const [heroData, setHeroData] = useState(null);
  const [itemsData, setItemsData] = useState(null);
  const bgRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // Load HERO / TEXT
  useEffect(() => {
    import("../../data/principle.json")
      .then((res) => setHeroData(res.default[lang]))
      .catch((err) => console.error("Failed to load principle.json", err));
  }, [lang]);

  // Load ITEMS
  useEffect(() => {
    import("../../../public/data/principle_items.json")
      .then((res) => setItemsData(res.default.principle_items))
      .catch((err) =>
        console.error("Failed to load principle_items.json", err)
      );
  }, []);

  // lightweight scroll blur indicator (debounced)
  useEffect(() => {
    function onScroll() {
      if (!bgRef.current) return;
      bgRef.current.classList.add("scrolling");
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        if (bgRef.current) bgRef.current.classList.remove("scrolling");
      }, 120);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  if (!heroData || !itemsData) return null;

  // Map items (image-based, multilingual)
  const mappedItems = itemsData.map((item) => ({
    id: item.id,
    image: item.image,
    title: lang === "id" ? item.title_id : item.title_en,
    subtitle: lang === "id" ? item.subtitle_id : item.subtitle_en,
  }));

  const bgHero = "/images/logo/principle.jpg";
  const bgHeroMain = "/images/hero/hero3.jpg";

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section
        className="premium-bg relative w-full min-h-[90vh] overflow-hidden flex flex-col md:flex-row items-start md:items-center bg-black"
        aria-label="Principle hero"
      >
        {/* Noise & Particles (CSS ::before) */}
        {/* Parallax background */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform animate-bgParallax"
          style={{ backgroundImage: `url(${bgHeroMain})` }}
        />

        {/* ================= HERO CARD (LEFT on desktop / TOP on mobile) ================= */}
        <div
          className="
            hero-card
            relative z-[5]
            w-[92%] md:w-auto mx-auto mt-8 md:mt-0
            px-6 py-6 md:px-10 md:py-10
            text-center md:text-left
            max-w-md md:max-w-xl
            md:absolute md:left-[6%] md:top-[44%] md:-translate-y-1/2
            tilt-card
          "
          role="region"
          aria-label="Principle hero card"
        >
          {/* glass shine */}
          <div className="glass-shine" />

          {/* reflection */}
          <div className="hero-reflection" aria-hidden="true" />

          <h1 className="text-3xl md:text-5xl text-white font-semibold leading-tight drop-shadow-2xl neon-transforme">
            {heroData.hero_title}
          </h1>

          <p className="mt-3 md:mt-4 text-base md:text-xl text-white/90 font-light tracking-wide">
            {heroData.hero_subtitle}
          </p>

          <p className="mt-3 md:mt-6 text-sm md:text-lg text-white/80 leading-relaxed">
            {heroData.hero_desc}
          </p>
        </div>

        {/* ================= RIGHT IMAGE (FLOATING PREMIUM) ================= */}
        <div
          className="hero-image-wrap w-full relative flex justify-center md:block mt-6 md:mt-0 z-[3] pointer-events-none"
          aria-hidden="true"
        >
          <img
            src={bgHero}
            alt="Principle Visual"
            className="
              object-contain opacity-95
              w-[78%] sm:w-[62%] md:w-[45%] lg:w-[28%]
              drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              md:absolute md:right-[3%] md:bottom-0
              animate-premiumFloat
            "
          />
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="mt-20 px-4 md:px-0">
        <DesignGlobal1 items={mappedItems} useIcon={false} />
      </div>
    </div>
  );
}

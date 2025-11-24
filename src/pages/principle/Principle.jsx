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
  const desmaxVisionEn = `Maxvision Technology Corp. is a listed enterprise on the Main Board of Shenzhen Stock Exchange (stock code "002990"), with its headquarters in Shenzhen City, Guangdong Province, China. It is also a national high-tech company engaged in the research of artificial intelligence, big data, Internet of Things, and other new-generation information technologies, which provides users with intelligent products and "Al+Industry" solutions in line with future trends, and serves the overall construction of a smart society.The company has a team of hundreds of people working on hardware and software development and artificial intelligence algorithm research, with R&D staff accounting for over 50% of the company's total headcount. The software and hardware products formed for sale amount to more than 400 kinds. The company's annual investment in research and development accounts for more than 10% of its turnover.Over the years, Maxvision Technology Corp. has won numerous national and provincial scientific and technological achievements and invention patents, and has been recognized as a national high-tech enterprise, a national innovative enterprise, and a Guangdong provincial enterprise technology center.`;
  const desmaxVisionIn = `Maxvision Technology Corp. adalah perusahaan yang terdaftar di Papan Utama Bursa Efek Shenzhen (kode saham "002990"), dengan kantor pusat di Kota Shenzhen, Provinsi Guangdong, Tiongkok. Perusahaan ini juga merupakan perusahaan teknologi tinggi nasional yang bergerak di bidang riset kecerdasan buatan, data besar, Internet of Things, dan teknologi informasi generasi baru lainnya, yang menyediakan produk-produk cerdas dan solusi "Al+Industry" yang sejalan dengan tren masa depan kepada para pengguna, serta mendukung pembangunan masyarakat cerdas secara menyeluruh.
Perusahaan ini memiliki tim yang terdiri dari ratusan orang yang bekerja di bidang pengembangan perangkat keras dan perangkat lunak serta riset algoritma kecerdasan buatan, dengan staf Litbang mencakup lebih dari 50% dari total karyawan perusahaan. Produk perangkat lunak dan perangkat keras yang dipasarkan berjumlah lebih dari 400 jenis. Investasi tahunan perusahaan dalam penelitian dan pengembangan menyumbang lebih dari 10% dari omzetnya.`;
  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section
        className="premium-bg relative w-full min-h-[90vh] overflow-hidden flex flex-col md:flex-row items-start md:items-center bg-black"
        aria-label="Principle hero"
      >
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
            relative z-[20]
            w-[92%] md:w-auto mx-auto mt-8 md:mt-0
            px-6 py-6 md:px-10 md:py-10
            text-center md:text-left
            max-w-md md:max-w-xl
            md:absolute md:left-[6%] md:top-[50%] md:-translate-y-1/2
            tilt-card
          "
          role="region"
          aria-label="Principle hero card"
        >
          {/* glass shine */}
          <div className="glass-shine" />

          {/* reflection */}
          <div className="hero-reflection" aria-hidden="true" />

          <h1 className="text-3xl md:text-5xl text-white font-semibold leading-tight drop-shadow-2xl neon-transforme font-clash">
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
          className="hero-image-wrap w-full relative flex justify-center md:block mt-6 md:mt-0 z-[10] pointer-events-none md:absolute md:right-[6%] md:bottom-0 md:left-auto"
          aria-hidden="true"
        >
          <img
            src={bgHero}
            alt="Principle Visual"
            className="
              object-contain opacity-95
              hero-visual
              drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              
              animate-premiumFloat
              rounded-lg
            "
          />
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="mt-20 px-4 md:px-0">
        <DesignGlobal1
          items={mappedItems}
          useIcon={false}
          useImage={true}
          title={"Maxvison"}
          subtitle={lang === "id" ? desmaxVisionIn : desmaxVisionEn}
        />
      </div>
    </div>
  );
}

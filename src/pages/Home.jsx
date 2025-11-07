import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeatureCard from "../components/FeatureCard";
import ProductCarousel from "../components/ProductCarousel";
import products from "../data/contoh_response_api.json";
import { translations } from "../i18n/translation";
import GlobalSectionTitle from "../components/GlobalSectionTitle";
import ProductSection from "./ProductSection";
import FeatureSection from "./FeatureSection";
import AboutSection from "./AboutSection";

export default function Home({ lang }) {
  const t = translations[lang] || translations.en;

  // example stats (keys and labels via translations)
  const stats = [
    {
      key: "happyClients",
      label: lang === "en" ? "Happy clients" : "Klien Puas",
      value: 100,
    },
    {
      key: "projects",
      label: lang === "en" ? "Projects completed" : "Proyek selesai",
      value: 328,
    },
    {
      key: "members",
      label: lang === "en" ? "Dedicated members" : "Tim berdedikasi",
      value: 24,
    },
    {
      key: "awards",
      label: lang === "en" ? "Awards won" : "Penghargaan",
      value: 12,
    },
  ];

  return (
    <div className="">
      {/* Hero */}
      <HeroSlider stats={stats} />
      <br />
      <br />
      <br />
      {/* Section 2: Feature cards */}
      <FeatureSection lang={lang} t={t} />

      {/* Section 3: About & Vision */}
      <AboutSection lang={lang} t={t} />

      {/* Section 4: Product carousel */}
      <ProductSection products={products} lang={lang} />
    </div>
  );
}

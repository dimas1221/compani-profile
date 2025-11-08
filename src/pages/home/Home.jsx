import React from "react";
import HeroSlider from "../../components/HeroSlider";
import products from "../../data/contoh_response_api.json";
import { translations } from "../../i18n/translation";
import FeatureSection from "./FeatureSection";
import ProductSection from "./ProductSection";
import AboutSection from "./AboutSection";
import { dataStats } from "../../components/utils/dataObject";

export default function Home() {
  // example stats (keys and labels via translations)
  const stats = dataStats;

  return (
    <div className="">
      {/* Hero */}
      <HeroSlider stats={stats} />
      <br />
      <br />
      <br />
      {/* Section 2: Feature cards */}
      <FeatureSection />

      {/* Section 3: About & Vision */}
      <AboutSection />

      {/* Section 4: Product carousel */}
      <ProductSection products={products} />
    </div>
  );
}

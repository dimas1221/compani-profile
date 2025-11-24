import React, { useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider';
import { translations } from '../../i18n/translation';
import FeatureSection from './FeatureSection';
import ProductSection from './ProductSection';
import AboutSection from './AboutSection';
import { dataStats } from '../../components/utils/dataObject';
import PartnerSection from './PartnerSection';

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  // example stats (keys and labels via translations)
  const stats = dataStats;

  return (
    <div className="">
      {/* Hero */}
      <HeroSlider stats={stats} />
      <br />
      <br />
      <br />
      {/* Section 3: About & Vision */}
      <AboutSection />
      <br />
      {/* Section 2: Feature cards */}
      <FeatureSection />
      <br />
      <PartnerSection />
      <br />
      {/* Section 4: Product carousel */}
      <ProductSection />
    </div>
  );
}

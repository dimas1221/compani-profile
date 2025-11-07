import React from "react";
import GlobalSectionTitle from "../components/GlobalSectionTitle";
import { featuresData } from "../components/utils/dataObject";
import FeatureCard from "../components/FeatureCard";

export default function FeatureSection({ lang, t }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-14 mb-14">
      <GlobalSectionTitle
        title={t.ourApproach}
        subtitle={t.ourApproach_subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={lang === "en" ? feature.title_en : feature.title_id}
            subtitle={lang === "en" ? feature.subtitle_en : feature.subtitle_id}
            image={feature.image}
          />
        ))}
      </div>
    </section>
  );
}

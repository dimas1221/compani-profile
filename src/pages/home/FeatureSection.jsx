import React from "react";
import FeatureCard from "../../components/FeatureCard";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";
import { featuresData } from "../../components/utils/dataObject";
import { useI18n } from "../../i18n/I18nProvider";

export default function FeatureSection() {
  const { lang, setLang, t } = useI18n();
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-700">
      <GlobalSectionTitle
        title={t.ourApproach}
        subtitle={t.ourApproach_subtitle}
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={lang === "en" ? feature.title_en : feature.title_id}
              subtitle={
                lang === "en" ? feature.subtitle_en : feature.subtitle_id
              }
              image={feature.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

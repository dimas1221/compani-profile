import React, { useEffect } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import AboutCard from "./AboutCard";

import { Brain, Cpu, Wrench, Shield } from "lucide-react";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";
import TemplateSection from "../../components/TemplateSection";

export default function About() {
  const { t } = useI18n();

  const about = t.aboutPage;
  const services = t.services;

  const serviceCards = [
    {
      icon: Brain,
      title: services.ai_title,
      subs: [services.ai_sub],
    },
    {
      icon: Cpu,
      title: services.iot_title,
      subs: [services.iot_sub],
    },
    {
      icon: Wrench,
      title: services.software_title,
      subs: [services.software_sub],
    },
    {
      icon: Shield,
      title: services.smarthome_title,
      subs: [services.smarthome_sub],
    },
  ];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <TemplateSection showLogo={true} showBlur={true}>
      {/* HERO */}
      <div
        className="
          w-full h-[360px] md:h-[460px] 
          bg-cover bg-center bg-no-repeat 
          rounded-2xl overflow-hidden shadow-xl
        "
        style={{
          backgroundImage: "url('/images/hero/hero3.jpg')",
        }}
      />
      <br />
      <br />
      <GlobalSectionTitle
        title={about.vision_mission_title}
        subtitle={about.vision_mission_desc}
      />
      <GlobalSectionTitle
        title={about.aboutUs_title}
        subtitle={about.aboutUs_desc}
      />

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-6 pt-10
        "
      >
        {serviceCards.map((card, i) => (
          <AboutCard
            key={i}
            icon={card.icon}
            title={card.title}
            subs={card.subs}
          />
        ))}
      </div>
    </TemplateSection>
  );
}

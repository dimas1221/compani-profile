import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";
import GlobalCard from "../../components/GlobalCard";
import {
  ShieldCheck,
  Coins,
  Megaphone,
  Cpu,
  LineChart,
  Users,
  Layers,
  Rocket,
} from "lucide-react";

export default function Principle() {
  const { t } = useI18n();
  const items = t.principle_items;

  const icons = [
    <ShieldCheck />,
    <Users />,
    <Coins />,
    <Megaphone />,
    <Cpu />,
    <LineChart />,
    <Layers />,
    <Rocket />,
  ];

  return (
    <section
      className="
        relative min-h-screen overflow-hidden 
         py-20 sm:py-28 px-6
      "
    >
      {/* === Decorative glow (light mode only) === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl opacity-60 dark:hidden" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-2xl opacity-70 dark:hidden" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* === Title Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlobalSectionTitle
            title={t.principle_title}
            subtitle={t.principle_subtitle}
            className="px-2 sm:px-0"
          />
        </motion.div>

        {/* === Grid of Principles === */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {items.map((item, i) => (
            <GlobalCard
              key={i}
              icon={icons[i]}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </motion.div>

        {/* === Decorative logo background === */}
        <motion.div
          className="
            absolute top-12 right-4 sm:right-10 opacity-[0.08] 
            dark:opacity-[0.07] pointer-events-none select-none
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="/images/logo/ultra_light 1.png"
            alt="decor"
            className="
              w-[220px] sm:w-[340px] md:w-[400px]
              mix-blend-luminosity dark:mix-blend-normal
              opacity-40 dark:opacity-80
              pointer-events-none select-none
            "
          />
        </motion.div>
      </div>
    </section>
  );
}

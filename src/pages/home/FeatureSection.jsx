import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";
import { useI18n } from "../../i18n/I18nProvider";

import { Cpu, Wifi, Home, Server, Code } from "lucide-react";

const features = {
  en: [
    {
      id: 1,
      title: "Artificial Intelligence (AI)",
      desc: "Leverage AI algorithms to automate tasks, gain insights, and drive innovation.",
      icon: <Cpu className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 2,
      title: "Internet of Things (IoT)",
      desc: "Connect and control devices through IoT networks to enable smarter environments.",
      icon: <Wifi className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 3,
      title: "Smart Home System",
      desc: "Integrate devices into a unified smart home ecosystem for safety, comfort, and efficiency.",
      icon: <Home className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 4,
      title: "Software Management",
      desc: "Manage software lifecycles, updates, and deployments to ensure stability and scalability.",
      icon: <Server className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 5,
      title: "Web Development",
      desc: "Build responsive, modern, and high-performance web applications across all devices.",
      icon: <Code className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
    },
  ],

  id: [
    {
      id: 1,
      title: "Kecerdasan Buatan (AI)",
      desc: "Manfaatkan algoritma AI untuk mengotomatisasi tugas, memperoleh wawasan, dan mendorong inovasi.",
      icon: <Cpu className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 2,
      title: "Internet of Things (IoT)",
      desc: "Hubungkan dan kontrol perangkat melalui jaringan IoT untuk menciptakan lingkungan yang lebih cerdas.",
      icon: <Wifi className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 3,
      title: "Sistem Rumah Pintar",
      desc: "Integrasikan berbagai perangkat rumah ke dalam ekosistem pintar untuk keamanan, kenyamanan, dan efisiensi.",
      icon: <Home className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 4,
      title: "Manajemen Perangkat Lunak",
      desc: "Kelola siklus hidup, pembaruan, dan distribusi perangkat lunak agar sistem tetap stabil dan efisien.",
      icon: <Server className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 5,
      title: "Pengembangan Web",
      desc: "Bangun aplikasi web modern yang cepat, responsif, dan dioptimalkan untuk semua perangkat.",
      icon: <Code className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
    },
  ],
};

export default function FeatureSection() {
  const [active, setActive] = useState(5);
  const { lang, t } = useI18n();
  const data = features[lang] || features.en;

  return (
    <section className="relative py-3 transition-colors duration-700 px-6">
      <GlobalSectionTitle
        title={t.ourApproach}
        subtitle={t.ourApproach_subtitle}
      />

      {/* === DESKTOP / TABLET === */}
      <div
        className="hidden sm:flex max-w-7xl mx-auto flex-row gap-3
                   overflow-hidden rounded-[2rem] shadow-xl
                   border border-gray-100 dark:border-gray-800"
      >
        {data.map((f) => {
          const isActive = f.id === active;
          return (
            <motion.div
              key={f.id}
              layout
              onMouseEnter={() => setActive(f.id)}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className={`relative cursor-pointer overflow-hidden
                ${isActive ? "flex-[3]" : "flex-[0.8]"}
                h-[420px] transition-[flex] duration-700 ease-in-out
                rounded-[1.5rem] bg-black/5
              `}
            >
              <motion.img
                src={f.img}
                alt={f.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.75]"
              />
              <div
                className={`absolute inset-0 ${
                  isActive ? "bg-black/30" : "bg-black/60"
                } transition-all duration-700`}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <div className="mb-4 text-white">{f.icon}</div>
                <h3
                  className={`font-bold ${
                    isActive ? "text-2xl" : "text-lg"
                  } text-white transition-all duration-500`}
                >
                  {f.title}
                </h3>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="mt-3 max-w-sm text-sm text-gray-200 leading-relaxed"
                    >
                      {f.desc}
                      <div className="mt-5">
                        <button className="px-5 py-2 border border-white/70 rounded-full text-sm font-medium hover:bg-white hover:text-black transition">
                          {lang === "id"
                            ? "Pelajari lebih lanjut"
                            : "Learn more"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* === MOBILE === */}
      <div
        className="flex sm:hidden flex-col gap-2 max-w-7xl mx-auto 
                   overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 px-3"
      >
        {data.map((f) => {
          const isActive = f.id === active;
          return (
            <motion.div
              key={f.id}
              layout
              onClick={() => setActive(f.id)}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className={`relative cursor-pointer overflow-hidden
                ${isActive ? "h-[260px]" : "h-[120px]"}
                transition-all duration-700 ease-in-out rounded-xl
              `}
            >
              <motion.img
                src={f.img}
                alt={f.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.75]"
              />
              <div
                className={`absolute inset-0 ${
                  isActive ? "bg-black/30" : "bg-black/65"
                } transition-all duration-700`}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <div className="mb-1 text-white scale-90">{f.icon}</div>
                <h3
                  className={`font-semibold ${
                    isActive ? "text-base" : "text-sm"
                  } text-white transition-all duration-500`}
                >
                  {f.title}
                </h3>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 max-w-xs text-xs text-gray-200 leading-relaxed"
                    >
                      {f.desc}
                      <div className="mt-3">
                        <button className="px-3 py-1 border border-white/70 rounded-full text-[11px] hover:bg-white hover:text-black transition">
                          {lang === "id" ? "Pelajari" : "Learn more"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

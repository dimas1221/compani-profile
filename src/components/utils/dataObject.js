import { translations } from "../../i18n/translation";

// Fungsi pembuat menu agar reusable di komponen manapun
export const getMenuItems = (lang = "en") => {
  const t = translations[lang];

  return [
    { name: t.home, path: "/" },
    { name: t.about, path: "/about" },
    { name: t.product, path: "/product" },
    { name: t.solution, path: "/solution" },
    { name: t.contact, path: "/contact" },
  ];
};

export const dataSlides = [
  {
    id: 1,
    image: "/images/hero/hero1.jpg",
    imageDark: "/images/hero/herodark1.png",
    alt: "Hero 1",
  },
  {
    id: 2,
    image: "/images/hero/hero1.jpg",
    imageDark: "/images/hero/herodark1.png",
    alt: "Hero 2",
  },
  {
    id: 3,
    image: "/images/hero/hero1.jpg",
    imageDark: "/images/hero/herodark1.png",
    alt: "Hero 2",
  },
];
// src/data/featuresData.js
export const featuresData = [
  {
    id: "ai",
    title_en: "Artificial Intelligence (AI)",
    title_id: "Kecerdasan Buatan (AI)",
    subtitle_en: "AI solutions for smarter monitoring",
    subtitle_id: "Solusi AI untuk pemantauan cerdas",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "iot",
    title_en: "IoT",
    title_id: "IoT",
    subtitle_en: "Connected sensors & devices",
    subtitle_id: "Sensor & perangkat terhubung",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "software",
    title_en: "Software Management",
    title_id: "Manajemen Perangkat Lunak",
    subtitle_en: "Centralized management & analytics",
    subtitle_id: "Manajemen & analitik terpusat",
    image:
      "https://images.unsplash.com/photo-1581093588401-15a6efc92b2b?auto=format&fit=crop&w=600&q=80",
  },
];

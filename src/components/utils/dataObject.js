import { useI18n } from "../../i18n/I18nProvider";

// Fungsi pembuat menu agar reusable di komponen manapun
export const getMenuItems = () => {
  const { lang, setLang, t } = useI18n();
  return {
    mainMenu: [
      { name: t.product, path: "/product" },
      { name: t.about, path: "/about" },
      { name: t.solution, path: "/solution" },
      { name: t.contact, path: "/contact" },
    ],
    extraMenu: [
      { name: t.partners, path: "/principle" },
      { name: t.corporate, path: "/success-story" },
      { name: t.helpResources, path: "/help" },
    ],
  };
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

export const dataFilterProduct = [
  { key: "all", label_en: "All", label_id: "Semua" },
  { key: "ai", label_en: "AI", label_id: "AI" },
  { key: "iot", label_en: "IoT", label_id: "IoT" },
  { key: "software", label_en: "Software", label_id: "Perangkat Lunak" },
];

export const dataStats = [
  {
    key: "happyClients",
    label: "Happy clients",
    value: 100,
  },
  {
    key: "projects",
    label: "Projects completed",
    value: 328,
  },
  {
    key: "members",
    label: "Dedicated members",
    value: 24,
  },
  {
    key: "awards",
    label: "Awards won",
    value: 12,
  },
];

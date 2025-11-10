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
// src/data/featuresData.js
export const features = {
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

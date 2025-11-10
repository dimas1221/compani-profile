import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: "https://www.google.com",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    url: "https://www.microsoft.com",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: "https://www.apple.com",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: "https://www.amazon.com",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    url: "https://www.ibm.com",
  },
  {
    name: "NVIDIA",
    logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    url: "https://www.nvidia.com",
  },
];

const duplicatedPartners = [...partners, ...partners, ...partners];

export default function PartnerSection() {
  const { lang } = useI18n();

  const titleText = lang === "id" ? "Mitra Kami" : "Our Partners";
  const subtitleText =
    lang === "id"
      ? "Kami bangga berkolaborasi dengan lembaga dan organisasi terkemuka"
      : "We are proud to collaborate with leading institutions and organizations";

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <GlobalSectionTitle title={titleText} subtitle={subtitleText} />
      </div>

      {/* ====== DOUBLE ROW MARQUEE ====== */}
      <div className="relative mt-16 space-y-10 overflow-hidden">
        {/* Row 1 - Left to Right */}
        <motion.div
          className="flex gap-6 sm:gap-10"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...duplicatedPartners].reverse().map((partner, index) => (
            <motion.a
              key={`top-${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-28 h-20 sm:w-44 sm:h-32
                         bg-white dark:bg-gray-800
                         rounded-2xl shadow-md hover:shadow-lg dark:hover:shadow-blue-900/30
                         flex items-center justify-center
                         border border-gray-100 dark:border-gray-700
                         hover:-translate-y-1 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="w-16 h-10 sm:w-24 sm:h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Row 2 - Right to Left */}
        <motion.div
          className="flex gap-6 sm:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <motion.a
              key={`bottom-${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-28 h-20 sm:w-44 sm:h-32
                         bg-white dark:bg-gray-800
                         rounded-2xl shadow-md hover:shadow-lg dark:hover:shadow-blue-900/30
                         flex items-center justify-center
                         border border-gray-100 dark:border-gray-700
                         hover:-translate-y-1 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="w-16 h-10 sm:w-24 sm:h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Fade Overlay (kiri & kanan) */}
        <div className="absolute top-0 left-0 w-20 sm:w-24 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 sm:w-24 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

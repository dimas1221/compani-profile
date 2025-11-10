import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";

export default function AboutSection() {
  const { lang, t } = useI18n();

  const items = [
    lang === "en"
      ? "Deliver secure digital solutions"
      : "Memberikan solusi digital yang aman",
    lang === "en" ? "Innovate with AI & IoT" : "Berinovasi dengan AI & IoT",
    lang === "en"
      ? "Support customer success"
      : "Mendukung keberhasilan pelanggan",
  ];

  return (
    <section
      className="
        relative overflow-hidden py-20 sm:py-28
        bg-gradient-to-br from-white via-blue-50 to-cyan-50
        dark:from-gray-950 dark:via-gray-900 dark:to-cyan-950
        transition-colors duration-700
      "
    >
      {/* Background Accent Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20">
        <img
          src="/images/logo/ultra_light 1.png"
          alt="Background Accent"
          className="w-[800px] max-w-[80%] object-contain blur-sm select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <GlobalSectionTitle
          title={lang === "en" ? "About Us" : "Tentang Kami"}
          subtitle={
            lang === "en"
              ? "Building innovative and secure technology ecosystems for a better digital future."
              : "Membangun ekosistem teknologi inovatif dan aman untuk masa depan digital yang lebih baik."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3
              className="
                text-2xl sm:text-3xl font-extrabold tracking-tight
                bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500
                dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500
                text-transparent bg-clip-text
              "
            >
              {t.company}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed max-w-xl">
              {t.footer_desc}
            </p>

            <div className="pt-3">
              <h4
                className="
                  text-xl sm:text-2xl font-semibold mb-5 tracking-wide
                  text-blue-700 dark:text-cyan-400
                "
              >
                {lang === "en" ? "Vision & Mission" : "Visi & Misi"}
              </h4>
              <ul className="space-y-3">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="
                      flex items-start gap-3 text-gray-900 dark:text-gray-200
                      text-sm sm:text-base leading-snug
                      hover:text-cyan-600 dark:hover:text-cyan-300
                      transition-all duration-300
                    "
                  >
                    <svg
                      className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-[2px] flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Decorative Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div
              className="
                relative w-full max-w-sm sm:max-w-md p-6 sm:p-8
                rounded-3xl shadow-xl bg-white/60 dark:bg-gray-800/50
                backdrop-blur-lg border border-gray-200 dark:border-gray-700
                transition-all duration-500
                hover:scale-[1.02] hover:shadow-2xl
              "
            >
              <img
                src="/images/logo/ultra_light 1.png"
                alt="About Illustration"
                className="w-full object-contain opacity-90 drop-shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

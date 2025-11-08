import React from "react";
import { useI18n } from "../../i18n/I18nProvider";

export default function AboutSection() {
  const { lang, setLang, t } = useI18n();
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
        max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 
        bg-gradient-to-br from-cyan-100 via-white to-blue-100
        dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900
        shadow-lg backdrop-blur-md 
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start mx-3">
        <div>
          <h3
            className="
          text-2xl sm:text-3xl font-extrabold tracking-tight
          bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500
          text-transparent bg-clip-text mb-3 sm:mb-5
        "
          >
            {t.company}
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-snug text-sm sm:text-base max-w-xl">
            {t.footer_desc}
          </p>
        </div>

        <div>
          <h4
            className="
          text-xl sm:text-2xl font-semibold mb-5 sm:mb-7 tracking-wide
          text-blue-800 dark:text-cyan-400
        "
          >
            {lang === "en" ? "Vision & Mission" : "Visi & Misi"}
          </h4>
          <ul className="space-y-3 max-w-md">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="
              flex items-start space-x-2 sm:space-x-3 text-gray-900 dark:text-gray-200 text-sm sm:text-base leading-snug
              hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors duration-300
            "
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-cyan-600 dark:text-cyan-400 mt-[0.2rem]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  aria-hidden="true"
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
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Headphones,
  MessageSquare,
  Newspaper,
} from "lucide-react";
import { useI18n } from "../../i18n/I18nProvider";

export default function InfoSection() {
  const { t } = useI18n();

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 mt-16 md:mt-24">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-10 text-center"
      >
        {t.contactPage.info_title}
      </motion.h2>

      {/* MAIN INFO BOX: Glass-style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="
          relative
          bg-white/60 dark:bg-neutral-900/60
          backdrop-blur-lg
          border border-white/40 dark:border-neutral-700/40
          rounded-3xl
          shadow-lg dark:shadow-xl
          p-8 md:p-12
          mb-12
        "
      >
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
          {t.contactPage.info_text1}
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:gap-12 text-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">{t.contactPage.info_email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">{t.contactPage.info_phone}</span>
          </div>
        </div>
      </motion.div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card Template */}
        {[
          {
            icon: (
              <Headphones className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            ),
            title: t.contactPage.info_support_title,
            desc: t.contactPage.info_support_desc,
          },
          {
            icon: (
              <MessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            ),
            title: t.contactPage.info_feedback_title,
            desc: t.contactPage.info_feedback_desc,
          },
          {
            icon: (
              <Newspaper className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            ),
            title: t.contactPage.info_media_title,
            desc: t.contactPage.info_media_desc,
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
            className="
              p-6
              bg-white/50 dark:bg-neutral-900/50
              backdrop-blur-md
              border border-white/30 dark:border-neutral-700/30
              rounded-2xl
              shadow-md dark:shadow-lg
              hover:shadow-xl dark:hover:shadow-2xl
              transition-all duration-300
              flex flex-col gap-4
            "
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

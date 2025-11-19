import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TemplateSection from "../../components/TemplateSection";
import { useI18n } from "../../i18n/I18nProvider";
import GlobalButton from "../../components/GlobalButton";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";

export default function ContactPage() {
  const { t, lang } = useI18n();
  const c = t.contactPage;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <TemplateSection>
        {/* ========================= */}
        <GlobalSectionTitle
          title={lang === "id" ? "Kontak Kami" : "Our Contact"}
        />
        {/* HERO SECTION */}
        {/* ========================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-3xl font-calsans 
          text-gray-900 dark:text-white tracking-tight"
          >
            {c.title1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-gray-600 dark:text-gray-300 
          text-sm max-w-2xl mx-auto leading-relaxed font-light"
          >
            {c.subtitle1}
          </motion.p>
        </div>

        {/* ========================= */}
        {/* MAP + TEXT SECTION */}
        {/* ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mt-20">
          {/* LEFT — MAP */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="
            rounded-3xl overflow-hidden 
            shadow-[0_15px_40px_rgba(0,0,0,0.12)]
            border border-gray-200 dark:border-neutral-700 
            h-[420px]
          "
          >
            <iframe
              src="https://maps.google.com/maps?q=PT%20Transforme%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* RIGHT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2
              className="text-xl sm:text-3xl font-calsans 
          text-gray-900 dark:text-white leading-snug"
            >
              {c.title2}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-light">
              {c.subtitle2}
            </p>
          </motion.div>
        </div>

        {/* ========================= */}
        {/* CONTACT FORM */}
        {/* ========================= */}
        <div
          className="
        max-w-4xl mx-auto mt-24
        bg-white dark:bg-neutral-900 
        shadow-xl rounded-3xl 
        p-12 sm:p-14 md:p-16
        border border-gray-200 dark:border-neutral-700
        backdrop-blur-xl
        "
        >
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* LEFT SIDE INPUTS */}
            <div className="space-y-10">
              <InputField label={c.form_name} type="text" />
              <InputField label={c.form_email} type="email" />
              <InputField label={c.form_company} type="text" />
            </div>

            {/* RIGHT — MESSAGE + BUTTON */}
            <div className="flex flex-col gap-10 h-full">
              <TextareaField label={c.form_message} />

              <GlobalButton>{c.form_send}</GlobalButton>
            </div>
          </motion.form>
        </div>
      </TemplateSection>
    </>
  );
}

/* ========================= */
/* Reusable Components */
/* ========================= */

function InputField({ label, type }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-medium text-gray-800 dark:text-gray-200">
        {label}
      </label>
      <input
        type={type}
        className="
          w-full rounded-2xl px-5 py-4
          bg-gray-100 dark:bg-neutral-800
          text-gray-900 dark:text-white
          border border-transparent 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-300
          outline-none transition-all
          shadow-inner
        "
      />
    </div>
  );
}

function TextareaField({ label }) {
  return (
    <div className="flex flex-col gap-3 flex-grow">
      <label className="font-medium text-gray-800 dark:text-gray-200">
        {label}
      </label>
      <textarea
        rows="9"
        className="
          w-full h-full rounded-2xl px-5 py-4 
          bg-gray-100 dark:bg-neutral-800
          text-gray-900 dark:text-white
          border border-transparent 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-300
          outline-none transition-all
          shadow-inner
        "
      />
    </div>
  );
}

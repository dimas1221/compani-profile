import React, { useEffect, useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import FAQItem from "../../components/FAQItem";
import faqData from "../../data/helpFaq.json";
import TemplateSection from "../../components/TemplateSection";
export default function HelpResources() {
  const { lang, t } = useI18n();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqData[lang] || []);
  }, [lang]);

  return (
    <TemplateSection>
      {/* TITLE */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Frequently asked questions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t.helpResources}
        </p>
      </div>

      {/* LIST FAQ */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </TemplateSection>
  );
}

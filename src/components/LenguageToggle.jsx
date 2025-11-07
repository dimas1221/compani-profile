import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded ${
          lang === "en" ? "bg-primary-500 text-white" : "bg-transparent"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("id")}
        className={`px-2 py-1 rounded ${
          lang === "id" ? "bg-primary-500 text-white" : "bg-transparent"
        }`}
        aria-pressed={lang === "id"}
      >
        ID
      </button>
    </div>
  );
}

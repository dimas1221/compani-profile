import React, { useState } from "react";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";
import { translations } from "../i18n/translation";
import GlobalButton from "./GlobalButton";
import { useI18n } from "../i18n/I18nProvider";

export default function Footer() {
  const { lang, setLang, t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  return (
    <footer
      className="relative mt-16 border-t border-gray-300 dark:border-gray-700
                 bg-gradient-to-tr from-white/90 via-blue-50/70 to-sky-50/70
                 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-cyan-900/80
                 backdrop-blur-lg
                 font-[Inter] text-gray-800 dark:text-gray-300 transition-colors duration-500"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
      >
        {/* --- Column 1: Brand --- */}
        <div>
          <h4 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent leading-tight">
            {t.company}
          </h4>
          <p
            className="mt-3 text-xs sm:text-sm leading-snug text-gray-600 dark:text-gray-400 max-w-xs
                       line-clamp-3"
          >
            {t.footer_desc}
          </p>
        </div>

        {/* --- Column 2: Empty --- */}
        {/* <div></div> */}

        {/* --- Column 3: Contact --- */}
        <div>
          <h5 className="text-sm sm:text-base font-semibold mb-3">
            {t.footer_contact}
          </h5>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm max-w-xs">
            <li className="flex items-center gap-1 sm:gap-2">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-cyan-400" />
              <a
                href="mailto:info@transforme.co.id"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition truncate"
              >
                info@transforme.co.id
              </a>
            </li>
            <li className="truncate">Phone: +62 21 5555 555</li>
          </ul>

          <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-gray-700 dark:text-gray-300">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* --- Column 4: Subscribe --- */}
        <div>
          <h5 className="text-sm sm:text-base font-semibold mb-3">
            {t.footer_subscribe}
          </h5>
          <form
            onSubmit={submit}
            className="flex flex-col sm:flex-row gap-2 max-w-xs"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.subscribe_placeholder}
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                         bg-gray-50 dark:bg-gray-800 text-xs sm:text-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <GlobalButton
              type="submit"
              className="whitespace-nowrap rounded-md px-4 py-2 text-sm shadow-md"
            >
              {t.subscribe_btn}
            </GlobalButton>
          </form>
          {sent && (
            <p className="mt-2 text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium transition">
              {t.subscribed_message}
            </p>
          )}
        </div>
      </div>

      {/* --- Bottom line --- */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {t.company} — {t.rights_reserved}
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import GlobalButton from "./GlobalButton";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useI18n();
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
      className="
        relative mt-20 border-t border-gray-200 dark:border-gray-800
        bg-gradient-to-b from-white via-gray-50 to-gray-100
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        backdrop-blur-md transition-colors duration-500
        font-[Inter] text-gray-800 dark:text-gray-300
      "
    >
      {/* --- Main content --- */}
      <div
        className="
          max-w-7xl mx-auto px-6 sm:px-10 py-14
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8
        "
      >
        {/* --- Column 1: Brand --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4
            className="
              text-2xl font-extrabold
              bg-gradient-to-r from-blue-600 to-sky-400
              dark:from-cyan-400 dark:to-blue-500
              bg-clip-text text-transparent
              leading-tight
            "
          >
            {t.company}
          </h4>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
            {t.footer_desc}
          </p>
        </motion.div>

        {/* --- Column 2: Navigation Links --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h5 className="text-base font-semibold mb-3">{t.quick_links}</h5>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a
                href="/about"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                {t.about}
              </a>
            </li>
            <li>
              <a
                href="/solution"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                {t.solution}
              </a>
            </li>
            <li>
              <a
                href="/product"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                {t.product}
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </motion.div>

        {/* --- Column 3: Contact --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h5 className="text-base font-semibold mb-3">{t.footer_contact}</h5>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <a
                href="mailto:info@transforme.co.id"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition truncate"
              >
                info@transforme.co.id
              </a>
            </li>
            <li className="truncate text-gray-600 dark:text-gray-400">
              +62 21 5555 555
            </li>
          </ul>

          <div className="flex items-center gap-5 mt-5">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* --- Column 4: Subscribe --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h5 className="text-base font-semibold mb-3">{t.footer_subscribe}</h5>
          <form
            onSubmit={submit}
            className="flex flex-col sm:flex-row gap-2 max-w-xs"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.subscribe_placeholder}
              className="
                flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition
              "
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
            <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium transition">
              {t.subscribed_message}
            </p>
          )}
        </motion.div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {t.company} — {t.rights_reserved}
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import GlobalButton from './GlobalButton';

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail('');
  };

  return (
    <footer
      className="
        relative mt-24 overflow-hidden
        border-t border-gray-200/70 dark:border-gray-800/70
        bg-white
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        backdrop-blur-lg transition-all duration-700
        text-gray-800 dark:text-gray-300 font-[Inter]
      "
    >
      {/* === Decorative Gradient Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

      {/* === Main Footer Content === */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10">
        {/* --- Brand Column --- */}
        <div className="transition-all duration-500 hover:translate-y-[-2px]">
          <h4
            className="
              text-2xl sm:text-3xl font-extrabold mb-3
              text-blue-600 
            "
          >
            {t.company}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs">
            {t.footer_desc}
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div className="transition-all duration-500 hover:translate-y-[-2px]">
          <h5 className="text-lg font-semibold mb-4">{t.quick_links}</h5>
          <ul className="space-y-2.5 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {[
              { label: t.about, href: '/about' },
              { label: t.solution, href: '/solution' },
              { label: t.product, href: '/product' },
              { label: t.contact, href: '/contact' },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="
                    group inline-flex items-center gap-2
                    hover:text-blue-600 dark:hover:text-cyan-400
                    transition-all duration-300
                  "
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div className="transition-all duration-500 hover:translate-y-[-2px]">
          <h5 className="text-lg font-semibold mb-4">{t.footer_contact}</h5>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              <a
                href="mailto:info@transforme.co.id"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
              >
                info@transforme.co.id
              </a>
            </li>
            <li className="text-gray-600 dark:text-gray-400">
              +62 21 5555 555
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-5">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  border border-gray-200 dark:border-gray-700
                  bg-white/70 dark:bg-gray-800/70
                  hover:border-blue-500 dark:hover:border-cyan-400
                  hover:text-blue-600 dark:hover:text-cyan-400
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                "
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* --- Subscribe Section --- */}
        <div className="transition-all duration-500 hover:translate-y-[-2px]">
          <h5 className="text-lg font-semibold mb-4">{t.footer_subscribe}</h5>
          <form
            onSubmit={submit}
            className="flex flex-col sm:flex-row gap-3 max-w-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.subscribe_placeholder}
              className="
                flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500/60
                transition-all
              "
              required
            />
            <GlobalButton
              type="submit"
              className="rounded-xl px-5 py-2 text-sm shadow-md"
            >
              {t.subscribe_btn}
            </GlobalButton>
          </form>

          {sent && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium transition">
              {t.subscribed_message}
            </p>
          )}
        </div>
      </div>

      {/* === Footer Bottom === */}
      <div className="relative border-t border-gray-200/70 dark:border-gray-800/70 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} {t.company} — {t.rights_reserved}
        </p>
      </div>
    </footer>
  );
}

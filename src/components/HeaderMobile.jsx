import { useState } from "react";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import { translations } from "../i18n/translation";
import { IconMoon, IconSearch, IconSun } from "./icons/InlineIcons";
import { getMenuItems } from "./utils/dataObject";
export default function HeaderMobile({ toggleTheme, darkMode, lang, setLang }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const t = (key) => translations[lang][key] || key;
  const menu = getMenuItems(lang);
  return (
    <>
      {/* === HEADER MOBILE === */}
      <header
        className="mt-3 mx-auto fixed top-0 left-0 w-full z-50 px-5 py-3 flex justify-between items-center
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/20 dark:border-gray-800/50
        font-[Inter] transition-all duration-300"
      >
        {/* Company Name */}

        <div className="w-32 h-auto select-none">
          <img
            src={
              darkMode
                ? "/images/logo/logodark.png"
                : "/images/logo/logolight.png"
            }
            alt={t.company}
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOpenSearch(true)}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all duration-200 text-[18px]"
          >
            <IconSearch />
          </button>
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all duration-200 text-[18px]"
          >
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>
          <button
            onClick={() => setOpenMenu(true)}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all duration-200 text-[22px] font-semibold"
          >
            ☰
          </button>
        </div>
      </header>

      {/* === FULLSCREEN MENU (Burger Open) === */}
      <div
        className={`fixed inset-0 z-[60] bg-white dark:bg-gray-950 transform transition-transform duration-500 ease-in-out ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full font-[Inter]">
          {/* Header / Close & Language */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setOpenMenu(false)}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide shadow-sm transition-all duration-200"
            >
              ✕
            </button>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg text-sm font-medium tracking-wide border-none focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="en">English</option>
              <option value="id">Indonesia</option>
            </select>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 flex flex-col justify-start mt-6 space-y-1">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpenMenu(false)}
                className="px-7 py-5 text-[17px] font-medium text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
              © 2025 {t("company")}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </>
  );
}

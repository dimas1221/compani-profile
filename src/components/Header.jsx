import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";
import { IconMoon, IconSearch, IconSun } from "./icons/InlineIcons";
import { getMenuItems } from "./utils/dataObject";
import GlobalButton from "./GlobalButton";
import { useApp } from "../context/AppContext";
import { useI18n } from "../i18n/I18nProvider";

export default function Header({ topBarVisible }) {
  const { darkMode, toggleTheme } = useApp();
  const { t } = useI18n();
  const [openSearch, setOpenSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const { mainMenu, extraMenu } = getMenuItems();
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 w-full z-40 bg-transparent border-none transition-all duration-300 font-calsans
          ${topBarVisible ? "top-[38px]" : "top-0"}
        `}
      >
        <div
          className="relative max-w-7xl mx-auto px-6 md:px-12 py-4
          flex items-center justify-between
          rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/40
          bg-white/80 dark:bg-gray-900/60 backdrop-blur-md mt-3 mb-3"
        >
          {/* === LEFT SECTION (main menu) === */}
          <nav className="hidden md:flex items-center space-x-10 font-semibold text-sm tracking-wide flex-1 justify-start">
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative group transition-all duration-300 ease-in-out 
                    ${
                      darkMode
                        ? "text-gray-100 hover:text-white"
                        : "text-gray-700 hover:text-black"
                    }
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  <span
                    className={`pb-1 ${
                      isActive
                        ? "font-bold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Animated underline */}
                  <span
                    className={`absolute left-1/2 -bottom-[3px] w-0 h-[2px] bg-gradient-to-r from-blue-500 to-sky-400 
                    rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* === LOGO (selalu di tengah absolut) === */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center">
            <Link to="/" className="w-36 sm:w-44 h-auto select-none">
              <img
                src={
                  darkMode
                    ? "/images/logo/logodark.png"
                    : "/images/logo/logolight.png"
                }
                alt={t.company}
                className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-all duration-300"
                draggable={false}
              />
            </Link>
          </div>

          {/* === RIGHT SECTION (extra menu + actions) === */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-8">
            {extraMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative group transition-all duration-300 font-semibold text-sm
                    ${
                      darkMode
                        ? "text-gray-100 hover:text-white"
                        : "text-gray-800 hover:text-black"
                    } ${location.pathname === item.path ? "font-bold" : ""}`}
                >
                  <span
                    className={`pb-1 ${
                      isActive
                        ? "font-bold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}

            {/* Search Button */}
            <button
              onClick={() => setOpenSearch(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all duration-200"
              aria-label="Search"
            >
              <IconSearch className="w-6 h-6" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {!darkMode ? (
                <IconSun className="w-6 h-6" />
              ) : (
                <IconMoon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </>
  );
}

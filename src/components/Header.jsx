import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";
import { translations } from "../i18n/translation";
import { IconMoon, IconSearch, IconSun } from "./icons/InlineIcons";
import { getMenuItems } from "./utils/dataObject";
import GlobalButton from "./GlobalButton";

export default function Header({ toggleTheme, darkMode, lang }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const t = translations[lang];
  const menu = getMenuItems(lang);
  const dropdownRef = useRef(null);

  // close dropdown jika klik di luar
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
        className="fixed top-[38px] left-0 w-full z-40 
    bg-transparent border-none transition-all duration-300 font-[Inter]"
      >
        <div
          className="max-w-7xl mx-auto px-8 md:px-12 py-5 flex justify-between items-center
      rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/40
      bg-white dark:bg-gray-900/60 backdrop-blur-md mt-3 mb-3"
        >
          {/* Left menu */}
          <nav className="hidden md:flex space-x-10 font-semibold text-lg tracking-wide text-gray-700 dark:text-gray-200">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-600 font-bold"
                    : "hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="w-40 h-auto select-none">
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

          {/* Right actions */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* Dropdown Our Teams */}
            <div className="relative" ref={dropdownRef}>
              <GlobalButton
                onClick={() => setOpenDropdown((v) => !v)}
                variant="primary"
                size="medium"
                aria-haspopup="true"
                aria-expanded={openDropdown}
                aria-controls="teams-menu"
                className="hidden md:inline"
              >
                {t.ourTeams}
              </GlobalButton>

              {openDropdown && (
                <ul
                  id="teams-menu"
                  role="menu"
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  {t.team_members.map((member, i) => (
                    <li
                      key={i}
                      role="menuitem"
                      tabIndex={-1}
                      className="cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white"
                      onClick={() => {
                        setOpenDropdown(false);
                        alert(`Selected team: ${member}`);
                      }}
                    >
                      {member}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setOpenSearch(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all duration-200"
              aria-label="Search"
            >
              <IconSearch className="w-6 h-6" />
            </button>

            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
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

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

  // Update class <html> setiap kali darkMode berubah
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <AppContext.Provider value={{ darkMode, toggleTheme, lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { I18nProvider } from "./i18n/I18nProvider.jsx";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </AppProvider>
  </React.StrictMode>
);

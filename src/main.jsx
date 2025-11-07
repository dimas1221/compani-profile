import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nProvider.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <I18nProvider> */}
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
    {/* </I18nProvider> */}
  </React.StrictMode>
);

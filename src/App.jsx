import React, { Suspense, lazy, useState } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import MobileLandscapeVideo from "./components/MobileLandscapeVideo";
import { Routes, Route } from "react-router-dom";
import { useApp } from "./context/AppContext";
import { useI18n } from "./i18n/I18nProvider";

const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Product = lazy(() => import("./pages/product/Product"));
const Solution = lazy(() => import("./pages/solution/Solution"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const ProductDetail = lazy(() => import("./pages/home/ProductDetail"));
const Principle = lazy(() => import("./pages/principle/Principle"));

export default function App() {
  const { darkMode, toggleTheme } = useApp();
  const { lang, setLang, t } = useI18n();
  const [topBarVisible, setTopBarVisible] = useState(true);

  // Padding-top harus dinamis dan transition agar smooth
  const topOffset = topBarVisible ? 110 : 72; // px

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "dark bg-gray-950 text-gray-100" : "bg-white text-gray-800"
      }`}
      style={{ transition: "padding-top 0.3s ease" }}
    >
      <MobileLandscapeVideo />
      {/* Header */}
      <div className="hidden lg:block">
        <TopBar onVisibilityChange={setTopBarVisible} />
        <Header topBarVisible={topBarVisible} />
      </div>

      <div className="block lg:hidden">
        <HeaderMobile />
      </div>

      {/* Main */}
      <main
        className="flex-1 transition-all duration-300
        bg-gradient-to-b from-[#f9fafc] via-[#f5f8ff] to-[#eef2f7]
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        "
        style={{ paddingTop: topOffset }}
      >
        <Suspense fallback={<div className="text-center py-20">Loading…</div>}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/principle" element={<Principle />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}

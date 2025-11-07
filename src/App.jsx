// import React, { Suspense, lazy } from "react";
// import { Routes, Route } from "react-router-dom";
// import TopBar from "./components/TopBar";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ScrollTop from "./components/ScrollTop";
// import HeaderMobile from "./components/HeaderMobile";
// import ProductDetail from "./pages/ProductDetail";
// import { useApp } from "./context/AppContext";
// import MobileLandscapeVideo from "./components/MobileLandscapeVideo";

// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Product = lazy(() => import("./pages/Product"));
// const Solution = lazy(() => import("./pages/Solution"));
// const Contact = lazy(() => import("./pages/Contact"));

// export default function App() {
//   const { darkMode, toggleTheme, lang, setLang } = useApp();

//   const topOffset = "pt-[110px]";

//   return (
//     <div
//       className={`min-h-screen flex flex-col transition-colors duration-300 ${
//         darkMode ? "dark bg-gray-950 text-gray-100" : "bg-white text-gray-800"
//       }`}
//     >
//       <MobileLandscapeVideo />
//       {/* Header */}
//       <div>
//         <div className="hidden md:block">
//           <TopBar lang={lang} setLang={setLang} />
//           <Header
//             toggleTheme={toggleTheme}
//             darkMode={darkMode}
//             lang={lang}
//             setLang={setLang}
//           />
//         </div>
//         <div className="block md:hidden">
//           <HeaderMobile
//             toggleTheme={toggleTheme}
//             darkMode={darkMode}
//             lang={lang}
//             setLang={setLang}
//           />
//         </div>
//       </div>

//       {/* Main */}
//       <main className={`flex-1 ${topOffset}`}>
//         <Suspense fallback={<div className="text-center py-20">Loading…</div>}>
//           <Routes>
//             <Route
//               path="/product/:id"
//               element={<ProductDetail lang={lang} />}
//             />
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/solution" element={<Solution />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </Suspense>
//       </main>

//       <Footer lang={lang} />
//       <ScrollTop />
//     </div>
//   );
// }

import React, { Suspense, lazy, useState } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import MobileLandscapeVideo from "./components/MobileLandscapeVideo";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { useApp } from "./context/AppContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/Product"));
const Solution = lazy(() => import("./pages/Solution"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  const { darkMode, toggleTheme, lang, setLang } = useApp();
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
      <div>
        <div className="hidden md:block">
          <TopBar
            lang={lang}
            setLang={setLang}
            onVisibilityChange={setTopBarVisible}
          />
          <Header
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            lang={lang}
            setLang={setLang}
            topBarVisible={topBarVisible}
          />
        </div>
        <div className="block md:hidden">
          <HeaderMobile
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            lang={lang}
            setLang={setLang}
          />
        </div>
      </div>

      {/* Main */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ paddingTop: topOffset }}
      >
        <Suspense fallback={<div className="text-center py-20">Loading…</div>}>
          <Routes>
            <Route
              path="/product/:id"
              element={<ProductDetail lang={lang} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer lang={lang} />
      <ScrollTop />
    </div>
  );
}

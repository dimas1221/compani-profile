import React, { Suspense, lazy, useState } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import MobileLandscapeVideo from './components/MobileLandscapeVideo';
import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { useI18n } from './i18n/I18nProvider';

// 🔥 Global Premium Intro
import GlobalPremiumIntro from './components/GlobalPremiumIntro';

const Home = lazy(() => import('./pages/home/Home'));
const LearnMorePage = lazy(() => import('./pages/home/LearnMorePage'));
const About = lazy(() => import('./pages/about/About'));
const Product = lazy(() => import('./pages/product/Product'));
const Solution = lazy(() => import('./pages/solution/Solution'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const ProductDetail = lazy(() => import('./pages/home/ProductDetail'));
const Principle = lazy(() => import('./pages/principle/Principle'));
const SuccessStory = lazy(() => import('./pages/successStory/SuccessStory'));
const StoryDetail = lazy(() => import('./pages/successStory/StoryDetail'));
const HelpResources = lazy(() => import('./pages/help/HelpResources'));

export default function App() {
  const { darkMode } = useApp();
  const [showIntro, setShowIntro] = useState(true); // <-- STATE INTRO
  const { lang } = useI18n();
  const [topBarVisible, setTopBarVisible] = useState(true);

  const topOffset = topBarVisible ? 110 : 72;

  // ⛔ Jika intro masih aktif → tampilkan dulu intro, jangan render layout
  if (showIntro) {
    return <GlobalPremiumIntro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        darkMode
          ? 'dark bg-gray-950 text-gray-100'
          : 'bg-gradient-to-b from-[#fdfdfd] via-[#f8fbff] to-[#f1f4fa] text-gray-800'
      }`}
      style={{
        backgroundImage: !darkMode
          ? `
            radial-gradient(at 20% 20%, rgba(230, 245, 255, 0.6) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(245, 250, 255, 0.6) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(230, 240, 255, 0.5) 0px, transparent 50%)
          `
          : 'none',
        transition: 'all 0.5s ease',
      }}
    >
      <MobileLandscapeVideo />

      <div className="hidden lg:block">
        <TopBar onVisibilityChange={setTopBarVisible} />
        <Header topBarVisible={topBarVisible} />
      </div>

      <div className="block lg:hidden">
        <HeaderMobile />
      </div>

      <main
        className="flex-1 transition-all duration-300"
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
            <Route path="/success-story" element={<SuccessStory />} />
            <Route path="/success-story/:id" element={<StoryDetail />} />
            <Route path="/help-resources" element={<HelpResources />} />
            <Route path="/learn/:id" element={<LearnMorePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}

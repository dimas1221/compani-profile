// import React, { useEffect, useState } from "react";
// import CounterStat from "./CounterStat";
// import { dataSlides } from "./utils/dataObject";
// import { useApp } from "../context/AppContext"; // ambil global lang & dark mode
// import GlobalButton from "./GlobalButton";
// import { translations } from "../i18n/translation";
// import { useI18n } from "../i18n/I18nProvider";

// const slides = dataSlides;

// export default function HeroSlider({ stats = [] }) {
//   const { darkMode } = useApp();
//   const { lang, setLang, t } = useI18n();
//   const [idx, setIdx] = useState(0);

//   // 🔹 Auto slide tiap 5 detik
//   useEffect(() => {
//     const interval = setInterval(
//       () => setIdx((i) => (i + 1) % slides.length),
//       5000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full font-[Inter]">
//       {/* ==== Background Slider ==== */}
//       <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]  overflow-hidden">
//         {slides.map((s, i) => {
//           const active = i === idx;
//           const imageSrc = darkMode ? s.imageDark : s.image;

//           return (
//             <img
//               key={s.id}
//               src={imageSrc}
//               alt={s.alt}
//               loading="lazy"
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
//                 active ? "opacity-100" : "opacity-0 pointer-events-none"
//               }`}
//             />
//           );
//         })}

//         {/* ==== Overlay gradient agar teks terbaca ==== */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 dark:from-black/40 dark:via-black/60 dark:to-black/80" />

//         {/* ==== Headline utama ==== */}
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center px-4 z-[20]">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
//             {t.title_main}
//           </h2>
//           <p className="mt-3 text-white/80 text-sm sm:text-base max-w-xl mx-auto">
//             {t.description_main}
//           </p>
//           {/* <div className="mt-6">
//             <GlobalButton
//               size="large"
//               className={"rounded-full"}
//               onClick={() => alert("More info clicked!")}
//             >
//               {t.more_info}
//             </GlobalButton>
//           </div> */}
//         </div>
//       </div>

//       {/* ==== Counter section (keluar dari bawah hero) ==== */}

//       {/* <div
//         className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
//              w-[92%] sm:w-[80%] max-w-5xl z-[20]"
//       >
//         <div
//           className="
//       flex flex-row gap-4 px-2 py-4
//       sm:grid sm:grid-cols-4 sm:gap-6 sm:p-6
//       bg-gradient-to-br from-white/90 via-white/70 to-gray-50/80
//       dark:from-gray-900/90 dark:via-gray-800/80 dark:to-cyan-950/80
//       text-gray-800 dark:text-gray-100
//       rounded-3xl border border-gray-200/60 dark:border-gray-800/60
//       shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
//       backdrop-blur-2xl
//       relative overflow-hidden transition-all duration-700
//     "
//         >

//           <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent dark:from-cyan-500/10 opacity-70 pointer-events-none" />

//           <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-300/30 transition-all duration-700" />

//           {stats.map((s) => (
//             <div
//               key={s.key}
//               className="
//           flex-1 min-w-0 flex justify-center items-center
//           relative z-10
//           hover:scale-[1.03] transition-transform duration-500
//         "
//             >
//               <CounterStat
//                 value={s.value}
//                 duration={1200}
//                 label={s.label}
//                 iconKey={s.key}
//               />
//             </div>
//           ))}
//         </div>
//       </div> */}
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { useI18n } from "../i18n/I18nProvider";
import { dataSlides } from "./utils/dataObject";
import GlobalButton from "./GlobalButton";

const slides = dataSlides;

export default function HeroSlider() {
  const { darkMode } = useApp();
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);

  // 🔹 Auto slide every 6s
  useEffect(() => {
    const interval = setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[idx];
  const imageSrc = darkMode ? currentSlide.imageDark : currentSlide.image;

  return (
    <section className="relative w-full font-[Inter] overflow-hidden">
      {/* === Background Image with Motion === */}
      <AnimatePresence mode="wait">
        <motion.img
          key={imageSrc}
          src={imageSrc}
          alt={currentSlide.alt}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-[85vh] object-cover object-center"
        />
      </AnimatePresence>

      {/* === Overlay Gradient === */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70 dark:from-black/40 dark:via-black/60 dark:to-black/80" />

      {/* === Floating Ambient Gradient Orbs (subtle animation) === */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-400/20 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-400/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Content Section === */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-[85vh] px-6">
        <motion.h2
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight font-calsans"
        >
          {t.title_main}
        </motion.h2>

        <motion.p
          key={`desc-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-5 text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed font-light"
        >
          {t.description_main}
        </motion.p>
      </div>

      {/* === Indicators === */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* === Bottom Blur Transition === */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50/40 dark:from-gray-950/60 to-transparent backdrop-blur-sm" />
    </section>
  );
}

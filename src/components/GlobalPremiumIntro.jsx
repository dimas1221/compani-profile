// import React, { useEffect, useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function GlobalPremiumIntro({ onFinish }) {
//   const [step, setStep] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     // Try play audio
//     audioRef.current?.play().catch(() => {});

//     const timeline = [
//       { id: 0, duration: 1500 }, // text 1
//       { id: 1, duration: 2000 }, // galaxy animation
//       { id: 2, duration: 1500 }, // text 2
//     ];

//     let total = 0;
//     timeline.forEach((s) => {
//       setTimeout(() => setStep(s.id), total);
//       total += s.duration;
//     });

//     setTimeout(() => onFinish?.(), total + 300);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-[99995] bg-black flex items-center justify-center overflow-hidden">
//       <audio ref={audioRef} src="/sounds/tech_intro.mp3" />

//       {/* Galaxy background blur */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,120,255,0.25),transparent_70%)] blur-2xl" />

//       <AnimatePresence mode="wait">
//         {/* STEP 1 – Text */}
//         {step === 0 && (
//           <motion.h1
//             key="t1"
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -25 }}
//             transition={{ duration: 0.7, ease: 'easeOut' }}
//             className="text-white text-3xl md:text-5xl font-light tracking-tight"
//           >
//             Transfroming Business Connectivity
//           </motion.h1>
//         )}

//         {/* STEP 2 — Blue Galaxy Premium Animation */}
//         {step === 1 && (
//           <motion.div
//             key="gx"
//             className="relative flex items-center justify-center"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//           >
//             {/* Core glowing orb */}
//             <motion.div
//               className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-600 blur-xl opacity-70"
//               animate={{ scale: [1, 1.12, 1] }}
//               transition={{
//                 duration: 2.5,
//                 repeat: Infinity,
//                 ease: 'easeInOut',
//               }}
//             />

//             {/* Outer rotating ring */}
//             <motion.div
//               className="absolute w-56 h-56 md:w-80 md:h-80 border border-blue-400/40 rounded-full"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//             />

//             {/* Aurora sweep */}
//             <motion.div
//               className="absolute w-80 h-80 md:w-[420px] md:h-[420px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
//               animate={{ rotate: -360 }}
//               transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
//             />

//             {/* Floating particles */}
//             {[...Array(12)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1.5 h-1.5 bg-white/70 rounded-full shadow-md"
//                 initial={{
//                   x: (Math.random() - 0.5) * 200,
//                   y: (Math.random() - 0.5) * 200,
//                   opacity: 0,
//                 }}
//                 animate={{
//                   x: (Math.random() - 0.5) * 260,
//                   y: (Math.random() - 0.5) * 260,
//                   opacity: [0, 1, 0],
//                 }}
//                 transition={{
//                   duration: 3 + Math.random() * 2,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                 }}
//               />
//             ))}
//           </motion.div>
//         )}

//         {/* STEP 3 — Final text */}
//         {step === 2 && (
//           <motion.h1
//             key="t2"
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.7, ease: 'easeOut' }}
//             className="text-white text-4xl md:text-6xl font-medium tracking-tight"
//           >
//             Transforme Indonesia
//           </motion.h1>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPremiumIntro({ mode = 'cinematic', onFinish }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { id: 0, duration: 1500 },
      { id: 1, duration: 2000 },
      { id: 2, duration: 1500 },
    ];

    let total = 0;
    sequence.forEach((item) => {
      setTimeout(() => setStep(item.id), total);
      total += item.duration;
    });

    setTimeout(() => onFinish && onFinish(), total);
  }, []);

  return (
    <div
      className="
      fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center
      bg-black text-white 
    "
    >
      {/* BACKGROUND ANIMATION */}
      {mode === 'cinematic' && <CinematicBG />}
      {mode === 'mobile' && <MobileLightBG />}
      {mode === 'particle' && <ParticleBG />}
      {mode === 'warp' && <WarpBG />}

      {/* TEXT SEQUENCE */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h1
            key="t1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-[24px] md:text-[42px] font-light text-center"
          >
            Transfroming Business Connectivity.
          </motion.h1>
        )}

        {step === 1 && (
          <motion.div
            key="mid"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="w-28 h-28 md:w-40 md:h-40 rounded-full 
              bg-gradient-to-br from-blue-300/10 to-cyan-500/20 
              backdrop-blur-3xl shadow-[0_0_80px_20px_rgba(80,120,255,0.3)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.h1
            key="t2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[32px] md:text-[56px] font-semibold tracking-tight text-center"
          >
            <img
              src={'/images/logo/logodark.png'}
              className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-all duration-300"
              draggable={false}
            />
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

function CinematicBG() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/40 to-black"
      animate={{ opacity: [0.6, 1, 0.7, 1] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,120,255,0.25),transparent_70%)] blur-3xl" />
    </motion.div>
  );
}

function MobileLightBG() {
  return (
    <motion.div
      className="absolute inset-0 bg-black"
      animate={{ opacity: [1, 0.9, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="absolute inset-0 bg-blue-900/20 blur-[80px]" />
    </motion.div>
  );
}
function ParticleBG() {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.2 + Math.random() * 0.8,
          }}
          animate={{
            y: -20,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
function WarpBG() {
  const lines = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-12 bg-gradient-to-b from-blue-400 to-transparent"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scaleY: 0.2,
          }}
          animate={{
            y: -200,
            scaleY: 1.5,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.9 + Math.random() * 0.6,
            repeat: Infinity,
            delay: Math.random() * 1.5,
          }}
        />
      ))}
    </div>
  );
}

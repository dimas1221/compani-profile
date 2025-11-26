import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPremiumIntro({ onFinish }) {
  const [step, setStep] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Try play audio
    audioRef.current?.play().catch(() => {});

    const timeline = [
      { id: 0, duration: 1500 }, // text 1
      { id: 1, duration: 2000 }, // galaxy animation
      { id: 2, duration: 1500 }, // text 2
    ];

    let total = 0;
    timeline.forEach((s) => {
      setTimeout(() => setStep(s.id), total);
      total += s.duration;
    });

    setTimeout(() => onFinish?.(), total + 300);
  }, []);

  return (
    <div className="fixed inset-0 z-[99995] bg-black flex items-center justify-center overflow-hidden">
      <audio ref={audioRef} src="/sounds/tech_intro.mp3" />

      {/* Galaxy background blur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,120,255,0.25),transparent_70%)] blur-2xl" />

      <AnimatePresence mode="wait">
        {/* STEP 1 – Text */}
        {step === 0 && (
          <motion.h1
            key="t1"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-white text-3xl md:text-5xl font-light tracking-tight"
          >
            Transfroming Business Connectivity
          </motion.h1>
        )}

        {/* STEP 2 — Blue Galaxy Premium Animation */}
        {step === 1 && (
          <motion.div
            key="gx"
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Core glowing orb */}
            <motion.div
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-600 blur-xl opacity-70"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Outer rotating ring */}
            <motion.div
              className="absolute w-56 h-56 md:w-80 md:h-80 border border-blue-400/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Aurora sweep */}
            <motion.div
              className="absolute w-80 h-80 md:w-[420px] md:h-[420px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/70 rounded-full shadow-md"
                initial={{
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  opacity: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 260,
                  y: (Math.random() - 0.5) * 260,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}

        {/* STEP 3 — Final text */}
        {step === 2 && (
          <motion.h1
            key="t2"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-white text-4xl md:text-6xl font-medium tracking-tight"
          >
            Transforme Indonesia
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

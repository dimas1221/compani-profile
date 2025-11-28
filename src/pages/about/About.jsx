// import React, { useEffect } from 'react';
// import { useI18n } from '../../i18n/I18nProvider';
// import AboutCard from './AboutCard';

// import { Brain, Cpu, Wrench, Shield } from 'lucide-react';
// import GlobalSectionTitle from '../../components/GlobalSectionTitle';
// import TemplateSection from '../../components/TemplateSection';
// import FeatureSection from '../home/FeatureSection';

// export default function About() {
//   const { t } = useI18n();

//   const about = t.aboutPage;
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);
//   return (
//     <TemplateSection showLogo={true} showBlur={true}>
//       {/* HERO */}
//       <div
//         className="
//           w-full h-[360px] md:h-[460px]
//           bg-cover bg-center bg-no-repeat
//           rounded-2xl overflow-hidden shadow-xl
//         "
//         style={{
//           backgroundImage: "url('/images/hero/hero3.jpg')",
//         }}
//       />
//       <br />
//       <br />
//       <GlobalSectionTitle
//         title={about.vision_mission_title}
//         subtitle={about.vision_mission_desc}
//       />
//       <GlobalSectionTitle
//         title={about.aboutUs_title}
//         subtitle={about.aboutUs_desc}
//       />
//       <FeatureSection />
//     </TemplateSection>
//   );
// }
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import TemplateSection from '../../components/TemplateSection';
import FeatureSection from '../home/FeatureSection';

export default function About() {
  const { t } = useI18n();
  const about = t.aboutPage;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // RANDOM LAYOUT (left photo or right photo)
  const randomLayout = useMemo(
    () => (Math.random() > 0.5 ? 'left' : 'right'),
    []
  );

  return (
    <TemplateSection showLogo={true} showBlur={true}>
      {/* HERO */}
      <div className="relative w-full h-[360px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
        <img
          src="/images/hero/hero3.jpg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        {/* PREMIUM TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-6 left-6 md:left-10 text-white"
        >
          <h1 className="text-3xl md:text-5xl font-clash drop-shadow-lg">
            {about.hero_title}
          </h1>
          <p className="max-w-md text-sm md:text-base text-white/80 mt-2 drop-shadow-md font-light">
            {about.hero_desc}
          </p>
        </motion.div>
      </div>

      <br />
      <br />

      {/* VISION & MISSION */}
      <GlobalSectionTitle
        title={about.vision_mission_title}
        subtitle={about.vision_mission_desc}
      />

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-clash mb-3">{about.vision_title}</h3>
          <p className="text-sm opacity-80 font-light">{about.vision_desc}</p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-clash mb-3">{about.mission_title}</h3>
          <p className="text-sm opacity-80 font-light">{about.mission_desc}</p>
        </motion.div>
      </div>

      <br />
      <br />

      {/* ABOUT US - DYNAMIC & PREMIUM SPLIT LAYOUT */}
      <div
        className={`grid md:grid-cols-2 gap-10 items-center ${
          randomLayout === 'left' ? '' : 'md:flex-row-reverse'
        }`}
      >
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/logo/dark.jpg"
              alt="about"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlobalSectionTitle
            title={about.aboutUs_title}
            subtitle={about.aboutUs_desc}
          />
        </motion.div>
      </div>

      <br />
      <br />

      <FeatureSection />
    </TemplateSection>
  );
}

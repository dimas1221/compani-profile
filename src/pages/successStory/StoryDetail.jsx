import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import { ArrowLeft } from 'lucide-react';
import PremiumJustifiedParagraph from '../../components/PremiumJustifiedParagraph';

export default function StoryDetail() {
  const { id } = useParams();
  const { lang } = useI18n();
  const [story, setStory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    fetch('/data/success_story.json')
      .then((res) => res.json())
      .then((json) => {
        const found = json.items.find((item) => item.id === parseInt(id));

        if (!found) return;

        setStory({
          ...found,
          title: lang === 'id' ? found.title_id : found.title_en,
          subtitle: lang === 'id' ? found.subtitle_id : found.subtitle_en,
          description:
            lang === 'id' ? found.description_id : found.description_en,
        });
      })
      .catch((err) => console.error('Failed to load success_story.json', err));
  }, [id, lang]);

  if (!story) return null;

  return (
    <article className="min-h-screen relative overflow-hidden">
      {/* === Background FX === */}
      <div className="absolute inset-0" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/assets/noise.png')" }}
      />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.25),transparent_70%)] pointer-events-none" />

      {/* === PARALLAX HEADER === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[420px] sm:h-[520px] md:h-[600px] overflow-hidden"
      >
        <motion.img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

        {/* Title at Top-Left of Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-8 left-6 sm:top-10 sm:left-12 z-[30] max-w-3xl"
        >
          {/* Glass Gradient Behind Title */}
          <div
            className="absolute -inset-x-6 -inset-y-4 rounded-2xl 
               bg-gradient-to-br from-black/60 via-black/30 to-transparent 
               backdrop-blur-[3px] pointer-events-none z-[-1]"
          />

          <h1
            className="text-4xl sm:text-5xl md:text-6xl 
               font-extrabold text-white 
               leading-[1.15] tracking-tight drop-shadow-2xl"
          >
            {story.title}
          </h1>
        </motion.div>
      </motion.div>

      {/* === MAIN CONTENT === */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 pb-24 -mt-20">
        {/* Floating Meta Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="rounded-3xl bg-white/80 dark:bg-gray-900/70 shadow-xl backdrop-blur-2xl border border-white/30 dark:border-gray-700 px-6 py-6 sm:px-8 sm:py-7 mb-10"
        >
          <Link
            to="/success-story"
            className="group inline-flex items-center mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-blue-600 dark:text-cyan-400 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">
              {lang === 'id'
                ? 'Kembali ke Daftar Kisah'
                : 'Back to Success Stories'}
            </span>
          </Link>

          {/* Date */}
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {new Date(story.date).toLocaleDateString(
              lang === 'id' ? 'id-ID' : 'en-US',
              { day: 'numeric', month: 'long', year: 'numeric' }
            )}
          </p>

          {/* Subtitle */}
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {story.subtitle}
          </p>
        </motion.div>

        {/* === ARTICLE BODY === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <PremiumJustifiedParagraph>
            {story.description}
          </PremiumJustifiedParagraph>
        </motion.div>

        {/* Bottom Fade */}
        <div className="mt-16 h-20 bg-gradient-to-b from-transparent to-black/5 dark:to-gray-900/30 rounded-b-xl" />
      </div>
    </article>
  );
}

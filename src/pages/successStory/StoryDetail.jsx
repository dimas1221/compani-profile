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
    import('../../data/success_story.json').then((res) => {
      const data = res.default[lang].success_story_items.find(
        (i) => i.id === parseInt(id)
      );
      setStory(data);
    });
  }, [id, lang]);

  if (!story) return null;

  return (
    <article
      className="min-h-screen relative overflow-hidden
                 
                 transition-all duration-700 px-6 py-20 sm:py-28"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* === Back Button === */}
        <Link
          to="/success-story"
          className="group inline-flex items-center mb-8 rounded-full px-4 py-2
                     bg-white/70 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700
                     shadow-sm backdrop-blur-md text-gray-800 dark:text-gray-200
                     hover:border-blue-400 dark:hover:border-cyan-400 hover:shadow-md
                     transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-blue-600 dark:text-cyan-400 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm sm:text-base font-medium">
            {lang === 'id'
              ? 'Kembali ke Daftar Kisah'
              : 'Back to Success Stories'}
          </span>
        </Link>

        {/* === Image === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-10"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-72 sm:h-[460px] object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
        </motion.div>

        {/* === Title & Meta === */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {story.title}
        </motion.h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {new Date(story.date).toLocaleDateString(
            lang === 'id' ? 'id-ID' : 'en-US',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          )}
        </p>

        {/* === Content === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {story.subtitle}
          </p>

          <PremiumJustifiedParagraph>
            {story.description}
          </PremiumJustifiedParagraph>
        </motion.div>
      </div>
    </article>
  );
}

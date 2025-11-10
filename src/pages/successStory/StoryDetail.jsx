import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import { ArrowLeft } from "lucide-react";

export default function StoryDetail() {
  const { id } = useParams();
  const { lang } = useI18n();
  const [story, setStory] = useState(null);

  useEffect(() => {
    import("../../data/success_story.json").then((res) => {
      const data = res.default[lang].success_story_items.find(
        (i) => i.id === parseInt(id)
      );
      setStory(data);
    });
  }, [id, lang]);

  if (!story) return null;

  return (
    <article
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
                 transition-colors duration-700 px-6 py-20 sm:py-28"
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/success-story"
          className="flex items-center text-blue-600 dark:text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {lang === "id" ? "Kembali" : "Back"}
        </Link>

        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {story.title}
        </motion.h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {new Date(story.date).toLocaleDateString(
            lang === "id" ? "id-ID" : "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {story.subtitle}
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-loose text-base sm:text-lg whitespace-pre-line">
          {story.description}
        </p>
      </div>
    </article>
  );
}

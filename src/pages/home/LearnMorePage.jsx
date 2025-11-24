import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import HeaderLearnMoreCard from '../../components/HeaderLearnMoreCard';
import PortfolioCard from '../../components/PortfolioCard';
import TeamCard from '../../components/TeamCard';
import { useI18n } from '../../i18n/I18nProvider';
import { motion } from 'framer-motion';
import Shimmer from '../../components/Shimmer';

export default function LearnMorePage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/features.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data?.features?.find((d) => d.id === Number(id));
        setItem(found || data[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }, [id]);

  if (!item) {
    return (
      <div className="p-10">
        <Shimmer className="h-64" />
      </div>
    );
  }

  const lmTitle =
    lang === 'id' ? item.learn_more_title_id : item.learn_more_title_en;
  const lmDesc =
    lang === 'id' ? item.learn_more_desc_id : item.learn_more_desc_en;

  return (
    <div className="min-h-screen py-12 bg-light-bg dark:bg-dark-bg transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* BACK BUTTON */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            ← {lang === 'id' ? 'Kembali' : 'Back'}
          </button>
        </div>

        {/* PAGE MAIN TITLE */}
        <GlobalSectionTitle
          title={lang === 'id' ? item.title_id : item.title_en}
          subtitle={lang === 'id' ? item.desc_id : item.desc_en}
        />

        {/* HEADER IMAGE */}
        <motion.img
          src={item.learn_more_image || item.img}
          alt={lmTitle}
          className="w-full h-[420px] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* MAIN CONTENT */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-14">
            {/* ===== Overview Section ===== */}
            <section>
              <GlobalSectionTitle title={t.learnMorePage.overview} />

              <div className="prose prose-neutral dark:prose-invert max-w-none text-justify leading-relaxed indent-8 text-[17px]">
                <p>{lmDesc}</p>
              </div>
            </section>

            {/* ===== Details Section ===== */}
            <section>
              <GlobalSectionTitle title={t.learnMorePage.details} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                {item.header_learn_more?.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <HeaderLearnMoreCard item={h} lang={lang} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ===== Portfolio Section ===== */}
            {item.portofolio_learn_more?.length > 0 && (
              <section>
                <GlobalSectionTitle title={t.learnMorePage.portfolio} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {item.portofolio_learn_more.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <PortfolioCard item={p} lang={lang} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ===== Team Section ===== */}
            {item.team_learn_more?.length > 0 && (
              <section>
                <GlobalSectionTitle title={t.learnMorePage.team} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
                  {item.team_learn_more.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <TeamCard member={member} lang={lang} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* SUMMARY CARD */}
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-black/30 backdrop-blur-xl shadow-lg border border-gray-200/50 dark:border-gray-700/40">
                <GlobalSectionTitle title={t.learnMorePage.overview} />
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {lang === 'id' ? item.desc_id : item.desc_en}
                </p>
              </div>

              {/* CATEGORY CARD */}
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-black/30 backdrop-blur-xl shadow-lg border border-gray-200/50 dark:border-gray-700/40">
                <GlobalSectionTitle title={t.learnMorePage.category} />
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {item.title_en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

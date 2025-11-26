import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import HeaderLearnMoreCard from '../../components/HeaderLearnMoreCard';
import PortfolioCard from '../../components/PortfolioCard';
import TeamCard from '../../components/TeamCard';
import CarouselLearnMore from '../../components/CarouselLearnMore';
import { useI18n } from '../../i18n/I18nProvider';
import { motion } from 'framer-motion';
import Shimmer from '../../components/Shimmer';
import TemplateSection from '../../components/TemplateSection';
import PremiumJustifiedParagraph from '../../components/PremiumJustifiedParagraph';
import SplitFeatureSection from './SplitFeatureSection';

export default function LearnMorePage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    fetch('/data/features.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data?.features?.find((d) => d.id === Number(id));
        setItem(found || data.features[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => setItem(null));
  }, [id]);

  if (!item) {
    return (
      <div className="p-10">
        <Shimmer className="h-64 rounded-xl" />
      </div>
    );
  }

  const lmTitle =
    lang === 'id' ? item.learn_more_title_id : item.learn_more_title_en;
  const lmDesc =
    lang === 'id' ? item.learn_more_desc_id : item.learn_more_desc_en;

  return (
    <TemplateSection>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-10 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary hover:underline transition-colors duration-300"
          aria-label={lang === 'id' ? 'Kembali' : 'Back'}
        >
          ← {lang === 'id' ? 'Kembali' : 'Back'}
        </button>

        <GlobalSectionTitle
          title={lang === 'id' ? item.title_id : item.title_en}
          subtitle={lang === 'id' ? item.desc_id : item.desc_en}
          className="mb-14"
        />

        {/* DETAILS - Premium Masonry-like Grid */}
        <section className="mb-20">
          <GlobalSectionTitle
            title={t.learnMorePage.details}
            className="mb-8"
          />

          {/* <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {item.header_learn_more?.map((h, i) => (
                <motion.div
                  key={h.title_en + i}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl bg-white/80 dark:bg-[#0b0c0f]/70 backdrop-blur-md border border-white/10 dark:border-gray-800/50 shadow-md overflow-hidden"
                >
                  <HeaderLearnMoreCard item={h} lang={lang} />
                </motion.div>
              ))}
            </div>
          </div> */}
          <SplitFeatureSection items={item.header_learn_more} lang={lang} />
        </section>

        {/* IMAGE + ARTICLE */}
        <div className="mb-24 flex flex-col md:flex-row md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative rounded-[1.5rem] overflow-hidden shadow-xl mb-10 md:mb-0 md:flex-[1.3] border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60"
            style={{ perspective: 1200 }}
          >
            <motion.img
              src={item.learn_more_image || item.img}
              alt={lmTitle}
              className="w-full md:h-full object-cover rounded-[1.5rem] will-change-transform"
              loading="lazy"
              whileHover={{ scale: 1.04, rotateZ: 0.2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-[1.5rem] pointer-events-none" />
          </motion.div>

          <article className="md:flex-1 max-w-3xl prose prose-lg prose-neutral dark:prose-invert leading-relaxed text-justify">
            <h1 className="mb-6 text-xl md:text-3xl tracking-tight border-b-4 border-primary pb-3 font-clash">
              {lmTitle}
            </h1>

            <PremiumJustifiedParagraph>{lmDesc}</PremiumJustifiedParagraph>
          </article>
        </div>

        {/* PORTFOLIO - Horizontal Showcase */}
        {item.portofolio_learn_more?.length > 0 && (
          <section className="mb-20">
            <GlobalSectionTitle
              title={t.learnMorePage.portfolio}
              className="mb-8"
            />
            <CarouselLearnMore
              cardWidth={300}
              gap={20}
              ariaLabel="Portfolio Carousel"
            >
              {item.portofolio_learn_more.map((p, i) => (
                <div
                  key={p.title_en + i}
                  className="
        rounded-2xl overflow-hidden shadow-lg
        bg-white/80 dark:bg-gray-900/70 
        border border-white/10
      "
                >
                  <PortfolioCard item={p} lang={lang} />
                </div>
              ))}
            </CarouselLearnMore>
          </section>
        )}

        {/* TEAM - Profile Grid */}
        {item.team_learn_more?.length > 0 && (
          <section className="mb-20">
            <GlobalSectionTitle title={t.learnMorePage.team} className="mb-8" />
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {item.team_learn_more.map((member, i) => (
                  <motion.div
                    key={member.name + i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                    className="group rounded-2xl bg-white/80 dark:bg-[#0b0c0f]/70 p-6 border border-white/8 shadow-md"
                  >
                    <TeamCard member={member} lang={lang} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </TemplateSection>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import HeaderLearnMoreCard from '../../components/HeaderLearnMoreCard';
import PortfolioCard from '../../components/PortfolioCard';
import TeamCard from '../../components/TeamCard';
import CarouselLearnMore from '../../components/CarouselLearnMore'; // import carousel
import { useI18n } from '../../i18n/I18nProvider';
import { motion } from 'framer-motion';
import Shimmer from '../../components/Shimmer';
import TemplateSection from '../../components/TemplateSection';

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
      });
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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary hover:underline transition-colors duration-300"
          aria-label={lang === 'id' ? 'Kembali' : 'Back'}
        >
          ← {lang === 'id' ? 'Kembali' : 'Back'}
        </button>

        {/* Title & Subtitle */}
        <GlobalSectionTitle
          title={lang === 'id' ? item.title_id : item.title_en}
          subtitle={lang === 'id' ? item.desc_id : item.desc_en}
          className="mb-14"
        />
        {/* Details Carousel */}
        <section className="mb-20">
          <GlobalSectionTitle
            title={t.learnMorePage.details}
            className="mb-10"
          />
          <CarouselLearnMore
            cardWidth={280}
            gap={24}
            ariaLabel="Details Carousel"
          >
            {item.header_learn_more?.map((h, i) => (
              <motion.div
                key={h.title_en + i}
                className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow duration-400 cursor-pointer"
                whileHover={{
                  y: -6,
                  boxShadow: '0 25px 40px rgba(0,0,0,0.15)',
                }}
              >
                <HeaderLearnMoreCard item={h} lang={lang} />
              </motion.div>
            ))}
          </CarouselLearnMore>
        </section>
        {/* Container 2 kolom: Image & Article Content */}
        <div className="mb-24 flex flex-col md:flex-row md:gap-16 items-start">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative rounded-[1.5rem] overflow-hidden shadow-lg mb-10 md:mb-0 md:flex-[1.3] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            style={{ perspective: 1200 }}
          >
            <motion.img
              src={item.learn_more_image || item.img}
              alt={lmTitle}
              className="w-full h-[480px] md:h-full object-cover rounded-[1.5rem] will-change-transform"
              loading="lazy"
              whileHover={{ scale: 1.04, rotateZ: 0.2 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-[1.5rem] pointer-events-none" />
          </motion.div>

          {/* Right: Article Content */}
          <article className="md:flex-1 max-w-3xl prose prose-lg prose-neutral dark:prose-invert leading-relaxed text-justify">
            <h1 className="mb-6 text-3xl  tracking-tight border-b-4 border-primary pb-3 font-clash">
              {lmTitle}
            </h1>
            <p className="indent-8 text-lg tracking-wide font-light">
              {lmDesc}
            </p>
          </article>
        </div>

        {/* Portfolio Carousel */}
        {item.portofolio_learn_more?.length > 0 && (
          <section className="mb-20">
            <GlobalSectionTitle
              title={t.learnMorePage.portfolio}
              className="mb-10"
            />
            <CarouselLearnMore
              cardWidth={280}
              gap={24}
              ariaLabel="Portfolio Carousel"
            >
              {item.portofolio_learn_more.map((p, i) => (
                <motion.div
                  key={p.title_en + i}
                  className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow duration-400 cursor-pointer"
                  whileHover={{
                    y: -6,
                    boxShadow: '0 25px 40px rgba(0,0,0,0.15)',
                  }}
                >
                  <PortfolioCard item={p} lang={lang} />
                </motion.div>
              ))}
            </CarouselLearnMore>
          </section>
        )}

        {/* Team Carousel */}
        {item.team_learn_more?.length > 0 && (
          <section className="mb-10">
            <GlobalSectionTitle
              title={t.learnMorePage.team}
              className="mb-10"
            />
            <CarouselLearnMore
              cardWidth={280}
              gap={24}
              ariaLabel="Team Carousel"
            >
              {item.team_learn_more.map((member, i) => (
                <motion.div
                  key={member.name + i}
                  className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow duration-400 cursor-pointer"
                  whileHover={{
                    y: -6,
                    boxShadow: '0 25px 40px rgba(0,0,0,0.15)',
                  }}
                >
                  <TeamCard member={member} lang={lang} />
                </motion.div>
              ))}
            </CarouselLearnMore>
          </section>
        )}
      </div>
    </TemplateSection>
  );
}

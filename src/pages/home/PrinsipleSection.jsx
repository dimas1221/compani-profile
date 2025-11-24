import React, { useEffect, useState } from 'react';
import GlobalCard from '../../components/GlobalCard';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
export const PrinsipleSection = () => {
  const { lang } = useI18n();
  const [itemsData, setItemsData] = useState(null);
  // Load ITEMS
  useEffect(() => {
    import('../../../public/data/principle_items.json')
      .then((res) => setItemsData(res.default.principle_items))
      .catch((err) =>
        console.error('Failed to load principle_items.json', err)
      );
  }, []);

  // Map items (image-based, multilingual)
  const mappedItems = itemsData?.map((item) => ({
    id: item.id,
    image: item.image,
    title: lang === 'id' ? item.title_id : item.title_en,
    subtitle: lang === 'id' ? item.subtitle_id : item.subtitle_en,
  }));
  return (
    <section
      className={`relative py-20 sm:py-28 px-6                 
                  transition-colors duration-700 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        {/* === Title Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlobalSectionTitle
            title={lang == 'id' ? 'Prinsip Kami' : 'Our Principle'}
          />
        </motion.div>

        {/* === Grid Section === */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {mappedItems?.map((item, i) => (
            <GlobalCard
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              date={item?.date}
              image={item.image}
              className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

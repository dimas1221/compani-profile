import React, { useEffect, useState } from 'react';
import GlobalCard from '../../components/GlobalCard';
import GlobalSectionTitle from '../../components/GlobalSectionTitle';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import GlobalSplitShowcase from '../../components/GlobalSplitShowcase';
export const PrinsipleSection = () => {
  const { lang } = useI18n();
  const bgHero = '/images/logo/principle.jpg';
  const desmaxVisionEn =
    "Maxvision Technology Corp. is a listed enterprise on the Main Board of the Shenzhen Stock Exchange (002990), headquartered in Shenzhen, China. It is a national high-tech company specializing in artificial intelligence, big data, the Internet of Things, and next-generation information technologies, providing intelligent products and 'AI+Industry' solutions to support the development of a smart society.";
  const desmaxJovEn =
    'Founded in 2000, Jovision is a provider of Intelligent Vision products and solutions. With over 25 years of R&D and manufacturing experience, it has established a Video + AI-based Intelligent Vision Service System and ranks 28th in A&S 2022 Global TOP50 and China TOP10 in the video surveillance industry.';
  const desmaxVisionIn =
    "Maxvision Technology Corp. adalah perusahaan yang terdaftar di Papan Utama Bursa Efek Shenzhen (002990) dan berkantor pusat di Shenzhen, Tiongkok. Perusahaan ini merupakan perusahaan teknologi tinggi nasional yang bergerak di bidang kecerdasan buatan, data besar, Internet of Things, dan teknologi informasi generasi baru, menyediakan produk cerdas dan solusi 'AI+Industry' untuk mendukung pembangunan masyarakat cerdas.";
  const desmaxJovIn =
    'Didirikan pada tahun 2000, Jovision adalah penyedia Produk dan Solusi Intelligent Vision. Dengan lebih dari 25 tahun pengalaman R&D dan manufaktur, perusahaan ini telah membangun Sistem Layanan Intelligent Vision berbasis Video + AI dan menempati peringkat ke-28 A&S 2022 Global TOP50 serta TOP10 China di bidang pengawasan video.';

  return (
    <section
      className={`relative px-6                 
                  transition-colors duration-700 overflow-hidden mt-5`}
    >
      <GlobalSectionTitle
        title={lang == 'id' ? 'Prinsip Kami' : 'Our Principle'}
      />
      <GlobalSplitShowcase
        title={lang === 'id' ? 'Tentang Maxision' : 'About Maxision'}
        paragraph={lang === 'id' ? desmaxVisionIn : desmaxVisionEn}
        image={bgHero}
        reverse={false}
      />

      <GlobalSplitShowcase
        title={lang == 'id' ? 'Tentang Jovision ' : 'About Jovision '}
        paragraph={lang === 'id' ? desmaxJovIn : desmaxJovEn}
        image={bgHero}
        reverse={true}
      />
    </section>
  );
};

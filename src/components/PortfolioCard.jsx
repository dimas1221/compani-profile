import React from 'react';
export default function PortfolioCard({ item, lang }) {
  return (
    <div className="bg-white dark:bg-gray-900  rounded-xl overflow-hidden ">
      <img
        src={item.image}
        alt={lang === 'id' ? item.title_id : item.title_en}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          {lang === 'id' ? item.title_id : item.title_en}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {lang === 'id' ? item.desc_id : item.desc_en}
        </p>
      </div>
    </div>
  );
}

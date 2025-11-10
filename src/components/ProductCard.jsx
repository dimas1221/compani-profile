import React from "react";
import { Wifi, Bluetooth, Rss } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { lang } = useI18n();

  const name = lang === "id" ? product.name_id : product.name_en;
  const short = lang === "id" ? product.short_id : product.short_en;
  const desc = lang === "id" ? product.desc_id : product.desc_en;

  const icons = {
    wifi: <Wifi size={16} className="text-blue-500" />,
    bluetooth: <Bluetooth size={16} className="text-indigo-500" />,
    mqtt: <Rss size={16} className="text-amber-500" />,
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200/70 dark:border-gray-800/70 hover:-translate-y-1 snap-start flex-shrink-0 w-72"
    >
      {/* Gambar dan hover overlay */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay muncul saat hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-200 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Konten bawah */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {short}
        </p>

        {/* Kompatibilitas */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {product.compatibility.map((c) => (
            <div
              key={c}
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {icons[c]} <span className="capitalize">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border efek */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/40 rounded-2xl transition-all duration-500 pointer-events-none"></div>
    </Link>
  );
}

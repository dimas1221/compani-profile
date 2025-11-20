import React, { useRef } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export default function ProductFilterBar({ data, selectedMain, onSelect }) {
  const { lang } = useI18n();
  const carouselRef = useRef(null);

  const countProducts = (cat) =>
    (cat.sub_categories || []).reduce(
      (acc, s) => acc + (s.products?.length || 0),
      0
    );

  return (
    <div className="relative w-full select-none">
      <GradientEdge side="left" />
      <GradientEdge side="right" />

      <motion.div
        ref={carouselRef}
        style={{
          overflowX: "auto",
          display: "flex",
          padding: "2.5rem 2rem 1.5rem", // beri top padding untuk ruang panah
          scrollbarWidth: "thin",
          scrollbarColor: "#60a5fa transparent",
        }}
        className="snap-x snap-mandatory scroll-smooth custom-scrollbar gap-2"
      >
        <FilterCard
          icon="Grid"
          title={lang === "id" ? "Semua Produk" : "All Products"}
          count={data.reduce((acc, c) => acc + countProducts(c), 0)}
          active={selectedMain === null}
          onClick={() => onSelect(null)}
        />

        {data.map((cat) => {
          const active = selectedMain === cat.id;
          const IconComp = Icons[cat.icon] || Icons.Box;
          return (
            <FilterCard
              key={cat.id}
              iconComp={IconComp}
              title={lang === "id" ? cat.name_id : cat.name_en}
              count={countProducts(cat)}
              active={active}
              onClick={() => onSelect(cat.id)}
            />
          );
        })}
      </motion.div>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] text-gray-400 dark:text-gray-500 opacity-70">
        ⇆ Scroll
      </div>
    </div>
  );
}

/* Fade kiri-kanan */
function GradientEdge({ side }) {
  const base =
    "absolute top-0 h-full w-16 pointer-events-none z-10 transition-opacity";
  if (side === "left") {
    return (
      <div
        className={`${base} left-0 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent`}
      />
    );
  } else {
    return (
      <div
        className={`${base} right-0 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent`}
      />
    );
  }
}

function FilterCard({
  icon,
  iconComp: IconComp,
  title,
  count,
  active,
  onClick,
}) {
  const IconUsed = IconComp || Icons[icon] || Icons.Box;
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`snap-center flex-shrink-0 flex items-center justify-between gap-3 rounded-2xl transition-all
        min-w-[120px] sm:min-w-[100px] h-[50px] px-4 sm:px-5 border shadow-sm backdrop-blur-md
        ${
          active
            ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg border-transparent"
            : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 hover:shadow-md"
        }`}
    >
      <div className="flex items-center gap-3 text-left">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
            ${
              active
                ? "bg-white/20"
                : "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-900"
            }`}
        >
          <IconUsed
            className={`w-5 h-5 ${
              active ? "text-white" : "text-sky-600 dark:text-sky-400"
            }`}
          />
        </div>
        <div>
          <div
            className={`font-semibold text-sm sm:text-base ${
              active ? "text-white" : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {title}
          </div>
          <div
            className={`text-[11px] sm:text-xs ${
              active ? "text-white/70" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {count} produk
          </div>
        </div>
      </div>
    </motion.button>
  );
}

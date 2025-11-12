import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

export default function ProductFilter({
  layout = "compact",
  data = [],
  onFilterChange,
}) {
  const { lang } = useI18n();
  const [selectedSubs, setSelectedSubs] = useState([]);

  // Ambil semua subcategory dari data utama
  const allSubCategories = data.flatMap((cat) => cat.sub_categories || []);

  const handleChange = (id) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    onFilterChange(selectedSubs);
  }, [selectedSubs]);

  const isCompact = layout === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${
        isCompact
          ? "flex flex-wrap gap-3 justify-center py-3"
          : "flex flex-col gap-4 p-4 border rounded-2xl shadow-sm bg-white dark:bg-neutral-900"
      }`}
    >
      {allSubCategories.map((sub) => (
        <label
          key={sub.id}
          className={`flex items-center gap-2 cursor-pointer ${
            isCompact ? "text-sm" : "text-base"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedSubs.includes(sub.id)}
            onChange={() => handleChange(sub.id)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>{lang === "id" ? sub.name_id : sub.name_en}</span>
        </label>
      ))}
    </motion.div>
  );
}

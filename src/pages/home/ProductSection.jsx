import { useState, useRef } from "react";
import ProductCarousel from "../../components/ProductCarousel";
import { dataFilterProduct } from "../../components/utils/dataObject";
import { useI18n } from "../../i18n/I18nProvider";

export default function ProductSection({ products = [] }) {
  const { lang, setLang, t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const carouselRef = useRef(null);

  const filters = dataFilterProduct;

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    if (direction === "left") {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-0">
          {lang === "en" ? "Products" : "Produk"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lang === "en" ? "Explore our product range" : "Jelajahi produk kami"}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 sm:space-x-4 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`
          whitespace-nowrap
          rounded-full font-medium transition
          px-2 py-1 sm:px-4 sm:py-2
          text-xs sm:text-sm
          ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }
        `}
              aria-pressed={isActive}
            >
              {lang === "en" ? filter.label_en : filter.label_id}
            </button>
          );
        })}
      </div>

      {/* Carousel with arrows */}
      <div className="relative">
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-full shadow-md w-10 h-10 text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-500 z-20 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <ProductCarousel products={products} carouselRef={carouselRef} />

        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-full shadow-md w-10 h-10 text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-500 z-20 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

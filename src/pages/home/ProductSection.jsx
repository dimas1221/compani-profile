import { useState, useRef, useMemo, useEffect } from "react";
import ProductCarousel from "../../components/ProductCarousel";
import { dataFilterProduct } from "../../components/utils/dataObject";
import { useI18n } from "../../i18n/I18nProvider";

export default function ProductSection({ products = [] }) {
  const { lang } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef(null);

  const filters = dataFilterProduct;

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter]);

  // ✅ Update state tombol arrow
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [filteredProducts]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
              className={`whitespace-nowrap rounded-full font-medium transition px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-pressed={isActive}
            >
              {lang === "en" ? filter.label_en : filter.label_id}
            </button>
          );
        })}
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 z-20 transition-all backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md ${
            canScrollLeft
              ? "bg-white/90 dark:bg-gray-900/90 text-blue-600 hover:scale-105"
              : "bg-gray-200/60 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed opacity-60"
          }`}
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

        {/* Product Carousel */}
        <ProductCarousel
          products={filteredProducts}
          carouselRef={carouselRef}
        />

        {/* Right Arrow */}
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 z-20 transition-all backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md ${
            canScrollRight
              ? "bg-white/90 dark:bg-gray-900/90 text-blue-600 hover:scale-105"
              : "bg-gray-200/60 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed opacity-60"
          }`}
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

// import { useState, useRef, useMemo, useEffect } from "react";
// import ProductCarousel from "../../components/ProductCarousel";
// import { dataFilterProduct } from "../../components/utils/dataObject";
// import { useI18n } from "../../i18n/I18nProvider";

// export default function ProductSection({ products = [] }) {
//   const { lang } = useI18n();
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);
//   const carouselRef = useRef(null);

//   const filters = dataFilterProduct;

//   const filteredProducts = useMemo(() => {
//     if (activeFilter === "all") return products;
//     return products.filter((p) => p.category === activeFilter);
//   }, [products, activeFilter]);

//   // ✅ Update state tombol arrow
//   const updateScrollButtons = () => {
//     if (!carouselRef.current) return;
//     const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
//     setCanScrollLeft(scrollLeft > 0);
//     setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
//   };

//   useEffect(() => {
//     const el = carouselRef.current;
//     if (!el) return;
//     updateScrollButtons();
//     el.addEventListener("scroll", updateScrollButtons);
//     window.addEventListener("resize", updateScrollButtons);
//     return () => {
//       el.removeEventListener("scroll", updateScrollButtons);
//       window.removeEventListener("resize", updateScrollButtons);
//     };
//   }, [filteredProducts]);

//   const scroll = (direction) => {
//     if (!carouselRef.current) return;
//     const scrollAmount = 320;
//     carouselRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-10 relative">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-0 font-calsans">
//           {lang === "en" ? "Products" : "Produk"}
//         </h3>
//         <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
//           {lang === "en" ? "Explore our product range" : "Jelajahi produk kami"}
//         </p>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex space-x-2 sm:space-x-4 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
//         {filters.map((filter) => {
//           const isActive = activeFilter === filter.key;
//           return (
//             <button
//               key={filter.key}
//               onClick={() => setActiveFilter(filter.key)}
//               className={`whitespace-nowrap rounded-full font-medium transition px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm ${
//                 isActive
//                   ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
//               }`}
//               aria-pressed={isActive}
//             >
//               {lang === "en" ? filter.label_en : filter.label_id}
//             </button>
//           );
//         })}
//       </div>

//       {/* Carousel */}
//       <div className="relative">
//         {/* Left Arrow */}
//         <button
//           aria-label="Scroll left"
//           onClick={() => scroll("left")}
//           disabled={!canScrollLeft}
//           className={`hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 z-20 transition-all backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md ${
//             canScrollLeft
//               ? "bg-white/90 dark:bg-gray-900/90 text-blue-600 hover:scale-105"
//               : "bg-gray-200/60 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed opacity-60"
//           }`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         {/* Product Carousel */}
//         <ProductCarousel
//           products={filteredProducts}
//           carouselRef={carouselRef}
//         />

//         {/* Right Arrow */}
//         <button
//           aria-label="Scroll right"
//           onClick={() => scroll("right")}
//           disabled={!canScrollRight}
//           className={`hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 z-20 transition-all backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md ${
//             canScrollRight
//               ? "bg-white/90 dark:bg-gray-900/90 text-blue-600 hover:scale-105"
//               : "bg-gray-200/60 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed opacity-60"
//           }`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dataProducts from "../../data/contoh_response_api.json";
import { useI18n } from "../../i18n/I18nProvider";
import ProductCarousel from "../../components/ProductCarousel";
import { X, Filter } from "lucide-react"; // pastikan sudah punya lucide-react

export default function ProductSection() {
  const { lang } = useI18n();
  const [selectedMain, setSelectedMain] = useState("all");
  const [selectedSubs, setSelectedSubs] = useState([]); // ✅ multiple select
  const [showMobileFilter, setShowMobileFilter] = useState(false); // ✅ for mobile panel
  const carouselRef = useRef();

  // === Ambil kategori utama unik ===
  const mainCategories = useMemo(() => {
    const seen = new Set();
    return dataProducts
      .map((c) => c.main_category)
      .filter((m) => {
        if (seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      });
  }, []);

  // === Cari kategori utama aktif ===
  const currentMain = useMemo(() => {
    if (selectedMain === "all") return null;
    return dataProducts.find((m) => m.main_category.id === selectedMain);
  }, [selectedMain]);

  const subCategories = currentMain?.sub_categories || [];

  // === Ambil produk aktif ===
  const currentProducts = useMemo(() => {
    if (selectedMain === "all") {
      // semua produk dari semua kategori
      const allProducts = dataProducts.flatMap((m) =>
        m.sub_categories.flatMap((s) => s.products)
      );
      if (selectedSubs.length === 0) return allProducts;

      return allProducts.filter((p) =>
        selectedSubs.includes(p.sub_category_id)
      );
    }

    const allMainProducts = subCategories.flatMap((s) => s.products);

    if (selectedSubs.length === 0) return allMainProducts;

    return allMainProducts.filter((p) =>
      selectedSubs.includes(p.sub_category_id)
    );
  }, [selectedMain, selectedSubs, subCategories]);

  // === Handle toggle subcategory multiple ===
  const toggleSubCategory = (subId) => {
    setSelectedSubs((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const clearFilters = () => {
    setSelectedSubs([]);
    setSelectedMain("all");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 font-calsans">
          {lang === "en" ? "Products" : "Produk"}
        </h3>

        {/* Tombol Filter untuk Mobile */}
        <button
          className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
          onClick={() => setShowMobileFilter(true)}
        >
          <Filter className="w-4 h-4" />
          {lang === "en" ? "Filter" : "Filter"}
        </button>
      </div>

      {/* === Filter Area (Desktop) === */}
      <div className="hidden md:block">
        {/* === Main Category Filter === */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              setSelectedMain("all");
              setSelectedSubs([]);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
              ${
                selectedMain === "all"
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {lang === "en" ? "All Products" : "Semua Produk"}
          </button>

          {mainCategories.map((main) => (
            <button
              key={main.id}
              onClick={() => {
                setSelectedMain(main.id);
                setSelectedSubs([]);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${
                  selectedMain === main.id
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border-transparent"
                    : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-400"
                }`}
            >
              {lang === "en" ? main.name_en : main.name_id}
            </button>
          ))}
        </div>

        {/* === Sub Category Filter === */}
        {subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-200 dark:border-gray-700 pt-4">
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => toggleSubCategory(sub.id)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border
                  ${
                    selectedSubs.includes(sub.id)
                      ? "bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow border-transparent"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-sky-400"
                  }`}
              >
                {lang === "en" ? sub.name_en : sub.name_id}
              </button>
            ))}

            {(selectedMain !== "all" || selectedSubs.length > 0) && (
              <button
                onClick={clearFilters}
                className="ml-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-all"
              >
                {lang === "en" ? "Clear Filters" : "Hapus Filter"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* === Mobile Filter Modal === */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-50 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {lang === "en" ? "Filter Products" : "Filter Produk"}
              </h4>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Main Category */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === "en" ? "Main Category" : "Kategori Utama"}
                </h5>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedMain("all");
                      setSelectedSubs([]);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      selectedMain === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {lang === "en" ? "All" : "Semua"}
                  </button>

                  {mainCategories.map((main) => (
                    <button
                      key={main.id}
                      onClick={() => {
                        setSelectedMain(main.id);
                        setSelectedSubs([]);
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                        selectedMain === main.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {lang === "en" ? main.name_en : main.name_id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Category */}
              {subCategories.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {lang === "en" ? "Sub Categories" : "Sub Kategori Produk"}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => toggleSubCategory(sub.id)}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border
                          ${
                            selectedSubs.includes(sub.id)
                              ? "bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow border-transparent"
                              : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-sky-400"
                          }`}
                      >
                        {lang === "en" ? sub.name_en : sub.name_id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tombol Apply & Clear */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  {lang === "en" ? "Apply Filter" : "Terapkan"}
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  {lang === "en" ? "Clear" : "Hapus"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Product Carousel === */}
      <ProductCarousel
        products={currentProducts}
        carouselRef={carouselRef}
        loading={false}
      />

      {/* === Empty State === */}
      {currentProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          {lang === "en"
            ? "No products found in this category."
            : "Tidak ada produk di kategori ini."}
        </div>
      )}
    </section>
  );
}

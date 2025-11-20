import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import ProductCarousel from "../../components/ProductCarousel";
import { X, Filter } from "lucide-react";

export default function ProductSection({ idProductActive = null }) {
  const { lang } = useI18n();
  const [selectedMain, setSelectedMain] = useState("all");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const carouselRef = useRef();
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product.json");
        return res.json();
      })
      .then((json) => {
        console.log("✅ Loaded product data:", json);
        if (Array.isArray(json.main_categories)) {
          setDataProducts(json.main_categories);
        } else {
          console.error("❌ Invalid JSON format:", json);
        }
      })
      .catch((err) => console.error("Error loading product data:", err));
  }, []);

  // === Ambil kategori utama ===
  const mainCategories = useMemo(() => {
    return dataProducts.map((c) => ({
      id: c.id,
      name_en: c.name_en,
      name_id: c.name_id,
    }));
  }, [dataProducts]);

  // === Cari kategori utama aktif ===
  const currentMain = useMemo(() => {
    if (selectedMain === "all") return null;
    return dataProducts.find((m) => m.id === selectedMain);
  }, [selectedMain, dataProducts]);

  const subCategories = currentMain?.sub_categories || [];

  // === Ambil produk aktif ===
  // const currentProducts = useMemo(() => {
  //   if (!dataProducts.length) return [];

  //   // Semua produk
  //   if (selectedMain === "all") {
  //     const allProducts = dataProducts.flatMap((m) =>
  //       (m.sub_categories || []).flatMap((s) =>
  //         (s.products || []).map((p) => ({
  //           ...p,
  //           sub_category_id: s.id,
  //         }))
  //       )
  //     );
  //     if (!selectedSubs.length) return allProducts;
  //     return allProducts.filter((p) =>
  //       selectedSubs.includes(p.sub_category_id)
  //     );
  //   }

  //   // Produk dalam kategori utama tertentu
  //   const allMainProducts = (subCategories || []).flatMap((s) =>
  //     (s.products || []).map((p) => ({
  //       ...p,
  //       sub_category_id: s.id,
  //     }))
  //   );

  //   if (!selectedSubs.length) return allMainProducts;
  //   return allMainProducts.filter((p) =>
  //     selectedSubs.includes(p.sub_category_id)
  //   );
  // }, [selectedMain, selectedSubs, subCategories, dataProducts]);
  const currentProducts = useMemo(() => {
    if (!dataProducts.length) return [];

    let productsPool = [];

    // === Semua produk ===
    if (selectedMain === "all") {
      productsPool = dataProducts.flatMap((m) =>
        (m.sub_categories || []).flatMap((s) =>
          (s.products || []).map((p) => ({
            ...p,
            sub_category_id: s.id,
          }))
        )
      );
    } else {
      // === Produk dalam main category tertentu ===
      productsPool = (subCategories || []).flatMap((s) =>
        (s.products || []).map((p) => ({
          ...p,
          sub_category_id: s.id,
        }))
      );
    }

    // === Filter berdasarkan sub category ===
    if (selectedSubs.length) {
      productsPool = productsPool.filter((p) =>
        selectedSubs.includes(p.sub_category_id)
      );
    }

    // === ❗ FILTER TAMBAHAN: Exclude idProductActive ===
    if (idProductActive) {
      productsPool = productsPool.filter((p) => p.id !== idProductActive);
    }

    return productsPool;
  }, [
    selectedMain,
    selectedSubs,
    subCategories,
    dataProducts,
    idProductActive,
  ]);

  // === Toggle subcategory multiple ===
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

        {/* Tombol Filter (Mobile) */}
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
        {/* Main Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={clearFilters}
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

        {/* Sub Category Filter */}
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
                    onClick={clearFilters}
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

              {/* Apply & Clear */}
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
        loading={!dataProducts.length}
      />

      {/* === Empty State === */}
      {dataProducts.length > 0 && currentProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          {lang === "en"
            ? "No products found in this category."
            : "Tidak ada produk di kategori ini."}
        </div>
      )}
    </section>
  );
}

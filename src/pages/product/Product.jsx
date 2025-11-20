import React, { useState, useMemo, useEffect } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import ProductFilterBar from "../../components/ProductFilterBar";
import ProductSidebarFilter from "../../components/ProductSidebarFilter";
import ProductGrid from "../../components/ProductGrid";
import GlobalButton from "../../components/GlobalButton";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";

export default function Product() {
  const { lang } = useI18n();
  const [data, setData] = useState(null);
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Fetch JSON dinamis
  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading product data:", err));
  }, []);

  const categories = data?.main_categories || [];

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedMain) || null,
    [selectedMain, categories]
  );

  const allProducts = useMemo(() => {
    const sources = selectedCategory ? [selectedCategory] : categories;
    return sources.flatMap((cat) =>
      (cat.sub_categories || []).flatMap((sub) =>
        (sub.products || []).map((p) => ({
          ...p,
          subId: sub.id,
          mainId: cat.id,
        }))
      )
    );
  }, [selectedCategory, categories]);

  const allSubcategories = useMemo(() => {
    if (selectedCategory) return selectedCategory.sub_categories || [];
    return categories.flatMap((cat) => cat.sub_categories || []);
  }, [selectedCategory, categories]);

  const filteredProducts = useMemo(() => {
    if (!selectedSubs.length) return allProducts;
    return allProducts.filter((p) => selectedSubs.includes(p.subId));
  }, [allProducts, selectedSubs]);

  if (!data)
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <p>Loading product catalogue...</p>
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <GlobalSectionTitle
        title={lang === "id" ? "Produk Kami" : "Our Products"}
      />

      <ProductFilterBar
        data={categories}
        selectedMain={selectedMain}
        onSelect={(id) => {
          setSelectedMain(id);
          setSelectedSubs([]);
        }}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3">
          <ProductSidebarFilter
            subCategories={allSubcategories}
            selectedSubs={selectedSubs}
            onChangeSubs={setSelectedSubs}
          />
        </div>

        {/* Main Content */}
        <section className="lg:col-span-9 flex flex-col">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap sm:flex-nowrap">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                {selectedCategory
                  ? lang === "id"
                    ? selectedCategory.name_id
                    : selectedCategory.name_en
                  : lang === "id"
                  ? "Semua Produk"
                  : "All Products"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                {filteredProducts.length}{" "}
                {lang === "id" ? "produk" : "products"}
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex-shrink-0">
              <GlobalButton
                size="small"
                className="px-5 py-2 rounded-md shadow-md hover:shadow-lg transition bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowMobileSidebar(true)}
              >
                {lang === "id" ? "Menyaring" : "Filter"}
              </GlobalButton>
            </div>
          </div>

          {/* Product Grid with padding & gap optimized for mobile */}
          <div className="flex-grow">
            <ProductGrid
              products={filteredProducts}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            />
          </div>
        </section>
      </div>

      {/* Mobile Sidebar Overlay */}
      <ProductSidebarFilter
        isMobile
        subCategories={allSubcategories}
        selectedSubs={selectedSubs}
        onChangeSubs={setSelectedSubs}
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
      />
    </main>
  );
}

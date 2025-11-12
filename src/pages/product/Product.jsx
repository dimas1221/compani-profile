// src/pages/ProductPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import ProductFilterBar from "../../components/ProductFilterBar";
import ProductSidebarFilter from "../../components/ProductSidebarFilter";
import ProductGrid from "../../components/ProductGrid";
import productsData from "../../data/contoh_response_api.json";
import GlobalButton from "../../components/GlobalButton";
import GlobalSectionTitle from "../../components/GlobalSectionTitle";

export default function Product() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { lang } = useI18n();
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const selectedCategory = useMemo(
    () => productsData.find((c) => c.main_category.id === selectedMain) || null,
    [selectedMain]
  );

  const allProducts = useMemo(() => {
    const sources = selectedCategory ? [selectedCategory] : productsData;
    return sources.flatMap((cat) =>
      cat.sub_categories.flatMap((sub) =>
        (sub.products || []).map((p) => ({
          ...p,
          subId: sub.id,
          mainId: cat.main_category.id,
        }))
      )
    );
  }, [selectedCategory]);

  const allSubcategories = useMemo(() => {
    if (selectedCategory) return selectedCategory.sub_categories || [];
    return productsData.flatMap((cat) => cat.sub_categories || []);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (!selectedSubs.length) return allProducts;
    return allProducts.filter((p) => selectedSubs.includes(p.subId));
  }, [allProducts, selectedSubs]);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <GlobalSectionTitle
        title={lang === "id" ? "Produk Kami" : "Our Products"}
      />

      <ProductFilterBar
        data={productsData}
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
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {selectedCategory
                  ? lang === "id"
                    ? selectedCategory.main_category.name_id
                    : selectedCategory.main_category.name_en
                  : lang === "id"
                  ? "Semua Produk"
                  : "All Products"}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredProducts.length}{" "}
                {lang === "id" ? "produk" : "products"}
              </p>
            </div>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-5 flex justify-start">
              <GlobalButton
                size="small"
                children={lang === "id" ? "Filter" : "Filter"}
                onClick={() => setShowMobileSidebar(true)}
              />
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
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

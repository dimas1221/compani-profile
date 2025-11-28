// import { useState, useMemo, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useI18n } from "../../i18n/I18nProvider";
// import ProductCarousel from "../../components/ProductCarousel";
// import { X, Filter } from "lucide-react";

// export default function ProductSection({ idProductActive = null }) {
//   const { lang } = useI18n();
//   const [selectedMain, setSelectedMain] = useState("all");
//   const [selectedSubs, setSelectedSubs] = useState([]);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const carouselRef = useRef();
//   const [dataProducts, setDataProducts] = useState([]);

//   useEffect(() => {
//     fetch("/data/product.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch product.json");
//         return res.json();
//       })
//       .then((json) => {
//         console.log("✅ Loaded product data:", json);
//         if (Array.isArray(json.main_categories)) {
//           setDataProducts(json.main_categories);
//         } else {
//           console.error("❌ Invalid JSON format:", json);
//         }
//       })
//       .catch((err) => console.error("Error loading product data:", err));
//   }, []);

//   // === Ambil kategori utama ===
//   const mainCategories = useMemo(() => {
//     return dataProducts.map((c) => ({
//       id: c.id,
//       name_en: c.name_en,
//       name_id: c.name_id,
//     }));
//   }, [dataProducts]);

//   // === Cari kategori utama aktif ===
//   const currentMain = useMemo(() => {
//     if (selectedMain === "all") return null;
//     return dataProducts.find((m) => m.id === selectedMain);
//   }, [selectedMain, dataProducts]);

//   const subCategories = currentMain?.sub_categories || [];

//   // === Ambil produk aktif ===
//   // const currentProducts = useMemo(() => {
//   //   if (!dataProducts.length) return [];

//   //   // Semua produk
//   //   if (selectedMain === "all") {
//   //     const allProducts = dataProducts.flatMap((m) =>
//   //       (m.sub_categories || []).flatMap((s) =>
//   //         (s.products || []).map((p) => ({
//   //           ...p,
//   //           sub_category_id: s.id,
//   //         }))
//   //       )
//   //     );
//   //     if (!selectedSubs.length) return allProducts;
//   //     return allProducts.filter((p) =>
//   //       selectedSubs.includes(p.sub_category_id)
//   //     );
//   //   }

//   //   // Produk dalam kategori utama tertentu
//   //   const allMainProducts = (subCategories || []).flatMap((s) =>
//   //     (s.products || []).map((p) => ({
//   //       ...p,
//   //       sub_category_id: s.id,
//   //     }))
//   //   );

//   //   if (!selectedSubs.length) return allMainProducts;
//   //   return allMainProducts.filter((p) =>
//   //     selectedSubs.includes(p.sub_category_id)
//   //   );
//   // }, [selectedMain, selectedSubs, subCategories, dataProducts]);
//   const currentProducts = useMemo(() => {
//     if (!dataProducts.length) return [];

//     let productsPool = [];

//     // === Semua produk ===
//     if (selectedMain === "all") {
//       productsPool = dataProducts.flatMap((m) =>
//         (m.sub_categories || []).flatMap((s) =>
//           (s.products || []).map((p) => ({
//             ...p,
//             sub_category_id: s.id,
//           }))
//         )
//       );
//     } else {
//       // === Produk dalam main category tertentu ===
//       productsPool = (subCategories || []).flatMap((s) =>
//         (s.products || []).map((p) => ({
//           ...p,
//           sub_category_id: s.id,
//         }))
//       );
//     }

//     // === Filter berdasarkan sub category ===
//     if (selectedSubs.length) {
//       productsPool = productsPool.filter((p) =>
//         selectedSubs.includes(p.sub_category_id)
//       );
//     }

//     // === ❗ FILTER TAMBAHAN: Exclude idProductActive ===
//     if (idProductActive) {
//       productsPool = productsPool.filter((p) => p.id !== idProductActive);
//     }

//     return productsPool;
//   }, [
//     selectedMain,
//     selectedSubs,
//     subCategories,
//     dataProducts,
//     idProductActive,
//   ]);

//   // === Toggle subcategory multiple ===
//   const toggleSubCategory = (subId) => {
//     setSelectedSubs((prev) =>
//       prev.includes(subId)
//         ? prev.filter((id) => id !== subId)
//         : [...prev, subId]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedSubs([]);
//     setSelectedMain("all");
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//       {/* === Header === */}
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 font-calsans">
//           {lang === "en" ? "Products" : "Produk"}
//         </h3>

//         {/* Tombol Filter (Mobile) */}
//         <button
//           className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
//           onClick={() => setShowMobileFilter(true)}
//         >
//           <Filter className="w-4 h-4" />
//           {lang === "en" ? "Filter" : "Filter"}
//         </button>
//       </div>

//       {/* === Filter Area (Desktop) === */}
//       <div className="hidden md:block">
//         {/* Main Category Filter */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           <button
//             onClick={clearFilters}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
//               ${
//                 selectedMain === "all"
//                   ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg"
//                   : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               }`}
//           >
//             {lang === "en" ? "All Products" : "Semua Produk"}
//           </button>

//           {mainCategories.map((main) => (
//             <button
//               key={main.id}
//               onClick={() => {
//                 setSelectedMain(main.id);
//                 setSelectedSubs([]);
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
//                 ${
//                   selectedMain === main.id
//                     ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border-transparent"
//                     : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-400"
//                 }`}
//             >
//               {lang === "en" ? main.name_en : main.name_id}
//             </button>
//           ))}
//         </div>

//         {/* Sub Category Filter */}
//         {subCategories.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-200 dark:border-gray-700 pt-4">
//             {subCategories.map((sub) => (
//               <button
//                 key={sub.id}
//                 onClick={() => toggleSubCategory(sub.id)}
//                 className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border
//                   ${
//                     selectedSubs.includes(sub.id)
//                       ? "bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow border-transparent"
//                       : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-sky-400"
//                   }`}
//               >
//                 {lang === "en" ? sub.name_en : sub.name_id}
//               </button>
//             ))}

//             {(selectedMain !== "all" || selectedSubs.length > 0) && (
//               <button
//                 onClick={clearFilters}
//                 className="ml-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-all"
//               >
//                 {lang === "en" ? "Clear Filters" : "Hapus Filter"}
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* === Mobile Filter Modal === */}
//       <AnimatePresence>
//         {showMobileFilter && (
//           <motion.div
//             initial={{ opacity: 0, y: "100%" }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: "100%" }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-white dark:bg-neutral-950 z-50 flex flex-col p-6 overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                 {lang === "en" ? "Filter Products" : "Filter Produk"}
//               </h4>
//               <button
//                 onClick={() => setShowMobileFilter(false)}
//                 className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//               >
//                 <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {/* Main Category */}
//               <div>
//                 <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                   {lang === "en" ? "Main Category" : "Kategori Utama"}
//                 </h5>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={clearFilters}
//                     className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
//                       selectedMain === "all"
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
//                     }`}
//                   >
//                     {lang === "en" ? "All" : "Semua"}
//                   </button>

//                   {mainCategories.map((main) => (
//                     <button
//                       key={main.id}
//                       onClick={() => {
//                         setSelectedMain(main.id);
//                         setSelectedSubs([]);
//                       }}
//                       className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
//                         selectedMain === main.id
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
//                       }`}
//                     >
//                       {lang === "en" ? main.name_en : main.name_id}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sub Category */}
//               {subCategories.length > 0 && (
//                 <div>
//                   <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     {lang === "en" ? "Sub Categories" : "Sub Kategori Produk"}
//                   </h5>
//                   <div className="flex flex-wrap gap-2">
//                     {subCategories.map((sub) => (
//                       <button
//                         key={sub.id}
//                         onClick={() => toggleSubCategory(sub.id)}
//                         className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border
//                           ${
//                             selectedSubs.includes(sub.id)
//                               ? "bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow border-transparent"
//                               : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-sky-400"
//                           }`}
//                       >
//                         {lang === "en" ? sub.name_en : sub.name_id}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Apply & Clear */}
//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={() => setShowMobileFilter(false)}
//                   className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//                 >
//                   {lang === "en" ? "Apply Filter" : "Terapkan"}
//                 </button>
//                 <button
//                   onClick={clearFilters}
//                   className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
//                 >
//                   {lang === "en" ? "Clear" : "Hapus"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* === Product Carousel === */}
//       <ProductCarousel
//         products={currentProducts}
//         carouselRef={carouselRef}
//         loading={!dataProducts.length}
//       />

//       {/* === Empty State === */}
//       {dataProducts.length > 0 && currentProducts.length === 0 && (
//         <div className="text-center text-gray-500 dark:text-gray-400 py-10">
//           {lang === "en"
//             ? "No products found in this category."
//             : "Tidak ada produk di kategori ini."}
//         </div>
//       )}
//     </section>
//   );
// }

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import ProductCarousel from '../../components/ProductCarousel';
import { X, Filter } from 'lucide-react';

export default function ProductSection({ idProductActive = null }) {
  const { lang } = useI18n();

  // State filter
  const [selectedMain, setSelectedMain] = useState('all');
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataProducts, setDataProducts] = useState([]);

  const carouselRef = useRef();

  // Load data produk
  useEffect(() => {
    fetch('/data/product.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product.json');
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json.main_categories)) {
          setDataProducts(json.main_categories);
        } else {
          console.error('Invalid JSON format:', json);
        }
      })
      .catch((err) => console.error('Error loading product data:', err));
  }, []);

  // Simpan & load filter ke localStorage
  useEffect(() => {
    const saved = localStorage.getItem('productFilters');
    if (saved) {
      const { selectedMain, selectedSubs, searchTerm } = JSON.parse(saved);
      if (selectedMain) setSelectedMain(selectedMain);
      if (selectedSubs) setSelectedSubs(selectedSubs);
      if (searchTerm) setSearchTerm(searchTerm);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'productFilters',
      JSON.stringify({ selectedMain, selectedSubs, searchTerm })
    );
  }, [selectedMain, selectedSubs, searchTerm]);

  // Derived data
  const mainCategories = useMemo(() => {
    return dataProducts.map((c) => ({
      id: c.id,
      name_en: c.name_en,
      name_id: c.name_id,
    }));
  }, [dataProducts]);

  const currentMain = useMemo(() => {
    if (selectedMain === 'all') return null;
    return dataProducts.find((m) => m.id === selectedMain);
  }, [selectedMain, dataProducts]);

  const subCategories = currentMain?.sub_categories || [];

  // Filter subkategori by search term
  const filteredSubCategories = useMemo(() => {
    if (!searchTerm) return subCategories;
    return subCategories.filter((sub) => {
      const name = lang === 'en' ? sub.name_en : sub.name_id;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, subCategories, lang]);

  // Filter produk sesuai filter aktif
  const currentProducts = useMemo(() => {
    if (!dataProducts.length) return [];

    let productsPool = [];

    if (selectedMain === 'all') {
      productsPool = dataProducts.flatMap((m) =>
        (m.sub_categories || []).flatMap((s) =>
          (s.products || []).map((p) => ({
            ...p,
            sub_category_id: s.id,
          }))
        )
      );
    } else {
      productsPool = (subCategories || []).flatMap((s) =>
        (s.products || []).map((p) => ({
          ...p,
          sub_category_id: s.id,
        }))
      );
    }

    if (selectedSubs.length) {
      productsPool = productsPool.filter((p) =>
        selectedSubs.includes(p.sub_category_id)
      );
    }

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

  // Toggle subkategori
  const toggleSubCategory = (subId) => {
    setSelectedSubs((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  // Clear filter semua
  const clearFilters = () => {
    setSelectedSubs([]);
    setSelectedMain('all');
    setSearchTerm('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 font-clash">
          {lang === 'en' ? 'Products' : 'Produk'}
        </h3>

        {/* Tombol filter mobile */}
        <button
          className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
          onClick={() => setShowMobileFilter(true)}
          aria-label={lang === 'en' ? 'Open filter' : 'Buka filter'}
        >
          <Filter className="w-4 h-4" />
          {lang === 'en' ? 'Filter' : 'Filter'}
        </button>
      </div>

      {/* Filter Desktop */}
      <div className="hidden md:block">
        {/* Kategori utama */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={clearFilters}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
        ${
          selectedMain === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_4px_10px_rgb(59,130,246,0.4)]'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
        tracking-wide
      `}
            aria-label={lang === 'en' ? 'All products' : 'Semua produk'}
          >
            {lang === 'en' ? 'All Products' : 'Semua Produk'}
          </button>

          {mainCategories.map((main) => (
            <button
              key={main.id}
              onClick={() => {
                setSelectedMain(main.id);
                setSelectedSubs([]);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
          ${
            selectedMain === main.id
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border-transparent'
              : 'bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-400'
          }
          tracking-wide
        `}
              aria-pressed={selectedMain === main.id}
            >
              {lang === 'en' ? main.name_en : main.name_id}
            </button>
          ))}
        </div>

        {/* Sub kategori */}
        {subCategories.length > 0 && (
          <div className="mb-6 max-w-xl">
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 tracking-wide">
              {lang === 'en' ? 'Sub Categories' : 'Sub Kategori Produk'}
            </h5>

            {/* Search subkategori */}
            <input
              type="text"
              placeholder={
                lang === 'en'
                  ? 'Search subcategories...'
                  : 'Cari subkategori...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-70 transition"
              aria-label={
                lang === 'en' ? 'Search subcategories' : 'Cari subkategori'
              }
            />

            <div className="flex flex-wrap gap-2 max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-transparent">
              {filteredSubCategories.map((sub) => (
                <label
                  key={sub.id}
                  className="flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-shadow duration-200 shadow-sm hover:shadow-md"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubs.includes(sub.id)}
                    onChange={() => toggleSubCategory(sub.id)}
                    className="form-checkbox h-4 w-4 text-sky-600 transition duration-150"
                  />
                  <span className="text-xs sm:text-sm select-none">
                    {lang === 'en' ? sub.name_en : sub.name_id}
                  </span>
                </label>
              ))}
            </div>

            {(selectedMain !== 'all' ||
              selectedSubs.length > 0 ||
              searchTerm) && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-shadow duration-200 shadow-sm hover:shadow-md"
                aria-label={lang === 'en' ? 'Clear filters' : 'Hapus filter'}
              >
                {lang === 'en' ? 'Clear Filters' : 'Hapus Filter'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile filter modal */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-50 flex flex-col p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-dialog-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h4
                id="filter-dialog-title"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {lang === 'en' ? 'Filter Products' : 'Filter Produk'}
              </h4>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                aria-label={lang === 'en' ? 'Close filter' : 'Tutup filter'}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-6 overflow-auto">
              {/* Main Category */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'en' ? 'Main Category' : 'Kategori Utama'}
                </h5>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={clearFilters}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      selectedMain === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang === 'en' ? 'All' : 'Semua'}
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang === 'en' ? main.name_en : main.name_id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Category */}
              {subCategories.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {lang === 'en' ? 'Sub Categories' : 'Sub Kategori Produk'}
                  </h5>

                  {/* Search input */}
                  <input
                    type="text"
                    placeholder={
                      lang === 'en'
                        ? 'Search subcategories...'
                        : 'Cari subkategori...'
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    aria-label={
                      lang === 'en'
                        ? 'Search subcategories'
                        : 'Cari subkategori'
                    }
                  />

                  <div className="flex flex-wrap gap-2 max-h-48 overflow-auto">
                    {filteredSubCategories.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded border transition
                      border-gray-300 dark:border-gray-700
                      hover:border-sky-500 dark:hover:border-sky-400
                      bg-gray-50 dark:bg-gray-800
                      text-gray-700 dark:text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubs.includes(sub.id)}
                          onChange={() => toggleSubCategory(sub.id)}
                          className="form-checkbox h-4 w-4 text-sky-600"
                        />
                        <span className="text-xs sm:text-sm">
                          {lang === 'en' ? sub.name_en : sub.name_id}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply & Clear Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  {lang === 'en' ? 'Apply Filter' : 'Terapkan'}
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  {lang === 'en' ? 'Clear' : 'Hapus'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Carousel */}
      <ProductCarousel
        products={currentProducts}
        carouselRef={carouselRef}
        loading={!dataProducts.length}
      />

      {/* Empty state */}
      {dataProducts.length > 0 && currentProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          {lang === 'en'
            ? 'No products found in this category.'
            : 'Tidak ada produk di kategori ini.'}
        </div>
      )}
    </section>
  );
}

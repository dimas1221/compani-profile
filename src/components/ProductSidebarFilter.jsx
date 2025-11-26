// // src/components/ProductSidebarFilter.jsx
// import React, { useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useI18n } from '../i18n/I18nProvider';
// import GlobalButton from './GlobalButton';

// import { X } from 'lucide-react';

// export default function ProductSidebarFilter({
//   subCategories = [],
//   selectedSubs = [],
//   onChangeSubs,
//   isMobile = false,
//   showMobileSidebar,
//   setShowMobileSidebar,
// }) {
//   const { lang } = useI18n();

//   const toggle = (id) => {
//     if (selectedSubs.includes(id))
//       onChangeSubs(selectedSubs.filter((s) => s !== id));
//     else onChangeSubs([...selectedSubs, id]);
//   };

//   const clearAll = () => onChangeSubs([]);

//   // Prevent body scroll when mobile sidebar open
//   useEffect(() => {
//     if (isMobile) {
//       document.body.style.overflow = showMobileSidebar ? 'hidden' : 'auto';
//     }
//   }, [isMobile, showMobileSidebar]);

//   const SidebarContent = (
//     <div
//       className="flex flex-col h-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg
//                  border-r border-gray-200 dark:border-neutral-800"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
//         <h4 className="font-semibold text-sm tracking-wide">
//           {lang === 'id' ? 'Filter Subkategori' : 'Subcategory Filter'}
//         </h4>

//         {isMobile ? (
//           <button
//             onClick={() => setShowMobileSidebar(false)}
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         ) : selectedSubs.length > 0 ? (
//           <button
//             onClick={clearAll}
//             className="text-[12px] text-sky-600 hover:underline"
//           >
//             {lang === 'id' ? 'Hapus Semua' : 'Clear All'}
//           </button>
//         ) : null}
//       </div>

//       {/* Scrollable content */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-3">
//         {subCategories.length === 0 ? (
//           <p className="text-gray-400 text-sm">
//             {lang === 'id'
//               ? 'Tidak ada subkategori.'
//               : 'No subcategories available.'}
//           </p>
//         ) : (
//           subCategories.map((s) => (
//             <div
//               key={s.id}
//               className="border-b border-gray-100 dark:border-neutral-800 pb-2"
//             >
//               <label className="flex items-start gap-3 cursor-pointer select-none group">
//                 <input
//                   type="checkbox"
//                   checked={selectedSubs.includes(s.id)}
//                   onChange={() => toggle(s.id)}
//                   className="mt-1 w-4 h-4 accent-sky-600 cursor-pointer"
//                 />
//                 <div className="flex-1">
//                   <div className="text-sm font-medium group-hover:text-sky-600 transition-colors">
//                     {lang === 'id' ? s.name_id : s.name_en}
//                   </div>
//                   {s.products?.length > 0 && (
//                     <div className="text-xs text-gray-400">
//                       {s.products.length}{' '}
//                       {lang === 'id' ? 'produk' : 'products'}
//                     </div>
//                   )}
//                 </div>
//               </label>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t dark:border-neutral-700">
//         <GlobalButton
//           text={lang === 'id' ? 'Bersihkan Filter' : 'Clear Filter'}
//           onClick={clearAll}
//           variant="outline"
//           className="w-full"
//         />
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* === Desktop Sidebar (Sticky + Independent Scroll) === */}
//       {!isMobile && (
//         <div className="lg:w-72 sticky top-[120px] h-[calc(100vh-120px)] overflow-hidden">
//           {SidebarContent}
//         </div>
//       )}

//       {/* === Mobile Sidebar Overlay === */}
//       <AnimatePresence>
//         {isMobile && showMobileSidebar && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex"
//           >
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 120, damping: 20 }}
//               className="ml-auto w-full sm:w-[80%] h-full shadow-xl"
//             >
//               {SidebarContent}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
// src/components/ProductSidebarFilter.jsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nProvider';
import GlobalButton from './GlobalButton';

import { X, Search } from 'lucide-react';

export default function ProductSidebarFilter({
  subCategories = [],
  selectedSubs = [],
  onChangeSubs,
  isMobile = false,
  showMobileSidebar,
  setShowMobileSidebar,
}) {
  const { lang } = useI18n();
  const [search, setSearch] = useState('');

  const toggle = (id) => {
    if (selectedSubs.includes(id))
      onChangeSubs(selectedSubs.filter((s) => s !== id));
    else onChangeSubs([...selectedSubs, id]);
  };

  const clearAll = () => onChangeSubs([]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = showMobileSidebar ? 'hidden' : 'auto';
    }
  }, [isMobile, showMobileSidebar]);

  // Search filter
  const filteredSubs = subCategories.filter((s) => {
    const n = lang === 'id' ? s.name_id : s.name_en;
    return n.toLowerCase().includes(search.toLowerCase());
  });

  const SidebarContent = (
    <div
      className="
      flex flex-col h-full 
      bg-white/10 dark:dark:bg-neutral-900/90
      backdrop-blur-xl
      border-r border-white/20 dark:border-white/5
      shadow-[0_8px_30px_rgb(0,0,0,0.08)]
      dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]
      rounded-lg
    "
    >
      {/* Glow Animated Border */}
      <motion.div
        className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-white/10"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/10">
        <h4 className="font-semibold text-sm tracking-wide">
          {lang === 'id' ? 'Filter Subkategori' : 'Subcategory Filter'}
        </h4>

        {isMobile ? (
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        ) : selectedSubs.length > 0 ? (
          <button
            onClick={clearAll}
            className="text-[12px] text-sky-600 hover:underline"
          >
            {lang === 'id' ? 'Hapus Semua' : 'Clear All'}
          </button>
        ) : null}
      </div>

      {/* Search Input */}
      <div className="px-4 pt-3 pb-2">
        <div
          className="
          relative group 
          bg-white/20 dark:bg-black/20 
          backdrop-blur-md 
          rounded-xl 
          border border-white/30 dark:border-white/10
          shadow-inner
          transition-all"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === 'id' ? 'Cari subkategori…' : 'Search subcategory…'
            }
            className="
              w-full pl-10 pr-3 py-2 
              text-sm  dark:text-white 
              bg-transparent 
              outline-none dark:placeholder:text-white/40
            "
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-3">
        {filteredSubs.length === 0 ? (
          <p className="text-gray-400 text-sm">
            {lang === 'id' ? 'Tidak ditemukan.' : 'No results found.'}
          </p>
        ) : (
          filteredSubs.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="
                border-b border-white/10 dark:border-white/5 pb-2 
                transition-all
              "
            >
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={selectedSubs.includes(s.id)}
                  onChange={() => toggle(s.id)}
                  className="
                    mt-1 w-4 h-4 
                    accent-sky-500 
                    cursor-pointer
                  "
                />
                <div className="flex-1">
                  <div
                    className="
                      text-sm font-medium 
                      group-hover:text-sky-400 
                      transition-colors
                    "
                  >
                    {lang === 'id' ? s.name_id : s.name_en}
                  </div>
                  {s.products?.length > 0 && (
                    <div className="text-xs text-white/40">
                      {s.products.length}{' '}
                      {lang === 'id' ? 'produk' : 'products'}
                    </div>
                  )}
                </div>
              </label>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 dark:border-white/10">
        <GlobalButton
          text={lang === 'id' ? 'Bersihkan Filter' : 'Clear Filter'}
          onClick={clearAll}
          variant="outline"
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky) */}
      {!isMobile && (
        <div className="lg:w-72 sticky top-[120px] h-[calc(100vh-120px)] overflow-hidden relative">
          {SidebarContent}
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && showMobileSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="ml-auto w-full sm:w-[80%] h-full shadow-xl"
            >
              {SidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

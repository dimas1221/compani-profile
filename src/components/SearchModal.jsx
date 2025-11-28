import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useI18n } from '../i18n/I18nProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const { lang } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/products_flat/index.json')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((err) => console.error('Error loading product data:', err));
  }, []);

  // INSTANT SEARCH – tanpa debounce
  const filteredProducts = query
    ? products.filter((product) => {
        const name = lang === 'id' ? product.name_id : product.name_en;
        return name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[90]
        bg-white/70 dark:bg-black/70
        backdrop-blur-2xl
        overflow-y-auto
        transition-all duration-300
      "
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* ░░ FLOATING CLOSE BUTTON ala iOS Spotlight ░░ */}
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Close Search"
        className="
          fixed top-6 right-6 z-[110]
          w-11 h-11 rounded-full
          flex items-center justify-center
          backdrop-blur-xl
          bg-white/50 dark:bg-gray-900/50
          shadow-[0_4px_16px_rgba(0,0,0,0.25)]
          dark:shadow-[0_0_18px_rgba(255,255,255,0.14)]
          border border-white/20 dark:border-white/10
          transition-all duration-200
        "
      >
        <span className="text-xl text-gray-800 dark:text-gray-200">✕</span>
      </motion.button>

      {/* ░░ SEARCH BAR PREMIUM ░░ */}
      <div
        className="
          sticky top-0 z-40
          w-full max-w-3xl mx-auto
          px-4 sm:px-6 pt-14 pb-5
          flex items-center gap-3
        "
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          spellCheck={false}
          className="
            flex-1 px-4 py-3 rounded-2xl
            text-sm sm:text-base
            bg-white/80 dark:bg-gray-800/80
            border border-gray-300/50 dark:border-gray-700/50
            text-gray-900 dark:text-gray-100
            shadow-[0_2px_10px_rgba(0,0,0,0.12)]
            dark:shadow-[0_0_22px_rgba(255,255,255,0.06)]
            focus:ring-2 focus:ring-primary-500
            focus:outline-none
            transition-all duration-200
          "
        />
      </div>

      {/* ░░ RESULTS GRID ░░ */}
      <div
        className="
          w-full max-w-7xl mx-auto
          px-4 sm:px-6 pb-24
          grid gap-6
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5
        "
      >
        {query && filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-300 font-medium mt-10">
            No products found for <span className="italic">“{query}”</span>.
          </p>
        )}

        {/* Animated product cards */}
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleProductClick(product.id)
              }
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

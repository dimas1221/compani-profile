import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useI18n } from '../i18n/I18nProvider';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [products, setProducts] = useState([]);
  const { lang } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/products_flat/index.json')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((err) => console.error('Error loading product data:', err));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const filteredProducts = debouncedQuery
    ? products.filter((product) => {
        const name = lang === 'id' ? product.name_id : product.name_en;
        return name.toLowerCase().includes(debouncedQuery.toLowerCase());
      })
    : [];

  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center pt-14 pb-8
                 bg-white dark:bg-gray-950 transition-all duration-300
                 overflow-y-auto"
      style={{ WebkitOverflowScrolling: 'touch' }} // smooth scrolling di iOS
    >
      {/* Search Bar */}
      <div
        className="w-full max-w-xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-2
                   sticky top-0 bg-white dark:bg-gray-950 py-3 border-b border-gray-300 dark:border-gray-700 shadow-sm z-20"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:flex-1 px-3 py-2 rounded-lg text-sm sm:text-base border border-gray-300 dark:border-gray-700
                     bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-semibold
                     focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          autoFocus
          spellCheck={false}
        />
        <button
          onClick={() => alert(`Searching for: ${query}`)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600
                     text-white font-semibold text-sm shadow-md transition"
        >
          Search
        </button>
        <button
          onClick={onClose}
          aria-label="Close Search Modal"
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700
                     text-gray-700 dark:text-gray-200 font-semibold text-sm shadow-md transition"
        >
          Cancel
        </button>
      </div>

      {/* Results Grid */}
      <div
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-6
                   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {debouncedQuery && filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base">
            No products found for{' '}
            <span className="italic">“{debouncedQuery}”</span>.
          </p>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleProductClick(product.id)
            }
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

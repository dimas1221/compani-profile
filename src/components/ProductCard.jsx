import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, lang }) {
  const name = lang === "en" ? product.name_en : product.name_id;
  const short = lang === "en" ? product.short_en : product.short_id;

  return (
    <Link
      to={`/product/${product.id}`}
      className="min-w-[180px] sm:min-w-[220px] md:min-w-[260px] shrink-0 snap-start"
      aria-label={name}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border
          border-transparent hover:border-gradient-to-r hover:from-blue-500 hover:via-sky-400 hover:to-blue-500
          transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex flex-col h-full"
      >
        <div className="relative h-32 sm:h-40 md:h-52 w-full overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            loading="lazy"
            draggable={false}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-2
            bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500"
          />
        </div>

        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h4
            className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-100 truncate"
            title={name}
          >
            {name}
          </h4>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 mt-1 flex-grow line-clamp-2">
            {short}
          </p>
          <div className="mt-3">
            <span
              className="inline-block text-blue-600 dark:text-sky-400 font-semibold text-[10px] sm:text-xs
              bg-blue-100 dark:bg-sky-900/40 px-2 py-0.5 rounded-full shadow-sm select-none"
            >
              {product.price === 0 ? "Free" : `$${product.price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

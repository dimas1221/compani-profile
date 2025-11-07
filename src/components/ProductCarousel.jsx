import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import React from "react";

export default function ProductCarousel({
  products = [],
  lang,
  loading = false,
  carouselRef,
}) {
  if (loading) {
    return (
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto px-4 py-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 md:gap-6 md:px-6 md:py-6"
      >
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        className="flex items-stretch gap-4 overflow-x-auto px-4 py-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 md:gap-6 md:px-6 md:py-6"
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} lang={lang} />
        ))}
      </div>
    </div>
  );
}

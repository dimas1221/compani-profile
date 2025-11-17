import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCarousel({
  products = [],
  loading = false,
  carouselRef,
}) {
  const localRef = useRef();
  const ref = carouselRef || localRef;

  const cardWidth = 260; // max width card (md breakpoint)
  const scrollBy = cardWidth + 28; // width + margin-right (7rem ~ 28px)

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -scrollBy, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: scrollBy, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full select-none">
      {/* Panah di atas, sebelah kanan */}

      <div className="absolute top-0 right-0 flex gap-2 p-2 z-20">
        <motion.button
          onClick={scrollLeft}
          aria-label="Scroll left"
          whileTap={{ scale: 0.85 }}
          className="
      p-2 rounded-md
      bg-gradient-to-tr from-white/90 to-gray-200/80
      dark:from-neutral-800/90 dark:to-neutral-700/80
      shadow-[0_4px_6px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]
      hover:shadow-[0_6px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]
      transition-shadow duration-300 ease-in-out
      flex items-center justify-center
      text-blue-600 dark:text-blue-400
      cursor-pointer
      md:p-2 md:w-10 md:h-10
      w-8 h-8 mr-4
    "
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6 w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={scrollRight}
          aria-label="Scroll right"
          whileTap={{ scale: 0.85 }}
          className="
      p-2 rounded-md
      bg-gradient-to-tr from-white/90 to-gray-200/80
      dark:from-neutral-800/90 dark:to-neutral-700/80
      shadow-[0_4px_6px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]
      hover:shadow-[0_6px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]
      transition-shadow duration-300 ease-in-out
      flex items-center justify-center
      text-blue-600 dark:text-blue-400
      cursor-pointer
      md:p-2 md:w-10 md:h-10
      w-8 h-8
    "
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
        >
          <ChevronRight size={20} className="md:w-6 md:h-6 w-5 h-5" />
        </motion.button>
      </div>

      <br />
      <div
        ref={ref}
        style={{
          overflowX: "auto",
          display: "flex",
          padding: "2.5rem 2rem 1.5rem", // beri top padding untuk ruang panah
          scrollbarWidth: "thin",
          scrollbarColor: "#60a5fa transparent",
        }}
        className="snap-x snap-mandatory scroll-smooth custom-scrollbar"
      >
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="snap-start flex-shrink-0 mr-7"
                  style={{ width: 220 }}
                >
                  <ProductCardSkeleton />
                </div>
              ))
          : products.map((p, i) => (
              <div
                key={p.id}
                className={`snap-start flex-shrink-0 mr-7 w-[220px] sm:w-[240px] md:w-[260px]`}
                style={{
                  marginRight: i === products.length - 1 ? 0 : undefined,
                }}
              >
                <div className="rounded-lg shadow-lg overflow-hidden">
                  <ProductCard product={p} />
                </div>
              </div>
            ))}
      </div>

      {/* Scroll hint */}
      {products.length > 4 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-70 select-none pointer-events-none">
          ⇆ Scroll
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductCarousel({
  products = [],
  loading = false,
  carouselRef,
}) {
  const localRef = useRef();
  const ref = carouselRef || localRef;
  const controls = useAnimation();
  const lastScroll = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // let ticking = false;
    // const handleScroll = () => {
    //   if (!ticking) {
    //     window.requestAnimationFrame(() => {
    //       const delta = el.scrollLeft - lastScroll.current;
    //       lastScroll.current = el.scrollLeft;

    //       el.querySelectorAll(".product-card").forEach((card) => {
    //         const offset = card.offsetLeft - el.scrollLeft;
    //         const depth = Math.sin(offset / 250) * 6;
    //         card.style.transform = `translateY(${depth}px) scale(1.02)`;
    //       });

    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // };

    // el.addEventListener("scroll", handleScroll);
    // return () => el.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return (
    <div className="relative w-full select-none">
      <motion.div
        ref={ref}
        animate={controls}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="flex items-stretch gap-6 overflow-x-auto px-4 py-6 snap-x snap-mandatory scroll-smooth
                   scrollbar-none hide-scrollbar cursor-grab active:cursor-grabbing"
      >
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((p) => (
              <motion.div
                key={p.id}
                className="product-card flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] transition-transform duration-500 ease-out"
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
      </motion.div>

      {/* Scroll hint */}
      {products.length > 4 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-70">
          ⇆ Scroll
        </div>
      )}
    </div>
  );
}

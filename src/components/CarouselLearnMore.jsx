import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CarouselLearnMore({
  children,
  cardWidth = 280,
  gap = 24,
  ariaLabel = 'Carousel',
}) {
  const containerRef = useRef();

  const scrollBy = cardWidth + gap;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full select-none" aria-label={ariaLabel}>
      {/* Arrow Buttons */}
      {/* <div className="absolute top-0 right-0 flex gap-2 p-2 z-20">
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
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
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
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
        >
          <ChevronRight size={20} className="md:w-6 md:h-6 w-5 h-5" />
        </motion.button>
      </div> */}

      <div
        ref={containerRef}
        className="snap-x snap-mandatory scroll-smooth overflow-x-auto flex pb-6 pt-10 px-4"
        style={{
          gap: gap,
          scrollbarWidth: 'thin',
          scrollbarColor: '#60a5fa transparent',
        }}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="snap-start flex-shrink-0"
            style={{ width: cardWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function CarouselLearnMore({
  children,
  cardWidth = 320,
  gap = 24,
  ariaLabel = 'Carousel',
}) {
  const containerRef = useRef();

  return (
    <div className="relative w-full select-none" aria-label={ariaLabel}>
      <div
        ref={containerRef}
        className="
          snap-x snap-mandatory scroll-smooth overflow-x-auto flex
          pb-8 pt-14 px-4 items-stretch
        "
        style={{ gap: gap }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 flex items-stretch"
            style={{ width: cardWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

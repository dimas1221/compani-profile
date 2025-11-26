// PremiumJustifiedParagraph.jsx
// A polished paragraph component with smart justification, balanced text, and smooth typography.

import React from 'react';
import clsx from 'clsx';

export default function PremiumJustifiedParagraph({ children, className }) {
  return (
    <p
      className={clsx(
        'text-lg leading-relaxed font-light text-justify text-balance hyphens-auto', // core typography
        'tracking-wide indent-8', // premium spacing
        '[text-wrap:balance] [text-rendering:optimizeLegibility]', // enhanced readability
        'selection:bg-primary/20 dark:selection:bg-primary/30', // premium text selection
        className
      )}
      style={{
        wordSpacing: '0.01em', // smooth justification
        lineHeight: '1.8', // elegant line height
      }}
    >
      {children}
    </p>
  );
}

// Usage Example:
// <PremiumJustifiedParagraph>
//   {lmDesc}
// </PremiumJustifiedParagraph>

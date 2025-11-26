// PremiumJustifiedParagraph.jsx
import React from 'react';
import clsx from 'clsx';

export default function PremiumJustifiedParagraph({ children, className }) {
  return (
    <p
      className={clsx(
        // Core Apple style typography
        'text-[17px] md:text-[18px] leading-[1.75] font-[370]',
        'text-neutral-800 dark:text-neutral-200',
        'antialiased subpixel-antialiased',
        'tracking-[0.003em]',

        // Apple News justification style
        'text-justify',
        'hyphens-auto',
        'text-balance', // Apple-like balance

        // Premium spacing
        'indent-6 md:indent-8',
        'selection:bg-blue-200/40 dark:selection:bg-blue-500/30',

        // Fix weird space distribution for long paragraphs
        '[text-wrap:pretty]',
        '[word-spacing:0.02em]',
        '[text-rendering:optimizeLegibility]',

        className
      )}
      style={{
        WebkitHyphens: 'auto',
        overflowWrap: 'break-word',
        textJustify: 'inter-character',
        fontVariantLigatures: 'common-ligatures contextual',
        fontKerning: 'normal', // Apple kerning
        lineHeight: '1.75',
      }}
    >
      {children}
    </p>
  );
}

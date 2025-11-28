// import React from 'react';
// import { Wifi, Bluetooth, Rss } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useI18n } from '../i18n/I18nProvider';

// export default function ProductCard({ product }) {
//   const { lang } = useI18n();

//   const name = lang === 'id' ? product.name_id : product.name_en;
//   const short = lang === 'id' ? product.short_id : product.short_en;
//   // const desc = lang === "id" ? product.desc_id : product.desc_en;

//   const icons = {
//     wifi: <Wifi size={14} className="text-blue-500" />,
//     bluetooth: <Bluetooth size={14} className="text-indigo-500" />,
//     mqtt: <Rss size={14} className="text-amber-500" />,
//   };

//   return (
//     <Link
//       to={`/product/${product.id}`}
//       className="group relative block bg-white/95 dark:bg-neutral-900/95 rounded-2xl border border-gray-200/60 dark:border-gray-800/70
//                  shadow-[0_3px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]
//                  backdrop-blur-sm transition-transform duration-300 transform hover:-translate-y-1
//                  w-[220px] sm:w-[240px] md:w-[260px] overflow-hidden h-[300px] sm:h-[350px]"
//     >
//       {/* === IMAGE === */}
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <img
//           src={product.image}
//           alt={name}
//           draggable={false}
//           className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
//         />
//       </div>

//       {/* === CARD CONTENT === */}
//       <div
//         className="card-content p-4 transition-all duration-300 ease-out bg-white/95 dark:bg-neutral-900/95
//                    relative z-10 group-hover:-translate-y-5 group-hover:opacity-0"
//       >
//         <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
//           {name}
//         </h3>
//         <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
//           {short}
//         </p>

//         <div className="flex gap-1.5 mt-3 flex-wrap">
//           {product.compatibility?.map((c) => (
//             <div
//               key={c}
//               className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/70
//                          px-2 py-0.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
//             >
//               {icons[c]} <span className="capitalize">{c}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* === HOVER OVERLAY === */}
//       <div
//         className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 text-white
//                    rounded-2xl overflow-hidden
//                    bg-gradient-to-br from-sky-900/95 via-sky-800/95 to-blue-700/90
//                    transform translate-y-full opacity-0
//                    group-hover:translate-y-0 group-hover:opacity-100
//                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
//       >
//         <p className="text-sm font-semibold mb-2 drop-shadow-md">{name}</p>
//         <p
//           className="
//     text-pretty
//     text-balance
//     text-white/90
//     text-[13px]
//     leading-[1.55]
//     font-light
//     tracking-[0.002em]
//     [hyphens:auto]
//     [overflow-wrap:anywhere]
//   "
//         >
//           {short}
//         </p>
//       </div>
//     </Link>
//   );
// }

import React from 'react';
import { Wifi, Bluetooth, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';

export default function ProductCard({ product }) {
  const { lang } = useI18n();

  const name = lang === 'id' ? product.name_id : product.name_en;
  const short = lang === 'id' ? product.short_id : product.short_en;

  const icons = {
    wifi: <Wifi size={14} className="text-blue-500" />,
    bluetooth: <Bluetooth size={14} className="text-indigo-500" />,
    mqtt: <Rss size={14} className="text-amber-500" />,
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="
        group relative block rounded-2xl overflow-hidden
        bg-white/90 dark:bg-neutral-900/90
        backdrop-blur-md
        border border-gray-200/60 dark:border-gray-800/70
        
        shadow-[0_6px_18px_rgba(0,0,0,0.08)]
        dark:shadow-[0_0_22px_rgba(255,255,255,0.05)]
        
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)]
        dark:hover:shadow-[0_0_26px_rgba(255,255,255,0.08)]
        
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-2 hover:scale-[1.015]
        
        w-full h-[320px] sm:h-[360px]
      "
    >
      {/* ================= IMAGE ================== */}
      <div className="relative h-[55%] overflow-hidden">
        <img
          src={product.image}
          alt={name}
          draggable={false}
          className="
            w-full h-full object-cover
            transition-all duration-[1200ms]
            group-hover:scale-110 group-hover:brightness-[1.08]
          "
        />

        {/* subtle glass gradient top */}
        <div
          className="
          absolute top-0 inset-x-0 h-12
          bg-gradient-to-b from-black/10 to-transparent
        "
        />
      </div>

      {/* ============= CONTENT =============== */}
      <div
        className="
          relative p-4 
          transition-all duration-300
        "
      >
        <h3
          className="
            text-[15px] sm:text-base font-semibold
            text-gray-900 dark:text-gray-100
            line-clamp-1
          "
        >
          {name}
        </h3>

        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
          {short}
        </p>

        <div className="flex gap-1.5 mt-3 flex-wrap">
          {product.compatibility?.map((c) => (
            <div
              key={c}
              className="
                flex items-center gap-1
                px-2 py-[3px]
                rounded-full
                text-xs font-medium
                bg-gray-100 dark:bg-gray-800/70
                text-gray-700 dark:text-gray-300
                border border-gray-200/40 dark:border-gray-700/40
                backdrop-blur-sm
              "
            >
              {icons[c]} <span className="capitalize">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============= PREMIUM OVERLAY (NEW) ============= */}
      {/* === HOVER OVERLAY === */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 text-white
                   rounded-2xl overflow-hidden
                   bg-gradient-to-br from-sky-900/95 via-sky-800/95 to-blue-700/90
                   transform translate-y-full opacity-0
                   group-hover:translate-y-0 group-hover:opacity-100
                   transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      >
        <p className="text-sm font-semibold mb-2 drop-shadow-md">{name}</p>
        <p
          className="
          text-pretty
          text-balance
          text-white/90
          text-[13px]
          leading-[1.55]
          font-light
          tracking-[0.002em]
          [hyphens:auto]
          [overflow-wrap:anywhere]
        "
        >
          {short}
        </p>
      </div>
    </Link>
  );
}

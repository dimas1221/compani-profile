// import React from 'react';
// import { motion } from 'framer-motion';

// export default function HeaderLearnMoreCard({ item, lang }) {
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl"
//     >
//       <img
//         src={item.image}
//         className="w-full h-36 object-cover rounded-md"
//         alt={lang === 'id' ? item.title_id : item.title_en}
//       />
//       <div>
//         <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//           {lang === 'id' ? item.title_id : item.title_en}
//         </div>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//           {lang === 'id' ? item.desc_id : item.desc_en}
//         </p>
//       </div>
//     </motion.div>
//   );
// }
import React from 'react';
import { motion } from 'framer-motion';

export default function HeaderLearnMoreCard({ item, lang }) {
  return (
    <motion.div
      className="
        flex flex-col h-full
        gap-3 p-5 rounded-xl
        bg-white dark:bg-gray-900
        transition-all duration-500
      "
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <img
        src={item.image}
        className="w-full h-40 object-cover rounded-lg"
        alt={lang === 'id' ? item.title_id : item.title_en}
      />

      {/* Text Section */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            {lang === 'id' ? item.title_id : item.title_en}
          </h3>

          <p
            className="
              text-sm text-gray-600 dark:text-gray-300 mt-2
              line-clamp-3
            "
          >
            {lang === 'id' ? item.desc_id : item.desc_en}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

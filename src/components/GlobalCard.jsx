import React from "react";

export default function GlobalCard({ icon, title, subtitle }) {
  return (
    <div
      className="
        group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
        rounded-2xl border border-gray-200/70 dark:border-gray-800/70 
        shadow-md hover:shadow-2xl hover:border-blue-300/50 dark:hover:border-sky-500/40
        transition-all duration-500 hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-gray-900/90
        p-6 flex flex-col justify-start text-center
      "
    >
      {icon && (
        <div className="mb-4 text-blue-600 dark:text-sky-400 text-4xl mx-auto transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

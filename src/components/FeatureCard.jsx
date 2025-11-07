import React from "react";

export default function FeatureCard({ title, subtitle, image }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
      <div className="h-48 w-full overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug sm:leading-tight">
          {title}
        </h3>
        <p className="mt-1 sm:mt-3 text-gray-600 dark:text-gray-300 text-xs sm:text-base leading-tight sm:leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

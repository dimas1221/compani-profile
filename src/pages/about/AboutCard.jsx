import React from "react";
import GlobalCard3d from "../../components/GlobalCard3d";

export default function AboutCard({ icon: Icon, title, subs }) {
  return (
    <GlobalCard3d
      className="
        w-full h-[360px] md:h-[420px]
        bg-white dark:bg-neutral-900 
        rounded-3xl border border-neutral-200 dark:border-neutral-800
        shadow-xl hover:shadow-2xl
        overflow-hidden p-6 flex flex-col justify-between
        transition-all duration-300
      "
    >
      {/* ICON */}
      <div className="flex justify-center mt-4">
        <Icon className="w-20 h-20 text-neutral-800 dark:text-neutral-100" />
      </div>

      {/* TEXT */}
      <div className="text-center space-y-2 px-4">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>

        <div className="text-neutral-600 dark:text-neutral-300 text-sm space-y-1">
          {subs.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-center">
        <button
          className="
            px-6 py-2 mt-4 rounded-full 
            bg-blue-600 dark:bg-blue-500 
            text-white text-sm font-medium 
            shadow-md hover:shadow-lg 
            transition-all duration-300
          "
        >
          Learn More
        </button>
      </div>
    </GlobalCard3d>
  );
}

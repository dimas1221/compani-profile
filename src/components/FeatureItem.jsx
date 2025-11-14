import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function FeatureItem({ text }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="
        flex items-start space-x-4 
        p-4 rounded-xl 
        bg-white dark:bg-neutral-800 
        shadow-md border border-gray-200 dark:border-gray-700
        hover:shadow-xl transition-all
      "
    >
      <div
        className="
        flex-shrink-0 mt-1 w-7 h-7 
        bg-gradient-to-br from-blue-500 to-cyan-400 
        rounded-full flex items-center justify-center 
        text-white shadow-md
      "
      >
        <Check size={16} strokeWidth={3} />
      </div>

      <p className="text-gray-900 dark:text-gray-100 text-base leading-snug">
        {text}
      </p>
    </motion.div>
  );
}

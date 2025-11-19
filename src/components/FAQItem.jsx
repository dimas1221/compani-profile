import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {question}
        </span>

        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-700 dark:text-gray-300"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4 text-gray-600 dark:text-gray-300"
          >
            {answer ? answer : "—"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

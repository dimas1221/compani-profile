import { useState } from "react";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-start pt-20 bg-white dark:bg-gray-950 transition-all duration-300">
      {/* Topbar - Search Input */}
      <div className="w-full max-w-4xl mx-auto px-5 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="flex-1 px-5 py-4 rounded-2xl text-lg border border-gray-300 dark:border-gray-700 
          bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-[Inter]
          focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
          autoFocus
        />
        <button
          onClick={() => alert(`Searching for: ${query}`)}
          className="px-6 py-4 rounded-2xl font-semibold text-white text-base
          bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 transition-all duration-200 shadow-sm"
        >
          Search
        </button>
        <button
          onClick={onClose}
          className="px-6 py-4 rounded-2xl font-semibold text-gray-700 dark:text-gray-200 text-base
          bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
        >
          Cancel
        </button>
      </div>

      {/* Optional search results placeholder */}
      <div className="w-full max-w-4xl mx-auto px-6 mt-8 font-[Inter] text-gray-600 dark:text-gray-300 text-center animate-fadeIn">
        {query ? (
          <p>
            Showing results for{" "}
            <span className="font-semibold text-blue-600">“{query}”</span>
          </p>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-base">
            Start typing to search across the site...
          </p>
        )}
      </div>
    </div>
  );
}

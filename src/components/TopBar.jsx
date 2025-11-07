// import { useEffect, useState } from "react";

// export default function TopBar({ lang, setLang }) {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => setVisible(window.scrollY < 60);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full z-50
//         bg-gradient-to-r from-blue-700/80 to-sky-600/80 dark:from-gray-900/80 dark:to-gray-800/80
//         backdrop-blur-sm shadow-lg
//         flex justify-end items-center px-6 py-3
//         transition-transform duration-300
//         ${visible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"}
//       `}
//     >
//       <button
//         onClick={() => setLang("en")}
//         className={`mr-4 px-4 py-1 rounded-full
//           transition-colors duration-300
//           ${
//             lang === "en"
//               ? "bg-cyan-400 text-white font-semibold shadow-md"
//               : "text-white/70 hover:text-white"
//           }
//         `}
//         aria-pressed={lang === "en"}
//       >
//         English
//       </button>
//       <button
//         onClick={() => setLang("id")}
//         className={`px-4 py-1 rounded-full
//           transition-colors duration-300
//           ${
//             lang === "id"
//               ? "bg-cyan-400 text-white font-semibold shadow-md"
//               : "text-white/70 hover:text-white"
//           }
//         `}
//         aria-pressed={lang === "id"}
//       >
//         Indonesia
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function TopBar({ lang, setLang, onVisibilityChange }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY < 60;
      setVisible(isVisible);
      if (onVisibilityChange) onVisibilityChange(isVisible);
    };
    window.addEventListener("scroll", handleScroll);

    // notify initial state
    if (onVisibilityChange) onVisibilityChange(visible);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onVisibilityChange, visible]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50
        bg-gradient-to-r from-blue-700/80 to-sky-600/80 dark:from-gray-900/80 dark:to-gray-800/80
        backdrop-blur-sm shadow-lg
        flex justify-end items-center px-6 py-3
        transition-transform transition-opacity duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"}
      `}
    >
      <button
        onClick={() => setLang("en")}
        className={`mr-4 px-4 py-1 rounded-full
          transition-colors duration-300
          ${
            lang === "en"
              ? "bg-cyan-400 text-white font-semibold shadow-md"
              : "text-white/70 hover:text-white"
          }
        `}
        aria-pressed={lang === "en"}
      >
        English
      </button>
      <button
        onClick={() => setLang("id")}
        className={`px-4 py-1 rounded-full
          transition-colors duration-300
          ${
            lang === "id"
              ? "bg-cyan-400 text-white font-semibold shadow-md"
              : "text-white/70 hover:text-white"
          }
        `}
        aria-pressed={lang === "id"}
      >
        Indonesia
      </button>
    </div>
  );
}

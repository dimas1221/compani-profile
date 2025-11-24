/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // === Brand Color Palette ===
        primary: {
          50: "#f5f8ff",
          100: "#e9f0ff",
          200: "#c8dbff",
          300: "#a6c5ff",
          400: "#6f9eff",
          500: "#2b6ef6", // utama (biru korporat)
          600: "#1d57d9",
          700: "#1848b3",
          800: "#143a8c",
          900: "#0e2761",
        },
        accent: {
          50: "#e6fffa",
          100: "#b2f5ea",
          200: "#81e6d9",
          300: "#4fd1c5",
          400: "#38b2ac",
          500: "#0ea5a4", // tosca lembut
          600: "#0c8584",
          700: "#0a6666",
          800: "#084747",
          900: "#062f2f",
        },
        // === Neutral ===
        light: {
          bg: "#f9fafb",
          card: "#ffffff",
          text: "#1e293b",
          muted: "#64748b",
        },
        dark: {
          bg: "#0e1116",
          card: "#1a1d25",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        soft: "0 4px 15px rgba(0,0,0,0.05)",
        glow: "0 0 15px rgba(43,110,246,0.25)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        calsans: ["Cal Sans", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"], // untuk navbar
        clash: ["Clash Display", "sans-serif"], // untuk title
      },
      keyframes: {
        fireflyBlink: {
          "0%, 20%, 40%, 60%, 80%, 100%": { opacity: "0.2" },
          "10%, 30%, 50%, 70%, 90%": { opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        firefly: "fireflyBlink 3s infinite ease-in-out",
        float: "float 4s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

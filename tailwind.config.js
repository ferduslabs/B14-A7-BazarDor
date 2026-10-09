/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf7f2",
        "cream-dark": "#f5efe6",
        "dhaner-shobuj": "#059669",
        "dhaner-shobuj-light": "#10b981",
        amber: "#f97316",
        "amber-light": "#fb923c",
        "price-up": "#ef4444",
        "price-down": "#10b981",
        "price-flat": "#6b7280",
      },
      fontFamily: {
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    base: false,
  },
};

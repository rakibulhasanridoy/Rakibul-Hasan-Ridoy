import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-source-sans)", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0f",
        surface: "#14141f",
        "text-primary": "#e8e6e3",
        gold: "#c9a227",
        purple: "#7c6a9a",
      },
    },
  },
  plugins: [],
};

export default config;

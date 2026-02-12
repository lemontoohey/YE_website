import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(248 250 252)", // slate-50
        onSurface: "rgb(2 6 23)", // slate-950
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
        "block": "clamp(1.5rem, 4vw, 3rem)",
      },
    },
  },
  plugins: [],
};
export default config;

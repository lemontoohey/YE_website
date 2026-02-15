import type { Config } from "tailwindcss";

const config: Config = {
  safelist: [
    "bg-accent-500",
    "bg-ember-500",
    "bg-cream-200",
    "bg-crime-yellow",
    "bg-vice-pink",
    "bg-white",
  ],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#090205",
        },
        blood: {
          950: "#1a050b",
        },
        parchment: {
          100: "#E8E1D5",
        },
        accent: {
          500: "#FF5A5F",
          glow: "rgba(255, 90, 95, 0.4)",
        },
        ember: {
          500: "#EA580C",
        },
        cream: {
          200: "#F5F5F4",
        },
        "crime-yellow": "#FEF200",
        "vice-pink": "#FF00CC",
        "cop-blue": "#0055FF",
        "gta-pink": "#FF69B4",
        "gta-yellow": "#F5C400",
        "gta-black": "#000000",
        surface: "rgb(248 250 252)",
        onSurface: "rgb(2 6 23)",
      },
      fontFamily: {
        heading: ["var(--font-bodoni)", "Bodoni Moda", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-courier-prime)", "Courier New", "monospace"],
        gta: ["var(--font-gta)", "sans-serif"],
        crime: ["var(--font-syne)", "sans-serif"],
        warning: ["var(--font-archivo)", "sans-serif"],
      },
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
        "block": "clamp(1.5rem, 4vw, 3rem)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "power-surge": {
          "0%, 90%, 100%": { opacity: "1" },
          "93%": { opacity: "0.9" },
          "96%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "power-surge": "power-surge 4s ease-in-out infinite",
      },
      boxShadow: {
        "accent-glow": "0 0 25px rgba(255, 90, 95, 0.6)",
        "accent-glow-lg": "0 0 40px rgba(255, 90, 95, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;

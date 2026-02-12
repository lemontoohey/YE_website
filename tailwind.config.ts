import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          950: "#1a050b",
        },
        parchment: {
          100: "#e3d8c8",
        },
        vermillion: {
          500: "#cf2e2e",
        },
        surface: "rgb(248 250 252)",
        onSurface: "rgb(2 6 23)",
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
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

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gap: {
        "18": "4.5rem",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "16": "repeat(16, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;

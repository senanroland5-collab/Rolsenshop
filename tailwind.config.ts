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
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: '#6C4FE0',
          dark: '#2D2A26',
          light: '#EAE6FF',
          bg: '#FDFBF7',
          cta: '#D97706',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1EBE5A',
          light: '#DCF8C6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
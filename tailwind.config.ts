import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6C4FE0',
          dark: '#583CBE',
          light: '#EAE6FF',
          bg: '#F8F9FA',
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
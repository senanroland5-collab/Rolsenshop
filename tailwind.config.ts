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
          DEFAULT: '#10B981',  // Logo Vibrant Emerald Green
          dark: '#059669',     // Dark Emerald Green
          navy: '#065F46',     // Forest Emerald Green
          cyan: '#0D9488',     // Teal Emerald Accent from logo loop
          light: '#ECFDF5',    // Soft Green tint
          bg: '#F8FAFC',       // Clean light neutral background
          cta: '#EE7019',      // Vibrant Orange accent from text/cart
          'cta-hover': '#D85F0E', // Darker Orange hover
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

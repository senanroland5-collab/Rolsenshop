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
          DEFAULT: '#0F3E68',  // Deep Navy Blue from RolsenShop logo
          dark: '#0A2A47',     // Dark Navy Blue
          navy: '#0F3E68',     // Deep Navy Blue alias
          cyan: '#176D86',     // Cyan/Teal accent from logo loop
          light: '#EBF3FA',    // Soft Navy Blue tint
          bg: '#F8FAFC',       // Clean light neutral background
          cta: '#EE7019',      // Vibrant Orange from RolsenShop text/cart
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
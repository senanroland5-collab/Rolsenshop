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
        green: {
          DEFAULT: '#00A86B',
          dark: '#007A4D',
          deep: '#004D31',
          light: '#E8F7F1',
        },
        gold: {
          DEFAULT: '#F4A01C',
          deep: '#C17E10',
          light: '#FEF3DC',
        },
        dark: {
          DEFAULT: '#0A1F14',
          2: '#132B1C',
        },
      },
    },
  },
  plugins: [],
};
export default config;
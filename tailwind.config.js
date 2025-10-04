/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hu-primary': '#8B5CF6',
        'hu-secondary': '#EC4899',
        'hu-accent': '#10B981',
        'hu-dark': '#1F2937',
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
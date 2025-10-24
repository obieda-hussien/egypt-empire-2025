/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'egypt-navy': '#1e3a8a',
        'egypt-gold': '#fbbf24',
        'egypt-slate': '#475569',
      },
    },
  },
  plugins: [],
}

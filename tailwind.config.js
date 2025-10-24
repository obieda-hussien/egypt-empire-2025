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
        'egypt-navy-dark': '#0f172a',
        'egypt-navy-light': '#1e40af',
        'egypt-gold': '#fbbf24',
        'egypt-gold-light': '#fcd34d',
        'egypt-gold-dark': '#d97706',
        'egypt-slate': '#475569',
        'egypt-slate-dark': '#1e293b',
        'egypt-slate-light': '#64748b',
        'egypt-red': '#dc2626',
        'egypt-green': '#16a34a',
        'egypt-sand': '#d4a574',
        'egypt-bronze': '#cd7f32',
      },
      backgroundImage: {
        'egyptian-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'navy-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(251, 191, 36, 0.4)',
        'gold-lg': '0 0 30px rgba(251, 191, 36, 0.6)',
        'egypt': '0 4px 14px rgba(30, 58, 138, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        'obsidian-2': '#111111',
        gold: '#D4AF37',
        crimson: '#8B1A1A',
        'deep-teal': '#0D3D3D',
        parchment: '#F5E6C8',
        indigo: '#4B0082',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        lora: ['Lora', 'serif'],
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px',
      },
      keyframes: {
        'card-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212,175,55,0.5)' },
        },
      },
      animation: {
        'card-float': 'card-float 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212,175,55,0.3), 0 10px 40px rgba(0,0,0,0.8)',
        'gold-lg': '0 0 40px rgba(212,175,55,0.4), 0 20px 60px rgba(0,0,0,0.9)',
      },
    },
  },
  plugins: [],
}

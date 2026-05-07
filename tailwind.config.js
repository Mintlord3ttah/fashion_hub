/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // enable class‑based dark mode
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        beige: '#F5F0E8',
        black: '#0B0B0B',
        white: '#FFFFFF',
        'gray-light': '#F7F7F7',
      },
      boxShadow: {
        glass: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
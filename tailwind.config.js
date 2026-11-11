/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            800: '#0f172a',
            900: '#0a0f1d',
            950: '#05070f',
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          purple: {
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
          }
        }
      }
    },
  },
  plugins: [],
};
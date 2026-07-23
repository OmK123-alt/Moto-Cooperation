/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#050505',
        blood: '#e10600',
        crimson: '#ff1f1f',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.14em',
        ultra: '0.22em',
      },
      boxShadow: {
        glow: '0 0 80px rgba(225, 6, 0, 0.32)',
      },
    },
  },
  plugins: [],
};

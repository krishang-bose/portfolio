/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        shine: 'shine var(--duration, 14s) infinite linear',
      },
      keyframes: {
        shine: {
          '0%':   { backgroundPosition: '0% 0%' },
          '25%':  { backgroundPosition: '100% 0%' },
          '50%':  { backgroundPosition: '100% 100%' },
          '75%':  { backgroundPosition: '0% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
    },
  },
  plugins: [],
}


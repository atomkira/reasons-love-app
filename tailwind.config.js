/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0) scale(0.9)', opacity: 0 },
          '10%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-100vh) scale(1.1)', opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 500ms ease-out',
        slideUp: 'slideUp 500ms cubic-bezier(0.22, 1, 0.36, 1)',
        float: 'float 8s ease-in infinite',
      },
      backgroundImage: {
        'love-gradient': 'linear-gradient(135deg, #ffe4e6 0%, #f5d0fe 50%, #e9d5ff 100%)',
      },
    },
  },
  plugins: [],
}

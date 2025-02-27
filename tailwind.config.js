/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e0ff',
          200: '#80caff',
          300: '#4db3ff',
          400: '#1a9dff',
          500: '#0080ff', // メインカラー
          600: '#0066cc',
          700: '#004d99',
          800: '#003366',
          900: '#001a33',
        },
        secondary: {
          50: '#fff8e6',
          100: '#ffeab3',
          200: '#ffdc80',
          300: '#ffcd4d',
          400: '#ffbf1a',
          500: '#ffb100', // アクセントカラー
          600: '#cc8d00',
          700: '#996a00',
          800: '#664600',
          900: '#332300',
        },
        success: {
          500: '#38b2ac', // 完了タスク用
        },
        background: {
          light: '#f8f9fa',
          dark: '#343a40',
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'sans-serif'],
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      borderRadius: {
        'full': '9999px',
      },
    },
  },
  plugins: [],
}


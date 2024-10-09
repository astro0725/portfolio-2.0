/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'base': '#121a22',
        'primary': '#f07e59',
        'secondary': '#fd6f9c',
        'tertiary': '#b387fa',
        'highlight': '#9fb9d0',
        'body': '#1b262c',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xsm': '480px',
      },
  
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

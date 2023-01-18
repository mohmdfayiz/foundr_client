/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#326789',
        'lightBlue': '#78A6C8',
      },
    },
  },
  plugins: [],
}
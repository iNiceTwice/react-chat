module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#4785FF",
        secondary:"#fafcff",
        tertiary:"#f6f8fc",
        secondary_dark:"#212329",
        tertiary_dark:"#131517",
      }
    },
  },
  plugins: [],
}
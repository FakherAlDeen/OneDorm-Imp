/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'Signup-Image': "url('/img/hero-pattern.svg')",
      }
    },
  },
  plugins: [],
}

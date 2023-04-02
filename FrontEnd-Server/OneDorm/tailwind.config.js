/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        'Signup-Image': "url('./src/assets/Rectangle_5.svg')",
      }
    },
  },
  plugins: [require("daisyui")],
}

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
      },
      colors: {
        'main1': '#F47D43',
        'main2': '#FECA38',
        'main3': '#39B97E',
        'Alert': '#FD3E3E',
      },
    },
  },
  plugins: [require("daisyui")],
}

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
        'postBG':'#FFE9E9',
        'Yellow' : '#FECA38',
        'Grey'  : '#7E7E7E'
      },
      fontFamily: {
        'inter':'Inter'
      },
      boxShadow:{
        'BoxDropBlack':'15px 15px #000000',
        'BoxBlackSm':'0.5rem 0.5rem #000000'
      }
    },
  },
  plugins: [require("daisyui")],
}

/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue1: "#184E77",
        blue2: "#1E6091",
        blue3: "#1A759F",
        blue4: "#168AAD",
        blue5: "#34A0A4",
        green1: "#52B69A",
        green2: "#76C893",
        green3: "#99D98C",
        green4: "#B5E48C",
        green5: "#D9ED92",
      },
      fontFamily: {
        main: ['"inter"'],
        parah: ['"inter2"'],
      },
      boxShadow: {
        "3xl": "80px 80px 10px 0",
      },
    },
  },
  plugins: [daisyui],
};

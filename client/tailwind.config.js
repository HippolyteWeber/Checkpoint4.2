/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        component: "#172032",
        text: "#E2E8F0",
        specialcomponent: "#6366F1",
        specialcomponent2: "#2E2F72",
        componentbackground: "#151F31",
        subjectCardBg: {
          "custom-gradient":
            "linear-gradient(to right, rgba(30, 41, 59, 0.2), rgba(30, 41, 59, 0.2))",
        },
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

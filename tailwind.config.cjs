/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pomo1: "rgb(186, 73, 73)",
        pomo2: "rgb(56, 133, 138)",
        pomo3: "rgb(57, 112, 151)",
        pomo4: "rgb(164, 137, 60)",
        pomo5: "rgb(125, 83, 162)",
        pomo6: "rgb(175, 78, 145)",
        pomo7: "rgb(81, 138, 88)",
        pomo8: "rgb(84, 87, 100)",
      },
      fontFamily: {
        sans: ["Arial Rounded", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [{ pattern: /(bg|text)-pomo[1-8]/ }],
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("slider-thumb", [
        "&::-webkit-slider-thumb",
        "&::-moz-range-thumb",
        "&::-ms-thumb",
      ]);
    }),
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#202123",
        lightBlack: "#343541",
        lightYellow: "#FFFF99",
        lightGrey: "#353740",
        green: "#10a37f",
        greenHover: "#0e8e6c",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
};

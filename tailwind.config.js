/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B11226", // DZENOT red
        primaryDark: "#7A0E1A",
        background: "#0F0F0F",
        surface: "#1A1A1A",
      },
    },
  },
  plugins: [],
};

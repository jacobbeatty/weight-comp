/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aquamarine: "#7fffd4",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #ff7e5f, #feb47b)",
      },
      boxShadow: {
        "custom-inset":
          "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #ffffff73",
        "custom-layered":
          "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
      },
    },
  },
  plugins: [],
};

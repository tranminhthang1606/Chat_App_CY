/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        backgroundImage: {
            'custom-gradient': 'linear-gradient(to right, #ff7e5f, #feb47b)',
          },
          boxShadow: {
            'custom-inset': 'inset 2px 2px 5px #BABECC, inset -5px -5px 10px #ffffff73',
          },
          padding: {
            '8': '2rem',
            '12': '3rem',
            '16': '4rem',
          }
      },
    },
    plugins: [],
  }
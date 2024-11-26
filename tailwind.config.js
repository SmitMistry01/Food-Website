// Import defaultTheme from tailwindcss
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust based on your project structure
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy', ...defaultTheme.fontFamily.sans], // Use the imported defaultTheme
      },
    },
  },
  plugins: [],
};

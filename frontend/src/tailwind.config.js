const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important:"#root",
  theme: {
    extend: {   fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
    }},
    
  },
  plugins: [],
}


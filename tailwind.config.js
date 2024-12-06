/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "spicy-rice": ['Spicy Rice', 'serif'],

      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'selector',

}


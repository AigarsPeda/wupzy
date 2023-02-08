/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // used for logo
        koulen: ["var(--font-koulen)"],
        primary: ["var(--font-roboto)"],
        secondary: ["var(--font-cabin)"],
      },
    },
  },
  plugins: [],
};

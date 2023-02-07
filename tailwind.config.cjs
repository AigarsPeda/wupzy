/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        koulen: ["var(--font-koulen)"],
      },
    },
  },
  plugins: [],
};

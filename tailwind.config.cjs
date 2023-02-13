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
      keyframes: {
        slideRight: {
          "0%": { right: "1.75rem" },
          "100%": { right: "0.25rem" },
        },
        slideLeft: {
          "0%": { left: "1.75rem" },
          "100%": { left: "0.25rem" },
        },
      },
      animation: {
        "slide-right": "slideRight ease 0.15s",
        "slide-left": "slideLeft ease 0.15s",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md2: "1080px",
      },
      fontFamily: {
        // used for logo
        koulen: ["var(--font-koulen)"],
        primary: ["var(--font-roboto)"],
        secondary: ["var(--font-cabin)"],
      },
      keyframes: {
        slideRight: {
          "0%": { right: "1.75rem" },
          "100%": { right: "0" },
        },
        slideLeft: {
          "0%": { left: "1.75rem" },
          "100%": { left: "0" },
        },
        "slow-ping": {
          "0%, 100%": {
            transform: "scale(1.013)",
            backgroundPosition: "0% 50%",
            backgroundSize: "150% 150%",
          },
          "50%": {
            transform: "scale(0.94)",
            backgroundPosition: "100% 50%",
            backgroundSize: "150% 150%",
          },
        },
      },
      animation: {
        "slide-left": "slideLeft ease 0.15s",
        "slide-right": "slideRight ease 0.15s",
        "slow-ping": "slow-ping ease 4.5s infinite",
      },
    },
  },
  plugins: [],
};

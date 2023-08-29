import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      400: "200% 200%",
    },
    extend: {
      fontFamily: {
        // used for logo
        primary: ["var(--font-roboto)"],
        secondary: ["var(--font-cabin)"],
        alumni: ["var(--font-alumni)"],
      },
      animation: {
        background: "background 2.2s ease infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        background: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

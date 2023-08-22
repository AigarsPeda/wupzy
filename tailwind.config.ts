import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // used for logo
        primary: ["var(--font-roboto)"],
        secondary: ["var(--font-cabin)"],
        alumni: ["var(--font-alumni)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

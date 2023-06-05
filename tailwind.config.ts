import { type Config } from "tailwindcss";

export default {
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
} satisfies Config;

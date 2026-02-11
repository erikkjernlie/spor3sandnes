import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pub: {
          dark: "#1c1714",
          darker: "#110f0b",
          gold: "#b49a6a",
          "gold-light": "#c9b48a",
          "gold-muted": "#9a8460",
          wood: "#5c4a30",
          warm: "#fafafa",
          cream: "#f5f0e8",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

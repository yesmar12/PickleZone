import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#18A141",
        secondary: "#0B5526",
        tertiary: "#184179",
      },
      backgroundColor: {
        default: "#FFFFFF",
      },
      textColor: {
        default: "#000000",
      },
    },
  },
} satisfies Config;

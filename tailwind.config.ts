import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes:{
        'bounce-in-left':{
          '0%': { transform: 'translateX(-100%)' },
          '60%': { transform: 'translateX(30%)' },
          '80%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
            animation: {
        'bounce-in-left': 'bounce-in-left 0.8s ease-out',
      },

    },
  },
  plugins: [],
} satisfies Config;

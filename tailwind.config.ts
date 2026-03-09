import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0C",
        gold: "#CFAE70",
        ivory: "#F7F5F1",
        white: "#FFFFFF",
        gray: "#6E6E73",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      keyframes: {
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        scrollLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(300%)" },
        },
      },
      animation: {
        fadeSlideUp: "fadeSlideUp 0.7s ease forwards",
        slowZoom: "slowZoom 10s ease forwards",
        scrollLine: "scrollLine 1.8s ease-in-out infinite",
      },
    },
    borderColor: {
      DEFAULT: "rgba(207, 174, 112, 0.2)",
    },
    transitionDuration: {
      DEFAULT: "300ms",
    },
  },
  plugins: [],
};

export default config;

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
      fontSize: {
        // Fluid type scale — named tokens usable anywhere as text-fluid-*
        // Safe to use in dynamic class lookups since they live in the config,
        // not assembled at runtime from string interpolation.
        "fluid-h1": ["clamp(32px,4vw,52px)", { lineHeight: "1.15" }],
        "fluid-h2": ["clamp(26px,3vw,40px)", { lineHeight: "1.2" }],
        "fluid-h3": ["clamp(22px,2.5vw,32px)", { lineHeight: "1.2" }],
        "fluid-h4": ["clamp(18px,2vw,26px)", { lineHeight: "1.25" }],
        "fluid-h5": ["clamp(16px,1.8vw,22px)", { lineHeight: "1.3" }],
        "fluid-h6": ["clamp(14px,1.6vw,18px)", { lineHeight: "1.35" }],
        "fluid-xl": ["clamp(18px,2vw,24px)", { lineHeight: "1.4" }],
        "fluid-lg": ["clamp(16px,1.6vw,20px)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(14px,1.4vw,16px)", { lineHeight: "1.9" }],
        "fluid-sm": ["clamp(12px,1.2vw,14px)", { lineHeight: "1.7" }],
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

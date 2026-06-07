import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(229 47% 7%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(223 45% 12%)",
        border: "hsl(216 34% 22%)",
        primary: "hsl(195 100% 57%)",
        secondary: "hsl(269 91% 65%)",
        accent: "hsl(158 81% 48%)",
        danger: "hsl(0 84% 67%)",
        warning: "hsl(38 92% 60%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(23, 121, 255, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(34,211,238,0.22), transparent 30%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.16), transparent 28%), linear-gradient(180deg, rgba(8,15,35,0.96), rgba(7,10,24,1))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulseSlow 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

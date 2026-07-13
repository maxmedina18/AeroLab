/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#12151A",
          panel: "#1A1E25",
          raised: "#20252E",
          border: "#2A303B",
        },
        ink: {
          DEFAULT: "#E7E9EE",
          muted: "#8B92A3",
          faint: "#5A6070",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dim: "#8A6127",
        },
        flow: {
          DEFAULT: "#4FA8D8",
          dim: "#2E5D77",
        },
        signal: {
          stable: "#5FBE8A",
          warn: "#D9634A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-fine": "24px 24px",
      },
    },
  },
  plugins: [],
};

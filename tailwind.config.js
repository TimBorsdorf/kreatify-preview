/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        ink: "#0b1220",
        muted: "#667085",
        line: "#e6e8ee",
        panel: "#f6f7fb",
        accent: "#2563eb",
        gold: "#c8a24a",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(11,18,32,0.08)",
        lift: "0 12px 30px rgba(11,18,32,0.10)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5343FD", // Brand purple from logo
        secondary: "#3FD7FF", // Brand cyan from logo
        accent: "#7B68FE", // Lighter purple for accents
        "bg-alt": "#f8f8f8",
        "brand-purple": "#5343FD",
        "brand-cyan": "#3FD7FF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Crimson Pro", "Georgia", "serif"],
      },
      spacing: {
        section: "6rem",
      },
    },
  },
  plugins: [],
};

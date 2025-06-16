/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d",
          light: "#2c5282",
          dark: "#0f2942",
        },
        secondary: "#f7fafc",
        accent: "#e2e8f0",
        text: {
          DEFAULT: "#1a202c",
          light: "#4a5568",
          lighter: "#718096",
        },
        background: {
          DEFAULT: "#ffffff",
          alt: "#f8fafc",
          dark: "#f1f5f9",
        },
        border: {
          DEFAULT: "#e5e7eb",
          text: "#1a202c",
          background: "#ffffff",
        },
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        ui: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 16px 0 rgb(30 41 59 / 0.10)",
        nav: "0 2px 8px 0 rgb(30 41 59 / 0.06)",
        hover: "0 8px 24px 0 rgb(30 41 59 / 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config; 
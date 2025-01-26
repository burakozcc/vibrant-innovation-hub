import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        foreground: "hsl(var(--foreground))",
        primary: "#20C997",
        "primary-dark": "#1BAE87",
        secondary: "#1ABC9C",
        "secondary-dark": "#169C82",
        accent: "#FFD700",
        background: "#F4F4F9",
        "text-primary": "#2D3436",
        "text-secondary": "#636E72",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 20s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0) scale(0)", opacity: "0" },
          "20%": { transform: "translateY(-20vh) scale(1)", opacity: "0.5" },
          "100%": { transform: "translateY(-100vh) scale(0)", opacity: "0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(32, 201, 151, 0.2), 0 0 20px rgba(32, 201, 151, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 10px rgba(32, 201, 151, 0.4), 0 0 40px rgba(32, 201, 151, 0.2)",
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
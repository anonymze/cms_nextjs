import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  breakpoints: {},
  theme: {
    container: {
      center: true,
      padding: "1.6rem",
      // screens: {
      //   "2xl": "1400px",
      // },
    },
    // scaling font size
    fontSize: {
      xs: "clamp(0.64rem, 0.05vw + 0.63rem, 0.67rem)",
      sm: "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
      base: "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
      md: "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
      lg: "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
      xl: "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
      "2xl": "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
      "3xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
      "4xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
    },
    extend: {
      screens: {
        xs: "392px",
        sm: "720px",
        md: "960px",
        lg: "1200px",
        xl: "1500px",
        "2xl": "1920px",
      },
      spacing: {
        sm: "0.8rem",
        md: "1.8rem",
        lg: "3rem",
        xl: "6rem",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      gridRow: {
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
      },
      gridTemplateRows: {
        "8": "repeat(8, minmax(0, 1fr))",
        "10": "repeat(10, minmax(0, 1fr))",
        "12": "repeat(12, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        "wrap-sm": "repeat(auto-fit, minmax(5rem, 1fr))",
        "wrap-md": "repeat(auto-fit, minmax(10rem, 1fr))",
        "wrap-lg": "repeat(auto-fit, minmax(14rem, 1fr))",
        "wrap-xl": "repeat(auto-fit, minmax(18rem, 1fr))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        fade: "transform, opacity, visibility",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-out": "fadeOut 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

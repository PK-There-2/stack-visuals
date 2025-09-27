import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        // Virtual Lab custom colors
        lab: {
          navy: "hsl(var(--lab-navy))",
          cyan: "hsl(var(--lab-cyan))",
          purple: "hsl(var(--lab-purple))",
          green: "hsl(var(--lab-green))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Stack animations
        "stack-push": {
          "0%": {
            transform: "translateY(-100px) scale(0.8)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(-10px) scale(1.1)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        "stack-pop": {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(-10px) scale(1.1)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateY(-100px) scale(0.8)",
            opacity: "0",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px hsl(var(--primary) / 0.6)",
          },
        },
        "fade-slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stack-push": "stack-push 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "stack-pop": "stack-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-slide-up": "fade-slide-up 0.5s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-purple": "var(--gradient-purple)",
        "gradient-card": "var(--gradient-card)",
      },
      boxShadow: {
        "primary": "var(--shadow-primary)",
        "card": "var(--shadow-card)",
        "glow": "var(--shadow-glow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

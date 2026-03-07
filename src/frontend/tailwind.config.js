import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Nunito', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        amber: {
          DEFAULT: 'oklch(var(--amber))',
          light: 'oklch(var(--amber-light))',
          foreground: 'oklch(var(--amber-foreground))',
        },
        teal: {
          DEFAULT: 'oklch(var(--teal))',
          light: 'oklch(var(--teal-light))',
          dark: 'oklch(var(--teal-dark))',
        },
        indigo: {
          DEFAULT: 'oklch(var(--indigo))',
          light: 'oklch(var(--indigo-light))',
          dark: 'oklch(var(--indigo-dark))',
        },
        gold: {
          DEFAULT: 'oklch(var(--gold))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 4px 24px -4px oklch(0.18 0.08 265 / 0.12), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.08)',
        'card-hover': '0 8px 40px -6px oklch(0.18 0.08 265 / 0.18), 0 4px 16px -4px oklch(0.18 0.08 265 / 0.12)',
        glow: '0 0 24px -4px oklch(0.72 0.19 52 / 0.45), 0 0 8px -2px oklch(0.72 0.19 52 / 0.25)',
        'glow-teal': '0 0 24px -4px oklch(0.55 0.16 185 / 0.45), 0 0 8px -2px oklch(0.55 0.16 185 / 0.25)',
        'glow-indigo': '0 0 24px -4px oklch(0.42 0.22 265 / 0.45), 0 0 8px -2px oklch(0.42 0.22 265 / 0.25)',
        premium: '0 20px 60px -15px oklch(0.18 0.08 265 / 0.25), 0 4px 12px -2px oklch(0.18 0.08 265 / 0.10)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px -4px oklch(0.72 0.19 52 / 0.4)' },
          '50%': { boxShadow: '0 0 40px -4px oklch(0.72 0.19 52 / 0.7), 0 0 60px -8px oklch(0.72 0.19 52 / 0.3)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'float-slow': 'float 6s ease-in-out 0.8s infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};

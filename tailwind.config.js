/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f6f1e7',
        surface: '#fffcf6',
        ink: {
          DEFAULT: '#17241c',
          secondary: '#4b584e',
          muted: '#66705f',
        },
        green: {
          deep: '#0c1611',
          DEFAULT: '#1b3125',
          mid: '#284432',
          light: '#3a5b44',
          tint: '#e7ebdd',
        },
        gold: {
          DEFAULT: '#86622a',
          bright: '#c9a25a',
          light: '#e0c48c',
          pale: '#f0e2c2',
          tint: '#fbf3e2',
        },
        rust: '#a3462a',
        line: {
          DEFAULT: '#e3dccd',
          strong: '#cfc5b1',
        },
      },
      fontFamily: {
        heading: ['"Fraunces Variable"', '"Fraunces Fallback"', 'Georgia', 'serif'],
        body: ['"Manrope Variable"', '"Manrope Fallback"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        numeric: ['"Fraunces Variable"', '"Fraunces Fallback"', 'Georgia', 'serif'],
        label: ['"Manrope Variable"', '"Manrope Fallback"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1328px',
        'wrap-tight': '900px',
      },
      borderRadius: {
        sm: '6px',
        md: '14px',
        lg: '22px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12,22,17,0.04), 0 10px 30px -12px rgba(12,22,17,0.14)',
        lift: '0 2px 6px rgba(12,22,17,0.05), 0 30px 60px -24px rgba(12,22,17,0.32)',
        glow: '0 14px 34px -12px rgba(201,162,90,0.7)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flash-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(.2,.7,.2,1) both',
        'flash-in': 'flash-in 0.25s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f7f5ef',
        surface: '#ffffff',
        ink: {
          DEFAULT: '#15170f',
          secondary: '#45483d',
          muted: '#7c7f72',
        },
        green: {
          deep: '#0b1a12',
          DEFAULT: '#12291d',
          mid: '#1d3d2c',
          light: '#2f6a4a',
          tint: '#e7f0ea',
        },
        gold: {
          DEFAULT: '#b98632',
          light: '#e2b862',
          pale: '#f3dfb1',
          tint: '#fbf4e4',
        },
        rust: '#a3462a',
        line: {
          DEFAULT: '#e4ded2',
          strong: '#cbc2b3',
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
        wrap: '1240px',
        'wrap-tight': '900px',
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '28px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18,41,29,0.04), 0 8px 24px -8px rgba(18,41,29,0.12)',
        lift: '0 2px 4px rgba(18,41,29,0.04), 0 24px 48px -16px rgba(18,41,29,0.28)',
        glow: '0 10px 30px -10px rgba(185,134,50,0.65)',
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

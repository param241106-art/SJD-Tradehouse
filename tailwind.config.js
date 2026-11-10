/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f5f2ea',
        surface: '#fcfaf5',
        ink: {
          DEFAULT: '#272c22',
          secondary: '#5c6054',
          muted: '#737467',
        },
        green: {
          deep: '#1c241d',
          DEFAULT: '#293a2b',
          mid: '#3c4c36',
          light: '#4c6042',
          tint: '#e8eade',
        },
        gold: {
          DEFAULT: '#8d6d36',
          light: '#d6bb85',
          pale: '#ebd9b6',
          tint: '#fbf4e4',
        },
        rust: '#a3462a',
        line: {
          DEFAULT: '#dedbce',
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
        wrap: '1328px',
        'wrap-tight': '900px',
      },
      borderRadius: {
        sm: '3px',
        md: '5px',
        lg: '8px',
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

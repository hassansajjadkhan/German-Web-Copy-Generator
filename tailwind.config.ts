import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'rgb(27, 27, 27)',
        champagne: 'rgb(248, 246, 244)',
        alabasta: {
          DEFAULT: 'rgb(224, 224, 212)',
          dark: 'rgb(125, 125, 113)',
          light: 'rgb(241, 241, 234)',
        },
        border: 'rgb(224, 224, 212)',
        input: 'rgb(224, 224, 212)',
        ring: 'rgb(125, 125, 113)',
        background: 'rgb(248, 246, 244)',
        foreground: 'rgb(27, 27, 27)',
        primary: {
          DEFAULT: 'rgb(27, 27, 27)',
          foreground: 'rgb(248, 246, 244)',
        },
        secondary: {
          DEFAULT: 'rgb(224, 224, 212)',
          foreground: 'rgb(27, 27, 27)',
        },
        muted: {
          DEFAULT: 'rgb(241, 241, 234)',
          foreground: 'rgb(125, 125, 113)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.125rem',
      },
      fontFamily: {
        logo: ['Noto Serif', 'serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

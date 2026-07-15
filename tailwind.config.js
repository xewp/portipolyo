/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        ink:        'rgb(var(--ink) / <alpha-value>)',
        'gray-50':  'rgb(var(--gray-50) / <alpha-value>)',
        'gray-100': 'rgb(var(--gray-100) / <alpha-value>)',
        'gray-200': 'rgb(var(--gray-200) / <alpha-value>)',
        'gray-300': 'rgb(var(--gray-300) / <alpha-value>)',
        'gray-400': 'rgb(var(--gray-400) / <alpha-value>)',
        'gray-500': 'rgb(var(--gray-500) / <alpha-value>)',
        'gray-600': 'rgb(var(--gray-600) / <alpha-value>)',
        'gray-700': 'rgb(var(--gray-700) / <alpha-value>)',
        'gray-800': 'rgb(var(--gray-800) / <alpha-value>)',
        'gray-900': 'rgb(var(--gray-900) / <alpha-value>)',
      },
      fontFamily: {
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['Geist Mono', 'ui-monospace', 'monospace'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        pixel: ['Geist Pixel', 'Geist Mono', 'ui-monospace', 'monospace'],
        vt323: ['VT323', 'monospace'],
        ibm:   ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'page-title': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'ui-body':    ['0.9375rem', { lineHeight: '1.6' }],           /* 15px */
        'ui-small':   ['0.8125rem', { lineHeight: '1.5' }],           /* 13px */
        'long-body':  ['1.0625rem', { lineHeight: '1.75' }],          /* 17px */
        'micro':      ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }], /* 11px */
        'micro-xs':   ['0.5625rem', { lineHeight: '1.4', letterSpacing: '0.08em' }], /* 9px */
      },
      borderRadius: {
        'card-lg': '16px',
        'card-md': '12px',
        'card-sm': '8px',
        'input':   '6px',
      },
      maxWidth: {
        'reading': '42rem',  /* 672px — narrow reading column */
        'wide':    '56rem',  /* 896px — multi-column grids */
      },
      spacing: {
        'sidebar': '14rem',  /* 224px sidebar width */
      },
      boxShadow: {
        'card':       '0 8px 22px -14px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 18px 36px -20px rgba(0, 0, 0, 0.4)',
        'modal':      '0 40px 90px -20px rgba(0, 0, 0, 0.35)',
      },
      transitionTimingFunction: {
        'bryl': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.25' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-dot':  'pulse-dot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

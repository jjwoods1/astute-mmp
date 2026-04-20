/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand — #0091d2 is brand-500. The ramp is derived mathematically
        // (not introducing new hues — tints/shades of the single brand blue).
        brand: {
          50:  '#e6f4fb',
          100: '#cfe7f4',
          200: '#bfe2f3',
          300: '#94d0ea',
          400: '#5cb9e2',
          500: '#0091d2',
          600: '#0082bd',
          700: '#006ca0',
          800: '#005a86',
          900: '#00486b',
          950: '#032f48',
        },
        // Keep the existing `primary` alias so legacy pages that reference it
        // don't break during rollout.
        primary: '#0091d2',
        // Structural neutrals — text, borders, subtle bg only. Never decorative
        // fills. This is the standard Tailwind slate ramp aliased as `neutral`
        // for clarity inside the design-system codebase.
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        // Sans alias → Ubuntu, so `font-sans` works project-wide without
        // forcing every page to remember `font-ubuntu`.
        sans:   ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:   ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }] — Tailwind's tuple form.
        'display-xl': ['4.5rem',  { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.5rem',  { lineHeight: '0.98', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display':    ['2.75rem', { lineHeight: '1.02', letterSpacing: '-0.012em', fontWeight: '700' }],
        'h1':         ['2.5rem',  { lineHeight: '1.05', letterSpacing: '-0.01em',  fontWeight: '700' }],
        'h2':         ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.005em', fontWeight: '500' }],
        'h3':         ['1.25rem', { lineHeight: '1.25', letterSpacing: '0',        fontWeight: '500' }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.5',  letterSpacing: '0',        fontWeight: '300' }],
        'body':       ['0.9375rem',{ lineHeight: '1.55', letterSpacing: '0',       fontWeight: '400' }],
        'body-sm':    ['0.8125rem',{ lineHeight: '1.5',  letterSpacing: '0',       fontWeight: '400' }],
        'label':      ['0.6875rem',{ lineHeight: '1.2',  letterSpacing: '0.2em',   fontWeight: '700' }],
      },
      borderRadius: {
        'sm':   '0.375rem',
        'md':   '0.625rem',
        'lg':   '0.875rem',
        'xl':   '1.25rem',
        'pill': '9999px',
      },
      boxShadow: {
        // Layered soft shadows — retire the universal shadow-md/lg abuse.
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'sm': '0 2px 6px -1px rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'md': '0 8px 24px -12px rgba(15, 23, 42, 0.12), 0 2px 6px -3px rgba(15, 23, 42, 0.06)',
        'lg': '0 20px 50px -20px rgba(0, 72, 107, 0.35), 0 4px 12px -6px rgba(15, 23, 42, 0.08)',
        'brand-glow': '0 0 0 4px rgba(0, 145, 210, 0.15), 0 8px 24px -8px rgba(0, 145, 210, 0.35)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

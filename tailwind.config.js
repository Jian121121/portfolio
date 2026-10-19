/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Values live in src/index.css (light on :root, dark on .dark) as RGB channels
      // so opacity modifiers like bg-canvas/90 keep working.
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',     // page background
        surface: 'rgb(var(--surface) / <alpha-value>)',   // raised panels
        surface2: 'rgb(var(--surface2) / <alpha-value>)', // hover / active surface
        line: 'rgb(var(--line) / <alpha-value>)',         // hairline borders
        ink: 'rgb(var(--ink) / <alpha-value>)',           // primary text
        muted: 'rgb(var(--muted) / <alpha-value>)',       // secondary text
        faint: 'rgb(var(--faint) / <alpha-value>)',       // tertiary text
        keyword: 'rgb(var(--keyword) / <alpha-value>)',   // violet — headings
        string: 'rgb(var(--string) / <alpha-value>)',     // green — accents
        func: 'rgb(var(--func) / <alpha-value>)',         // blue — links
        warn: 'rgb(var(--warn) / <alpha-value>)',         // amber — small highlights
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
}

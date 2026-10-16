/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Code-editor palette. Not a copy of any single editor theme —
        // tuned so the accents read as "syntax", not decoration.
        canvas: '#0C0F14',      // page background
        surface: '#12161D',     // raised panels / tab bar
        surface2: '#171C25',    // hover / active surface
        line: '#232935',        // hairline borders / dividers
        ink: '#DDE3EC',         // primary text
        muted: '#7C8695',       // secondary text
        faint: '#4B5361',       // line numbers, tertiary
        keyword: '#C792EA',     // violet — headings / keywords
        string: '#7EE787',      // green — accents / "strings"
        func: '#79C0FF',        // blue — links / function-like accents
        warn: '#F2B84B',        // amber — small highlights
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '860px',
      },
    },
  },
  plugins: [],
}

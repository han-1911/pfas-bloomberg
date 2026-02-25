/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bloomberg: {
          bg: '#0a0a0a',
          panel: '#111111',
          border: '#2a2a2a',
          header: '#1a1a1a',
          green: '#00d26a',
          amber: '#ffb700',
          cyan: '#00bfff',
          red: '#ff3b3b',
          orange: '#ff6600',
          muted: '#666666',
          text: '#cccccc',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"SF Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

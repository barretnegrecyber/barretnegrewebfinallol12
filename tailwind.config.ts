import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'parrot-bg': '#020408',
        'parrot-panel': '#050a0f',
        'parrot-border': '#1f293a',
        'parrot-cyan': '#00fdff',
        'parrot-lime': '#49f12a',
        'parrot-red': '#ff5d5e',
        'parrot-yellow': '#ffea00',
        'parrot-dim': '#4a5568',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 2s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
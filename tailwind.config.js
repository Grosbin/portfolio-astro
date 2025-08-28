/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          black: '#000000',
          'black-light': '#0A0A0A',
          surface: '#111111',
          'surface-light': '#1A1A1A',
          'surface-lighter': '#2A2A2A',
          white: '#FFFFFF',
          'white-dark': '#FAFAFA',
          'white-surface': '#F5F5F5',
          'white-surface-dark': '#EEEEEE',
          'white-surface-darker': '#E0E0E0',
          'text-primary': '#FFFFFF',
          'text-secondary': '#E5E5E5',
          'text-tertiary': '#CCCCCC',
          'text-primary-light': '#000000',
          'text-secondary-light': '#333333',
          'text-tertiary-light': '#555555',
          'border': '#444444',
          'border-light': '#555555',
          'border-light-mode': '#CCCCCC',
          'border-light-mode-dark': '#DDDDDD',
        }
      },
      fontFamily: {
        'space': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        }
      }
    },
  },
  plugins: [],
}


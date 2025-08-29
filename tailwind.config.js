/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elegant: {
          // Pure blacks and whites
          black: '#000000',
          'black-soft': '#0f0f0f',
          'black-light': '#1a1a1a',
          'black-lighter': '#2a2a2a',
          
          white: '#ffffff',
          'white-soft': '#f8f8f8',
          'white-light': '#f0f0f0',
          'white-lighter': '#e8e8e8',
          
          // Elegant grays
          gray: {
            50: '#fafafa',
            100: '#f4f4f4',
            200: '#e4e4e4',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a'
          },
          
          // Subtle accent colors
          accent: {
            primary: '#ffffff',
            secondary: '#f4f4f4',
            tertiary: '#d4d4d4'
          },
          
          // Text colors
          text: {
            primary: '#ffffff',
            secondary: '#d4d4d4',
            tertiary: '#a3a3a3',
            muted: '#737373',
            subtle: '#525252'
          },
          
          // Border colors
          border: {
            primary: '#2a2a2a',
            secondary: '#1a1a1a',
            subtle: '#404040',
            light: '#525252'
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.8s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'slide-in': 'slide-in 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'glow-subtle': 'glow-subtle 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'slide-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'glow-subtle': {
          '0%': { 
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.1)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
          },
        },
      }
    },
  },
  plugins: [],
}


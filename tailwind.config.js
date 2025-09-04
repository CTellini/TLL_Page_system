/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Azul Elétrico / Cobalto
        primary: {
          '50': '#EAF0FF',
          '400': '#3A75FF',
          '500': '#0057FF', // Cor principal
          '600': '#0047D6',
          '900': '#002D88',
        },
        // Secondary - Roxo Profundo
        secondary: {
          '400': '#7C3AED',
          '500': '#4B00B7', // Cor secundária
          '600': '#3A0094',
        },
        // Accent - Verde Neon Suave
        accent: {
          '400': '#00FFAA',
          '500': '#00D18C', // Cor de destaque
          '600': '#00A86B',
        },
        // Dark - Tons escuros profissionais
        dark: {
          '800': '#1A1A1A',
          '900': '#111111',
          '950': '#0B0B0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in',
        'slide-up': 'slideUp 0.7s ease-out',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 87, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 87, 255, 0.5)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
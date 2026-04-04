/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FDF6EC',
          200: '#FAE9CC',
          300: '#F5D9A8',
          400: '#F0C97E',
          500: '#E8B44D',
        },
        espresso: {
          50: '#F5F0EB',
          100: '#E0D3C4',
          200: '#C4A882',
          300: '#8B6340',
          400: '#5C3A1E',
          500: '#2C1A0E',
          600: '#1E1008',
          700: '#140B05',
        },
        amber: {
          50: '#FFF8EB',
          100: '#FEECC3',
          200: '#FCDB8B',
          300: '#F0C050',
          400: '#D4A04A',
          500: '#B8862D',
          600: '#9A6E1F',
          700: '#7D5815',
        },
        rose: {
          50: '#FFF0ED',
          100: '#FDDDD7',
          200: '#F8C4BB',
          300: '#F2A79D',
          400: '#E88A7D',
          500: '#DC6B5D',
          600: '#C4503F',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        'organic': '30% 70% 70% 30% / 30% 30% 70% 70%',
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(212, 160, 74, 0.15)',
        'warm-lg': '0 10px 30px 0 rgba(212, 160, 74, 0.2)',
        'warm-xl': '0 20px 50px 0 rgba(212, 160, 74, 0.25)',
        'card': '0 2px 8px rgba(44, 26, 14, 0.06), 0 8px 24px rgba(44, 26, 14, 0.04)',
        'card-hover': '0 8px 24px rgba(44, 26, 14, 0.1), 0 16px 48px rgba(44, 26, 14, 0.06)',
      },
    },
  },
  plugins: [],
};

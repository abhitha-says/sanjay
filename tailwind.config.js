/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F2ED',
        ink: '#111111',
        accent: '#E45A49',
        brand: '#2d7a3a',
        secondary: '#5E5E5E',
        border: 'rgba(0,0,0,.08)',
        glass: 'rgba(255,255,255,.65)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Canela', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        hero: '40px',
        dock: '32px',
        pill: '999px',
      },
      spacing: {
        18: '72px',
      },
      maxWidth: {
        container: '1680px',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,.04)',
      },
    },
  },
  plugins: [],
}

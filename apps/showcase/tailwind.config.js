/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        scilent: {
          50: '#f5f5f6',
          100: '#e6e7e9',
          200: '#d1d3d6',
          300: '#b0b4b9',
          400: '#888d95',
          500: '#6b717a',
          600: '#565b64',
          700: '#474b53',
          800: '#3d4046',
          900: '#36383e',
          950: '#24262a',
        },
      },
      fontFamily: {
        display: ['Lexend Tera Variable', 'sans-serif'],
        body: ['Archivo Variable', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  // plugins: [
  //   function({ addBase }) {
  //     addBase({
  //       'html': { fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' },
  //     })
  //   },
  // ],
  // future: {
  //   hoverOnlyWhenSupported: true,
  //   respectDefaultRingColorOpacity: true,
  // },
};

module.exports = {
  mode: ['jit'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: {
        DEFAULT: '#ffffff',
        1: '#fdfdfd',
      },
      black: {
        DEFAULT: '#000000',
        1: '#191919',
      },
      grey: {
        DEFAULT: '#C4C4C4',
        dark: '#333333',
        1: '#172B2F',
        N2: '#F8F8F8',
        N4: '#D7D7D7',
        N6: '#939393',
        N10: '#6B6B6B',
      },
      yellow: {
        DEFAULT: '#F89837',
        1: '#FFD25A',
      },
      green: '#192B2F',
      purple: {
        DEFAULT: '#593C8F',
        V6: '#604195',
        V1: '#EBE7F2',
      },
      red: {
        DEFAULT: '#D73554',
        error: '#F5222D',
      },
    },
    extend: {
      spacing: {
        nav: '10vh',
        content: '90vh',
        3.75: '3.75rem',
        15: '3.75rem',
        '8%': '8%',
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
};

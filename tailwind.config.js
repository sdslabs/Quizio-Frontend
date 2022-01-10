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
      black: '#000000',
      grey: {
        DEFAULT: '#C4C4C4',
        dark: '#333333',
        1: '#172B2F',
        N4: '#D7D7D7',
        N6: '#939393',
      },
      yellow: {
        DEFAULT: '#F89837',
        1: '#FFD25A',
      },
      green: '#192B2F',
      purple: {
        DEFAULT: '#593C8F',
      },
      red: {
        DEFAULT: '#D73554',
        error: '#F5222D',
      },
    },
    extend: {},

  },
  variants: {
    extend: {},
  },
  plugins: [],
};

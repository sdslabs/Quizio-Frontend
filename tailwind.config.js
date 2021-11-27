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
      },
      yellow: {
        DEFAULT: '#F89837',
        1: '#FFD25A',
      },
    },
    extend: {},

  },
  variants: {
    extend: {},
  },
  plugins: [],
};

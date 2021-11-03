/* eslint-disable global-require */
const cracoAlias = require('craco-alias');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        baseUrl: './',
        source: 'jsconfig',
      },
    },
  ],
};

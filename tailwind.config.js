/** @type {import('nativewind').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gmrPrimary:   '#0E77B2',
        gmrSecondary: '#04ADEE',
        accentGreen:  '#2C9C7A',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts}',
    './static/**/*.{html,js,ts}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Nunito"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"system-ui"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')( {strategy: 'class'} ),
    require('@tailwindcss/typography'),
  ],
}


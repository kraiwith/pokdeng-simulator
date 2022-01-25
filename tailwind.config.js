const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    color: {

    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        'input[type=text]': {
          padding: '.5rem 0.75rem',
          borderRadius: '.25rem',
        },
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary': {
          backgroundColor: '#f9be60',
        },
      })
    })
  ],
}

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
      animation: {
      'hamburger': '3s ease-in-out'
      },
      backgroundImage: {
        'vitreverte': "url('/src/assets/vitre-verte.jpg')",
        'paille': "url('/src/assets/roman-petrov-NnGOHYiKm1o-unsplash.jpg')",
      }
    },
  },
  plugins: [],
}


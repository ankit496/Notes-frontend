/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add your custom font here
        serif: ['Merriweather', 'serif'], // Example for serif fonts
      },
    },
  },
  plugins: [],
}


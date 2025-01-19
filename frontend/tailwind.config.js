///** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    customTheme: {
      "primary": "#fe5e00",
      "secondary": "#515151",
      "base-100": "#ffffff",
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  //plugins: [require('daisyui')],
}

/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const fluid = require('fluid-tailwind');


const { extract, screens, fontSize} = fluid;



module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract, 
  },
  theme: {
    screens, 
    fontSize, 
    extend: {
      fontFamily: {
        exo2: ['"Exo 2"', 'sans-serif'],
      },
      screens: {
        xs: '20rem', 
      },
      colors: {
        'blue-1': '#5bbde7',
        'blue-2': '#83cdea',
        'blue-3': '#a8dcf0',
        'blue-4': '#c7eaf5',
        'blue-5': '#ddf4f8',
        'blue-6': '#f0fbfd',
      },
      textShadow: {
        outline:
          '-1px -1px 0 #a9a9a9, 1px -1px 0 #a9a9a9, -1px 1px 0 #a9a9a9, 1px 1px 0 #a9a9a9',
      },
      animation: {
        bouncing: 'bouncers 0.6s infinite alternate',
      },
      keyframes: {
        bouncers: {
          to: {
            opacity: 0.1,
            transform: 'translateY(-8px)',
          },
        },
      },
    },
  },
  plugins: [
    fluid.default,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
    require('tailwindcss-animation-delay'),
    require('@xpd/tailwind-3dtransforms'),
   
  ],
  safelist: ['isolate'],
};

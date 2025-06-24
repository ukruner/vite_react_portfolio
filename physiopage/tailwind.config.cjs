/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const fluid = require('fluid-tailwind');

console.log('fluid export', fluid);
const { extract, screens, fontSize} = fluid;

// console.log('fluid spacing keys:', Object.keys(spacing));
console.log('screens:', screens);
console.log('fontSize:', fontSize);
// console.log('spacing:', spacing);

module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract, // ✅ This is valid, passed from fluid-tailwind
  },
  theme: {
    screens, // ✅ From fluid-tailwind
    fontSize, // ✅ From fluid-tailwind
    extend: {
      fontFamily: {
        exo2: ['"Exo 2"', 'sans-serif'],
      },
      screens: {
        xs: '20rem', // ✅ Extending fluid screens
      },
      colors: {
        'blue-1': '#67c7ff',
        'blue-2': '#80d0ff',
        'blue-3': '#9adaff',
        'blue-4': '#b3e3ff',
        'blue-5': '#cdecff',
        'blue-6': '#e6f6ff',
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
     // ✅ Add fluid-tailwind as a plugin
  ],
  safelist: ['isolate'],
};


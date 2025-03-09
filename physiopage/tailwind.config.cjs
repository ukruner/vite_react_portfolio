/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
     fontFamily: {
      exo2: ['"Exo 2"', 'sans-serif'],
     },
    colors: {
      'blue-1': '#67c7ff',
      'blue-2': '#80d0ff',
      'blue-3': '#9adaff',
      'blue-4': '#b3e3ff',
      'blue-5': '#cdecff',
      'blue-6': '#e6f6ff'
    },
    textShadow: {
      'outline': '-1px -1px 0 #a9a9a9, 1px -1px 0 #a9a9a9, -1px 1px 0 #a9a9a9, 1px 1px 0 #a9a9a9'
    },
  },
  animation: {
    bouncing: "bouncers 0.6s infinite alternate"
  },
  keyframes: {
    bouncers: {
      to: {
        opacity: 0.1,
        transform: "translateY(-8px)",
      },
    },  
  },
},
  
  
  plugins: [plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  }), require("tailwindcss-animation-delay"), require("@xpd/tailwind-3dtransforms")],
  safelist: ['isolate']
}


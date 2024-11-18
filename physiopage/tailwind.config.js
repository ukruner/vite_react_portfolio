/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 
      ["Open Sans", "sans-serif"],},
    
    colors: {
      'blue-1': '#67c7ff',
      'blue-2': '#80d0ff',
      'blue-3': '#9adaff',
      'blue-4': '#b3e3ff',
      'blue-5': '#cdecff',
      'blue-6': '#e6f6ff'
    }}},
  plugins: [require("@xpd/tailwind-3dtransforms")],
}


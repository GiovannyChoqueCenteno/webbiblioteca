/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          background: "#FFFFFF",
          box: "#F5F5F5",
          element: "#6246EA"
        }
      }
    },
  },
  daisyui: {
    themes: false,
  } ,
  plugins: [require("daisyui")],
}

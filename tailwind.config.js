/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": "#090913",
        "columnBackgroundColor": "#15151C"
      }
    },
  },
  plugins: [],
}


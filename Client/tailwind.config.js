/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          slate: {
            50 : rgba(255, 255, 255, 0.5),
            100: "#eeeeef",
            200: "#e6e9ed",
            600: "#1034A6"
          },
          purple : {
            300: "#d9ddee",
            500: "#9492db",
            600: "#7164c0"
          }
        }
      },
    },
    plugins: [],
  }

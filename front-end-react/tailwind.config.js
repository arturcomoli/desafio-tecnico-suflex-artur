/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-lb": "#C9E1E1",
        "bg-aqua": "#0AA689",
        "blue-txt": "#034AA6",
        "purple-txt": "#0C1440",
        "err-warning": "#F40204",
        "btn-orange": "#F27F3D",
        "background-card": "#5F7B97",
        "green-txt": "#9ABF4B",
        "pholder-blue": "#04ADBF",
      },
      spacing: {
        "w-1/10": "10%",
      },
    },
  },
  plugins: [],
};

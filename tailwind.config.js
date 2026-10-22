/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // App design tokens: warm neutral surfaces, near-black ink, one muted green accent
      colors: {
        canvas: "#F6F5F2",
        surface: "#FFFFFF",
        subtle: "#EFEEEA",
        line: "#E3E1DC",
        ink: "#17181C",
        body: "#3F4248",
        muted: "#7A7D84",
        accent: {
          DEFAULT: "#2F5D4E",
          soft: "#E6EFEA",
        },
        danger: {
          DEFAULT: "#B4362A",
          soft: "#FBECEA",
        },
      },
    },
  },
  plugins: [],
}

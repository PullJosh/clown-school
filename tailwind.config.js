const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        math: ["KaTeX_Main", ...defaultTheme.fontFamily.sans],
        headline: ["var(--font-literata)", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

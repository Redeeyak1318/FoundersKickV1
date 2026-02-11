export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D0F12",
        ember: "#E25822",
        sand: "#F7F1E8",
        moss: "#2B5C4D"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Work Sans'", "sans-serif"]
      }
    }
  },
  plugins: []
}

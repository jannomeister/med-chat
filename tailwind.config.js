module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      "1xl": { max: "1038px" },
      "2xl": { max: "730px" },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["last", "active"],
      borderRadius: ["hover", "active"],
    },
  },
  plugins: [],
};

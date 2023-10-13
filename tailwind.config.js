/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef6ee",
          100: "#feead6",
          200: "#fbd1ad",
          300: "#f9b17a",
          400: "#f58542",
          500: "#f2631d",
          600: "#e34a13",
          700: "#bd3611",
          800: "#962c16",
          900: "#792715",
          950: "#411109",
        },
        accent: {
          50: "#f8f8f8",
          100: "#eeeeee",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
        success: {
          50: "#f4f9f8",
          100: "#dcebe7",
          200: "#b8d7d0",
          300: "#8dbbb2",
          400: "#649b92",
          500: "#4b8179",
          600: "#3a6761",
          700: "#325350",
          800: "#2b4441",
          900: "#273a38",
          950: "#12211f",
        },
        danger: {
          50: "#fef3f2",
          100: "#ffe4e1",
          200: "#ffcec8",
          300: "#ffada2",
          400: "#fd8b7c",
          500: "#f5533e",
          600: "#e23720",
          700: "#bf2a16",
          800: "#9d2717",
          900: "#82261a",
          950: "#470f08",
        },
        grayscale: {
          50: "#f3f6fb",
          100: "#e4eaf5",
          200: "#cfdaee",
          300: "#aec2e2",
          400: "#87a2d3",
          500: "#6b85c6",
          600: "#576eb9",
          700: "#4d5da8",
          800: "#434e8a",
          900: "#39426f",
          950: "#2d3250",
        },
        "semi-grayscale": {
          50: "#f4f6fa",
          100: "#e6eaf3",
          200: "#d3daea",
          300: "#b5c2db",
          400: "#92a3c8",
          500: "#7788ba",
          600: "#6572ab",
          700: "#59629c",
          800: "#4d5280",
          900: "#424769",
          950: "#2b2d40",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#2d3250",
            foreground: "#f8f8f8",
          },
        },
      },
    }),
  ],
};

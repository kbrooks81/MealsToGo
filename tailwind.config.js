/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js.jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ---- COLORS (from colors.js) ----
      colors: {
        brand: {
          primary: "#2182BD",
          secondary: "#5282BD",
          muted: "#C6DAF7",
        },
        ui: {
          primary: "#262626",
          secondary: "#757575",
          tertiary: "#F1F1F1",
          quaternary: "#FFFFFF",
          disabled: "#DEDEDE",
          error: "#D0421B",
          success: "#138000",
        },
        bg: {
          primary: "#FFFFFF",
          secondary: "#F1F1F1",
        },
        text: {
          primary: "#262626",
          secondary: "#757575",
          disabled: "#9C9C9C",
          inverse: "#FFFFFF",
          error: "#D0421B",
          success: "#138000",
        },
      },

      // ---- FONTS (from fonts.js) ----
      fontFamily: {
        body: ["Oswald_400Regular"],
        heading: ["Lato_400Regular"],
        monospace: ["Oswald_400Regular"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      fontSize: {
        caption: "12px",
        button: "14px",
        body: "16px",
        title: "20px",
        h5: "24px",
        h4: "34px",
        h3: "45px",
        h2: "56px",
        h1: "112px",
      },

      // ---- SPACING / SIZES (from spacing.js + sizes.js) ----
      spacing: {
        none: "0px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "32px",
        xl: "64px",
        "2xl": "128px",
      },
      width: {
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "128px",
      },
      height: {
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "128px",
      },
    },
  },
  plugins: [],
}
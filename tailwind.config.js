/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDelay: {
        5000: "5000ms",
      },
      letterSpacing: {
        tightest: "-0.07em",
        widestestcum: ".18em",
        widestest: ".28em",
        zaydawide: ".35em",
      },
      screens: {
        xsmphone: "425px",
        smartphone: { max: "720px" },
        tablet: { min: "721px", max: "1023px" },
        laptop: { min: "1024px", max: "1919px" },
        desktop: "1920px",
      },
      colors: {
        primary: "#7c3aed",
        "primary-content": "#ffffff",
        "primary-dark": "#5f14e0",
        "primary-light": "#9b69f1",

        secondary: "#ed3a51",
        "secondary-content": "#ffffff",
        "secondary-dark": "#e0142f",
        "secondary-light": "#f1697a",

        backgroundLight: "#efeff1",
        foregroundLight: "#fbfbfb",
        borderLight: "#dedde2",

        copyLight: "#252329",
        "copy-lightLt": "#645e6e",
        "copy-lighterLt": "#8a8495",

        background: "#19181b",
        foreground: "#252329",
        border: "#3e3b45",

        copy: "#fbfbfb",
        "copy-light": "#d8d6dc",
        "copy-lighter": "#a49fac",

        success: "#3aed3a",
        warning: "#eded3a",
        error: "#ed3a3a",

        "success-content": "#032503",
        "warning-content": "#252503",
        "error-content": "#ffffff",
      },
      dropShadow: {
        "text-sm": "1px 1px 1px rgba(0,0,0.60)",
        "text-md": "1px 2px 0px rgba(0,0,0.60)",
        "text-lg": "1px 4px 0px rgba(10,10,10,0.60)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        fontSize: {
          sm: ["clamp(1.00nem,calc(0.92rem + 0.39vw), 1.20nem)", "1.4"],

          base: ["clamp (1.13nem, calc (0.98rem + 0.73vw), 1.50лem)", "1.5"],

          lg: ["clamp (1.27nem,calc(1.03nem + 1.19vw), 1.88nem)", "1.4"],

          xl: ["clamp(1.42nem, calc(1.06лem +1.80vw), 2.34лem)", "1.4"],

          "2xl": ["clamp (1.60nem,calc(1.08rem + 2.59vw), 2.93лem)", "1.2"],

          "3xl": ["clamp (1.80nem,calc(1.08rem +3.63vw),3.66лem)", "1.1"],

          "4xl": ["clamp (2.03nem,calc(1.03rem + 4.98vw), 4.58лem)", "1"],

          "5xl": ["clamp (2.28nem,calc(0.94rem + 6.71vw),5.72nem)", "1"],

          "6xl": ["clamp (2.57nem,calc (0.78rem + 8.95vw), 7.15лem) ", "1"],

          "7xl": ["clamp (3.10nem,calc (0.78rem + 8.95vw), 7.50лem) ", "1"],
        },
      },
    },
    animation: {
      "pencil-body1": "pencilBody1 3s linear infinite",
      "pencil-body2": "pencilBody2 3s linear infinite",
      "pencil-body3": "pencilBody3 3s linear infinite",
      "pencil-eraser": "pencilEraser 3s linear infinite",
      "pencil-eraser-skew": "pencilEraserSkew 3s ease-in-out infinite",
      "pencil-point": "pencilPoint 3s linear infinite",
      "pencil-rotate": "pencilRotate 3s linear infinite",
      "pencil-stroke": "pencilStroke 3s linear infinite",
    },
    keyframes: {
      pencilBody1: {
        "0%, 100%": { strokeDashoffset: "351.86", transform: "rotate(-90deg)" },
        "50%": { strokeDashoffset: "150.8", transform: "rotate(-225deg)" },
      },
      pencilBody2: {
        "0%, 100%": { strokeDashoffset: "406.84", transform: "rotate(-90deg)" },
        "50%": { strokeDashoffset: "174.36", transform: "rotate(-225deg)" },
      },
      pencilBody3: {
        "0%, 100%": { strokeDashoffset: "296.88", transform: "rotate(-90deg)" },
        "50%": { strokeDashoffset: "127.23", transform: "rotate(-225deg)" },
      },
      pencilEraser: {
        "0%, 100%": { transform: "rotate(-45deg) translate(49px,0)" },
        "50%": { transform: "rotate(0deg) translate(49px,0)" },
      },
      pencilEraserSkew: {
        "0%, 32.5%, 67.5%, 100%": { transform: "skewX(0)" },
        "35%, 65%": { transform: "skewX(-4deg)" },
        "37.5%, 62.5%": { transform: "skewX(8deg)" },
        "40%, 45%, 50%, 55%, 60%": { transform: "skewX(-15deg)" },
        "42.5%, 47.5%, 52.5%, 57.5%": { transform: "skewX(15deg)" },
      },
      pencilPoint: {
        "0%, 100%": { transform: "rotate(-90deg) translate(49px,-30px)" },
        "50%": { transform: "rotate(-225deg) translate(49px,-30px)" },
      },
      pencilRotate: {
        from: { transform: "translate(100px,100px) rotate(0)" },
        to: { transform: "translate(100px,100px) rotate(720deg)" },
      },
      pencilStroke: {
        "0%": {
          strokeDashoffset: "439.82",
          transform: "translate(100px,100px) rotate(-113deg)",
        },
        "50%": {
          strokeDashoffset: "164.93",
          transform: "translate(100px,100px) rotate(-113deg)",
        },
        "75%, 100%": {
          strokeDashoffset: "439.82",
          transform: "translate(100px,100px) rotate(112deg)",
        },
      },
    },
  },
  plugins: [],
};

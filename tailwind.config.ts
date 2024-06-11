import type { Config } from "tailwindcss";

const config: Config = {
  purge: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-color": "#4c4c47",
        "primary-color-dark": "#848fa5",
        "secondary-color": "#ca8a04",
        "text-dark": "#ff9f1c",
        "text-light": "#000000",
        "extra-light": "white",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        orange: "#D16400",
        green: "#004F08",
        darkGray: "#393939",
        lightGray: "#AFAFAF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;

import {nextui} from '@nextui-org/theme'
import { withUt } from "uploadthing/tw";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  theme: {
    extend: {
      boxShadow: {
        'white': '0px 10px 10px rgba(205, 255, 255, 0.0)',
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}
import { withUt } from "uploadthing/tw";
 
// export default withUt({
//   // Your existing Tailwind config
//   content: ["./src/**/*.{ts,tsx,mdx}"],
//   ...
// });
/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      fontFamily: {
        molot: ["Molot", "sans-serif"],
        hkGuise: ["HK-Guise", "sans-serif"],
        peanutButter: ["Peanut Butter", "sans-serif"],
        handwriting: ["Handwriting-Regular", "sans-serif"],
      },
    }},
  plugins: [],
}

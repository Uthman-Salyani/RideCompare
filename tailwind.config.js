/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names
  // so unused classes are stripped out in production
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Add any custom theme values here if needed
      // e.g. custom colours, fonts, spacing
    },
  },
  plugins: [],
}

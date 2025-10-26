export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-blue': '#14b8a6',
        'dark-burgundy': '#7c2d12',
        'light-gray': '#f3f4f6',
        'orange': '#f97316',
        'pink': '#ec4899',
        'dark-gray': '#374151',
        'light-blue': '#3b82f6',
        'hover-pink': '#e57297',
      },
      fontFamily: {
        'sans': ['IRANSansXFaNum', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'yekan': ['IRANSansXFaNum', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

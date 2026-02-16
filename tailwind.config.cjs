module.exports = {
  content: ["./index.html", "./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F7',
        text: '#1C1C1C',
        'text-muted': '#4A4A4A',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
}

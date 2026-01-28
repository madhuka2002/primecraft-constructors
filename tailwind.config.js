/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primecraft-yellow': '#FFD700', // Safety Yellow
        'primecraft-blue': '#0066CC',   // Industrial Blue
        'primecraft-orange': '#FF6600', // Warning Orange
        'primecraft-black': '#1A202C',  // Dark Slate (Soft Black)
        'primecraft-white': '#FFFFFF',  // Pure White
        'primecraft-bg': '#F0F8FF',     // Ice Blue Base
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


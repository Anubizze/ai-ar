/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2D5A27',
          'green-light': '#3d7a35',
          'green-dark': '#1e3d1a',
          cream: '#F5F0E8',
          wheat: '#E8DCC8',
        },
        accent: {
          red: '#C41E3A',
          gold: '#B8860B',
        }
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, #2D5A27 0%, #1e3d1a 50%, #0f2810 100%)',
        'grain-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(45, 90, 39, 0.15)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

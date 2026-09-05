/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      ...require('tailwindcss/defaultTheme').screens,
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      scale: {
        '102': '1.02',
      },
      colors: {
        railway: {
          darkest: '#07111E',
          navy: '#0B192C',
          slate: '#1E3E62',
          subtle: '#27445D',
          border: '#E2E8F0',
          card: '#FFFFFF',
          bg: '#F8FAFC',
          muted: '#64748B',
        },
        dept: {
          eng: '#1E40AF',
          'eng-light': '#EFF6FF',
          sig: '#B45309',
          'sig-light': '#FFFBEB',
          trac: '#6D28D9',
          'trac-light': '#FAF5FF',
          coa: '#0F766E',
          'coa-light': '#F0FDFA',
        },
        railstatus: {
          green: '#059669',
          'green-light': '#ECFDF5',
          yellow: '#D97706',
          'yellow-light': '#FFFBEB',
          red: '#DC2626',
          'red-light': '#FEF2F2',
          blue: '#0284C7',
          'blue-light': '#F0F9FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'card-subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 4px 12px -2px rgba(11, 25, 44, 0.12), 0 2px 6px -2px rgba(11, 25, 44, 0.08)',
        'modal': '0 20px 25px -5px rgba(11, 25, 44, 0.25), 0 8px 10px -6px rgba(11, 25, 44, 0.2)',
      }
    },
  },
  plugins: [],
}

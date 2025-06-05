/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#fb923c',      // orange-400
          secondary: '#fed7aa',     // orange-200
          accent: '#ffedd5',       // orange-100
          light: '#fff7ed',        // orange-50
        },
        
        // Status Colors
        success: '#22c55e',        // green-500
        danger: '#ef4444',         // red-500
        warning: '#f59e0b',        // amber-500
        info: '#3b82f6',          // blue-500
        
        // Neutral Colors
        surface: {
          primary: '#ffffff',       // Pure white
          secondary: '#f8fafc',     // slate-50
          tertiary: '#f1f5f9',     // slate-100
        },
        
        // Text Colors
        content: {
          primary: '#0f172a',       // slate-900
          secondary: '#475569',     // slate-600
          tertiary: '#94a3b8',     // slate-400
          disabled: '#cbd5e1',     // slate-300
        },
        
        // Border Colors
        border: {
          light: '#e2e8f0',        // slate-200
          medium: '#cbd5e1',       // slate-300
          dark: '#94a3b8',         // slate-400
        },
        
        // Background Colors
        background: {
          base: '#ffffff',         // Pure white
          muted: '#f8fafc',        // slate-50
          hover: '#f1f5f9',        // slate-100
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        primary: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
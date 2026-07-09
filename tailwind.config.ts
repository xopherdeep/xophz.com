import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080810',
        'bg-card': 'rgba(255, 255, 255, 0.06)',
        'bg-card-hover': 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.12)',
        'border-glow': 'rgba(139, 92, 246, 0.4)',
        'text-primary': '#f0f0f8',
        'text-secondary': '#8888a8',
        'text-muted': '#555570',
        accent: '#8b5cf6',
        'accent-2': '#06b6d4',
        'accent-3': '#f59e0b',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-highlight': '0 0 0 1px rgba(255, 255, 255, 0.06) inset, 0 1px 0 0 rgba(255, 255, 255, 0.08) inset',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #f59e0b 100%)',
      },
      backdropBlur: {
        glass: '24px',
      }
    },
  },
  plugins: [],
} satisfies Config

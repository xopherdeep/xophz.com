export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'zinc'
    },
    card: {
      variants: {
        variant: {
          outline: 'ring ring-zinc-200 dark:ring-white/10 bg-white dark:bg-white/[0.03] backdrop-blur-xl shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
          subtle: 'bg-zinc-50 dark:bg-white/[0.04] backdrop-blur-xl'
        }
      }
    },
    badge: {
      variants: {
        variant: {
          subtle: 'bg-{color}-500/10 text-{color}-600 dark:text-{color}-400'
        }
      }
    },
    button: {
      variants: {
        variant: {
          solid: 'shadow-md hover:shadow-lg transition-all duration-200',
          ghost: 'hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-all duration-200'
        }
      }
    },
    input: {
      variants: {
        variant: {
          outline: 'bg-white dark:bg-white/[0.04] ring-zinc-200 dark:ring-white/10 focus:ring-violet-500/50 dark:focus:ring-violet-400/40 transition-all duration-200'
        }
      }
    }
  }
})

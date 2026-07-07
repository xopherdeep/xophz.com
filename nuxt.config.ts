export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  content: {
    sources: {
      wiki: {
        driver: 'github',
        repo: 'xopherdeep/xophz.com.wiki',
        prefix: '/wiki'
      },
    },
  },

  nitro: {
    preset: 'github-pages'
  },
  app: {
    head: {
      title: 'xophz — Xopher Pollard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.',
        },
        { property: 'og:title', content: 'xophz — Xopher Pollard' },
        {
          property: 'og:description',
          content: 'Principal Systems Synthesist · Engineer · Builder.',
        },
        { name: 'theme-color', content: '#0a0a12' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})

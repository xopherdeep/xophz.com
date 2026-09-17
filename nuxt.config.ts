export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
    "nuxt-lucide-icons"
  ],

  components: {
    dirs: [
      { path: '~/components/organisms', extensions: ['.vue'], pathPrefix: false },
      { path: '~/components/molecules', extensions: ['.vue'], pathPrefix: false },
      { path: '~/components', extensions: ['.vue'] }
    ]
  },

  css: ["~/assets/css/main.css"],

  ui: {
    fonts: false
  },

  content: {},

  telemetry: false,

  image: {
    provider: "none"
  },

  hooks: {
    'content:file:beforeParse': (ctx: any) => {
      if (ctx.file.id.endsWith('.md') && typeof ctx.file.body === 'string') {
        const metaBlockPattern = /```meta\s*\n([\s\S]*?)\n```\s*(\n|$)/;
        const match = ctx.file.body.match(metaBlockPattern);
        if (match) {
          const metaYaml = match[1].trim();
          ctx.file.body = ctx.file.body.replace(metaBlockPattern, '').trimEnd();
          ctx.file.body = `---\n${metaYaml}\n---\n\n${ctx.file.body}`;
        }
      }
    }
  },

  nitro: {
    preset: "github-pages",
    prerender: {
      failOnError: false,
      crawlLinks: true,
    },
  },

  routeRules: {
    '/compass': { redirect: { to: '/my-compass', statusCode: 301 } },
    '/_nuxt/**': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    },
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },

  runtimeConfig: {
    public: {
      compassCheckoutUrl: process.env.NUXT_PUBLIC_COMPASS_CHECKOUT_URL || "https://www.mycompassconsulting.com",
      compassApiUrl: process.env.NUXT_PUBLIC_COMPASS_API_URL || "https://www.mycompassconsulting.com/wp-json/xophz/v1",
    }
  },

  app: {
    baseURL: "/",
    head: {
      title: "xophz · Xopher (XP) Pollard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Xopher (XP) Pollard" },
        {
          name: "description",
          content:
            "Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.",
        },

        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "xophz" },
        { property: "og:url", content: "https://xophz.com" },
        { property: "og:title", content: "xophz · Xopher (XP) Pollard" },
        {
          property: "og:description",
          content:
            "Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.",
        },
        {
          property: "og:image",
          content: "https://xophz.com/og_social_card.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Xopher (XP) Pollard · xophz" },
        { property: "og:locale", content: "en_US" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@xophz" },
        { name: "twitter:creator", content: "@xophz" },
        { name: "twitter:title", content: "xophz · Xopher (XP) Pollard" },
        {
          name: "twitter:description",
          content:
            "Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.",
        },
        {
          name: "twitter:image",
          content: "https://xophz.com/og_social_card.png",
        },
        { name: "twitter:image:alt", content: "Xopher (XP) Pollard · xophz" },

        { name: "theme-color", content: "#0a0a12" },
      ],
      script: [
        {
          innerHTML: `(() => {
  try {
    const storageKey = 'nuxt-color-mode';
    const stored = localStorage.getItem(storageKey);
    const isAuto = !stored || stored === 'system';
    if (isAuto) {
      const hour = new Date().getHours();
      const isDay = hour >= 6 && hour < 18;
      const theme = isDay ? 'light' : 'dark';
      document.documentElement.setAttribute('data-color-mode-forced', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  } catch (e) {}
})();`,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
        {
          rel: "preload",
          as: "image",
          type: "image/webp",
          href: "/xp_headshot.webp",
          fetchpriority: "high",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
      ],
      noscript: [
        {
          innerHTML:
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap">',
        },
      ],
    },
  },
});

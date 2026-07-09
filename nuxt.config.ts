export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content"],

  content: {},

  hooks: {
    'content:file:beforeParse': (ctx: any) => {
      if (ctx.file.id.endsWith('.md') && typeof ctx.file.body === 'string') {
        const metaBlockPattern = /```meta\s*\n([\s\S]*?)\n```\s*(\n|$)/;
        const match = ctx.file.body.match(metaBlockPattern);
        if (match) {
          const metaYaml = match[1].trim();
          ctx.file.body = ctx.file.body.replace(metaBlockPattern, '').trimEnd();
          ctx.file.body = `---\n${metaYaml}\n---\n\n${ctx.file.body}`;
          if (ctx.file.id.includes('25-years')) {
            require('fs').writeFileSync('/tmp/nuxt-body-debug.md', ctx.file.body);
          }
        }
      }
    }
  },

  nitro: {
    preset: "github-pages",
  },

  app: {
    baseURL: "/",
    head: {
      title: "xophz — Xopher Pollard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Xopher Pollard" },
        {
          name: "description",
          content:
            "Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.",
        },

        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "xophz" },
        { property: "og:url", content: "https://xophz.com" },
        { property: "og:title", content: "xophz — Xopher Pollard" },
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
        { property: "og:image:alt", content: "Xopher Pollard — xophz" },
        { property: "og:locale", content: "en_US" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@xophz" },
        { name: "twitter:creator", content: "@xophz" },
        { name: "twitter:title", content: "xophz — Xopher Pollard" },
        {
          name: "twitter:description",
          content:
            "Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.",
        },
        {
          name: "twitter:image",
          content: "https://xophz.com/og_social_card.png",
        },
        { name: "twitter:image:alt", content: "Xopher Pollard — xophz" },

        { name: "theme-color", content: "#0a0a12" },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-6FERWGTH0W",
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6FERWGTH0W');`,
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap",
        },
      ],
    },
  },
});

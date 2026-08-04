export interface CompassPlugin {
  key: string
  name: string
  codename: string
  category: 'Core System' | 'Gamification' | 'Security & Auth' | 'Media & Content' | 'Utilities & Performance' | 'Commerce & Social'
  desc: string
  tag: string
  color: string
  gradient: string
  logoUrl: string
  iconName: string
  repoUrl: string
  isCore?: boolean
  version?: string
}

export const useCompassPlugins = () => {
  const plugins = ref<CompassPlugin[]>([
    {
      key: 'compass-core',
      name: 'COMPASS Framework Core',
      codename: 'xophz-compass',
      category: 'Core System',
      desc: 'The central framework powering all Xophz COMPASS extensions, routing, component registries, and atomic design system.',
      tag: 'Core Framework · Live',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass/icon.svg',
      iconName: 'compass',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass',
      isCore: true,
      version: 'v26.7.26'
    },
    {
      key: 'xp-engine',
      name: 'XP Gamification Engine',
      codename: 'xophz-compass-xp',
      category: 'Gamification',
      desc: 'Gamification engine introducing XP, levels, achievement badges, and reward mechanics across the entire webwork.',
      tag: 'Gamification · Active',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-xp/icon.svg',
      iconName: 'sparkles',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-xp',
      isCore: true,
      version: 'v26.5.3'
    },
    {
      key: 'bomb-bag',
      name: 'Bomb Bag News Drip',
      codename: 'xophz-compass-bomb-bag',
      category: 'Media & Content',
      desc: 'Send email blasts, schedule newsletter campaigns, emergency announcements, and high-priority notification broadcasts.',
      tag: 'Alert System · Live',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-bomb-bag/icon.svg',
      iconName: 'flame',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-bomb-bag',
      version: 'v26.7.26'
    },
    {
      key: 'enchiridion',
      name: 'Enchiridion Knowledge Base',
      codename: 'xophz-compass-enchiridion',
      category: 'Media & Content',
      desc: 'Interactive documentation, living spellbook, and structured knowledge base wiki for modern software applications.',
      tag: 'Documentation · Live',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-enchiridion/icon.svg',
      iconName: 'book',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-enchiridion',
      version: 'v26.5.3'
    },
    {
      key: 'silver-arrow',
      name: 'Silver Arrow Split Test',
      codename: 'xophz-compass-silver-arrow',
      category: 'Utilities & Performance',
      desc: 'High-speed mail dispatcher, conversion optimization, and silver bullet A/B split testing engine.',
      tag: 'Marketing · Live',
      color: '#38bdf8',
      gradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-silver-arrow/icon.svg',
      iconName: 'target',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-silver-arrow',
      version: 'v26.5.3'
    },
    {
      key: 'lead-magnet',
      name: 'Lead Magnet Builder',
      codename: 'xophz-compass-lead-magnet',
      category: 'Commerce & Social',
      desc: 'Pull leads in with super-powered magnetic form builders, subscription capture, and CRM integration.',
      tag: 'Outreach · Active',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-lead-magnet/icon.svg',
      iconName: 'magnet',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-lead-magnet',
      version: 'v26.5.3'
    },
    {
      key: 'pixie-dust',
      name: 'Magic Pixie Dust',
      codename: 'xophz-compass-pixie-dust',
      category: 'Media & Content',
      desc: 'Manage pixels, micro-animations, particle canvas FX, and sprinkle visual magic across your site.',
      tag: 'UI & FX · Live',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #581c87 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-pixie-dust/icon.svg',
      iconName: 'wand',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-pixie-dust',
      version: 'v26.5.3'
    },
    {
      key: 'bugnet',
      name: 'Bugnet Diagnostics',
      codename: 'xophz-compass-bugnet',
      category: 'Utilities & Performance',
      desc: 'Bug tracking net, client telemetry, error capturing, and real-time frontend/backend log diagnostics.',
      tag: 'Diagnostics · Active',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-bugnet/icon.svg',
      iconName: 'bug',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-bugnet',
      version: 'v26.5.3'
    },
    {
      key: 'magic-cloak',
      name: 'Magic Cloak Privacy Guard',
      codename: 'xophz-compass-magic-cloak',
      category: 'Security & Auth',
      desc: 'Privacy masking, data anonymization, stealth mode, and security shielding for sovereign user identities.',
      tag: 'Privacy · Live',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #312e81 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-magic-cloak/icon.svg',
      iconName: 'shield',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-magic-cloak',
      version: 'v26.5.3'
    },
    {
      key: 'yellow-links',
      name: 'Yellow Links Hub',
      codename: 'xophz-compass-yellow-links',
      category: 'Commerce & Social',
      desc: 'Unified link aggregator with automatic WordPress authentication detection and personalized profile hubs.',
      tag: 'Link Hub · Live',
      color: '#eab308',
      gradient: 'linear-gradient(135deg, #eab308 0%, #854d0e 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-yellow-links/icon.svg',
      iconName: 'link',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-yellow-links',
      version: 'v26.5.3'
    },
    {
      key: 'gale-boomerang',
      name: 'Gale Boomerang Redirects',
      codename: 'xophz-compass-gale-boomerang',
      category: 'Utilities & Performance',
      desc: 'Dynamic URL rewrites, smart traffic bouncers, affiliate link routing, and resilient fallback redirection.',
      tag: 'Routing · Active',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-gale-boomerang/icon.svg',
      iconName: 'refresh',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-gale-boomerang',
      version: 'v26.5.3'
    },
    {
      key: 'golden-keys',
      name: 'Golden Keys Auth & API',
      codename: 'xophz-compass-golden-keys',
      category: 'Security & Auth',
      desc: 'Sovereign OAuth2, JWT token management, API key generation, and single sign-on (SSO) gateway.',
      tag: 'Security · Live',
      color: '#d97706',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #78350f 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-golden-keys/icon.svg',
      iconName: 'key',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-golden-keys',
      version: 'v26.5.3'
    },
    {
      key: 'hookshot',
      name: 'Hookshot Webhook Dispatcher',
      codename: 'xophz-compass-hookshot',
      category: 'Utilities & Performance',
      desc: 'Reliable webhook event dispatcher with automatic retry queues and third-party integration pipelines.',
      tag: 'Integrations · Active',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #881337 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-hookshot/icon.svg',
      iconName: 'zap',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-hookshot',
      version: 'v26.5.3'
    },
    {
      key: 'moving-castle',
      name: 'Moving Castle Sync',
      codename: 'xophz-compass-moving-castle',
      category: 'Core System',
      desc: 'Automated site migration, database snapshot sync, and multi-environment deployment orchestrator.',
      tag: 'Migration · Active',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #818cf8 0%, #3730a3 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-moving-castle/icon.svg',
      iconName: 'castle',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-moving-castle',
      version: 'v26.5.3'
    },
    {
      key: 'titans-mitt',
      name: 'Titan\'s Mitt Ingestion',
      codename: 'xophz-compass-titans-mitt',
      category: 'Utilities & Performance',
      desc: 'Heavy-duty media ingestion engine, cloud S3 storage syncing, and high-volume file processing.',
      tag: 'Storage · Active',
      color: '#64748b',
      gradient: 'linear-gradient(135deg, #64748b 0%, #1e293b 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-titans-mitt/icon.svg',
      iconName: 'layers',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-titans-mitt',
      version: 'v26.5.3'
    },
    {
      key: 'magic-formula',
      name: 'Magic Formula Evaluator',
      codename: 'xophz-compass-magic-formula',
      category: 'Utilities & Performance',
      desc: 'Dynamic expression evaluator, custom shortcode logic engine, and reactive data transformer.',
      tag: 'Logic Engine · Live',
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #134e4a 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-magic-formula/icon.svg',
      iconName: 'code',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-magic-formula',
      version: 'v26.5.3'
    },
    {
      key: 'glowitheflow',
      name: 'GlowitheFlow Network',
      codename: 'xophz-compass-glowitheflow',
      category: 'Commerce & Social',
      desc: 'Flow economy engine, creator tributaries, cross-promotional click credit ledger, and viral sharing mechanics.',
      tag: 'Creator Economy · Active',
      color: '#0284c7',
      gradient: 'linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-glowitheflow/icon.svg',
      iconName: 'waves',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-glowitheflow',
      version: 'v26.5.3'
    },
    {
      key: 'quests',
      name: 'Quests Engine',
      codename: 'xophz-compass-quests',
      category: 'Gamification',
      desc: 'Interactive campaign quests, onboarding task tracks, and gamified user milestones.',
      tag: 'Gamification · Live',
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #7c2d12 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-quests/icon.svg',
      iconName: 'flag',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-quests',
      version: 'v26.5.3'
    },
    {
      key: 'bazaar',
      name: 'Bazaar Store Mechanics',
      codename: 'xophz-compass-bazaar',
      category: 'Commerce & Social',
      desc: 'Decentralized marketplace engine, WooCommerce integration, digital goods checkout, and token rewards.',
      tag: 'E-Commerce · Active',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #34d399 0%, #064e3b 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-bazaar/icon.svg',
      iconName: 'bag',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-bazaar',
      version: 'v26.5.3'
    },
    {
      key: 'pegasus-boots',
      name: 'Pegasus Boots Cache',
      codename: 'xophz-compass-pegasus-boots',
      category: 'Utilities & Performance',
      desc: 'High-speed object cache, asset minification, critical CSS extraction, and page load accelerator.',
      tag: 'Performance · Active',
      color: '#38bdf8',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #1e3a8a 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-pegasus-boots/icon.svg',
      iconName: 'gauge',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-pegasus-boots',
      version: 'v26.5.3'
    },
    {
      key: 'mirror-shield',
      name: 'Mirror Shield Firewall',
      codename: 'xophz-compass-mirror-shield',
      category: 'Security & Auth',
      desc: 'Web application firewall (WAF), automated IP ban lists, anti-bot protection, and rate limiting.',
      tag: 'Security · Active',
      color: '#64748b',
      gradient: 'linear-gradient(135deg, #94a3b8 0%, #1e293b 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-mirror-shield/icon.svg',
      iconName: 'shield',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-mirror-shield',
      version: 'v26.5.3'
    },
    {
      key: 'midnight-nerd',
      name: 'Midnight Nerd Debugger',
      codename: 'xophz-compass-midnight-nerd',
      category: 'Utilities & Performance',
      desc: 'Developer overlay, query performance inspector, memory usage metrics, and live state debugger.',
      tag: 'Dev Tools · Live',
      color: '#8d105e',
      gradient: 'linear-gradient(135deg, #a21caf 0%, #4c0519 100%)',
      logoUrl: 'https://www.youmeos.com/wp-content/plugins/xophz-compass-midnight-nerd/icon.svg',
      iconName: 'moon',
      repoUrl: 'https://github.com/xopherdeep/Xophz-COMPASS/tree/main/wp-content/plugins/xophz-compass-midnight-nerd',
      version: 'v26.5.3'
    }
  ])

  const categories = computed(() => {
    const set = new Set(plugins.value.map(p => p.category))
    return ['All', ...Array.from(set)]
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchLivePlugins = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('https://www.youmeos.com/wp-json/compass/v1/plugins', {
        headers: { Accept: 'application/json' }
      })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          // Merge live plugin logoUrl if present
        }
      }
    } catch (e: any) {
      // Retain local fallback on network error
    } finally {
      isLoading.value = false
    }
  }

  return {
    plugins,
    categories,
    isLoading,
    error,
    fetchLivePlugins
  }
}

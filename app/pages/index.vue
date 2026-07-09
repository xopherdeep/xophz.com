<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

useSeoMeta({
  title: 'Xopher Pollard',
  description: 'Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.',
})

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts').order('date', 'DESC').limit(3).all()
)

const formatShortDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const postTypeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')

const canvasRef = ref<HTMLCanvasElement | null>(null)
let rafId = 0
const NODE_COUNT = 55
const MAX_DIST = 160
const NODE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b']

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string; pulseOffset: number }

function buildNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 1,
    color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
    pulseOffset: Math.random() * Math.PI * 2,
  }))
}



type PanelKey = 'home' | 'about' | 'whatido' | 'projects' | 'connect'
const activePanel = ref<PanelKey>('home')

const route = useRoute()
const router = useRouter()

const navigateTo = (panel: PanelKey) => {
  activePanel.value = panel
  if (route.hash !== `#${panel}`) {
    router.push({ hash: `#${panel}` })
  }
}

onMounted(() => {
  if (route.hash) {
    const hashPanel = route.hash.replace('#', '') as PanelKey
    if (['home', 'about', 'whatido', 'projects', 'connect'].includes(hashPanel)) {
      activePanel.value = hashPanel
    }
  }
})

watch(() => route.hash, (newHash) => {
  if (newHash) {
    const hashPanel = newHash.replace('#', '') as PanelKey
    if (['home', 'about', 'whatido', 'projects', 'connect'].includes(hashPanel)) {
      activePanel.value = hashPanel
    }
  } else {
    activePanel.value = 'home'
  }
})

const openAccordion = ref<string | null>(null)
const toggleAccordion = (key: string) => {
  openAccordion.value = openAccordion.value === key ? null : key
}



const skills = [
  { group: 'Architecture', items: ['Distributed Systems', 'Event-Driven Design', 'Domain-Driven Design', 'Microservices'] },
  { group: 'Cloud & Infra', items: ['AWS (20+ services)', 'Terraform', 'Docker / ECS', 'CI/CD Pipelines'] },
  { group: 'Frontend', items: ['Vue 3 / Nuxt', 'React / Next.js', 'TypeScript', 'Design Systems'] },
  { group: 'Backend', items: ['Node.js', 'GraphQL', 'REST APIs', 'PostgreSQL · Redis'] },
]

const whatIDo = [
  { key: 'modernize', title: 'Legacy Modernization', icon: '⚡', desc: 'I take rotting monoliths and carve them into clean, scalable services - without burning the company down during the migration.' },
  { key: 'architect', title: 'Systems Architecture', icon: '🏗', desc: 'End-to-end architectural blueprints that carry your org from startup chaos to enterprise-grade reliability, cloud-first from day one.' },
  { key: 'lead', title: 'Engineering Leadership', icon: '🎯', desc: 'CTO / VP Eng experience. I build the teams, processes, and culture that ship product - fast, reliably, and with pride.' },
  { key: 'found', title: 'Founding & Advising', icon: '🚀', desc: "Multiple founder credits. I know the terror and the thrill. I help early-stage teams avoid the pitfalls I've already survived." },
]

// --- ECOSYSTEM PROJECTS ---
const projects = [
  // --- THE SOURCE & PHILOSOPHY ---
  {
    key: 'hotg',
    name: 'Hall of the Gods, Inc.',
    tag: 'Parent Co · Live',
    color: 'rgb(217, 190, 111)',
    url: 'https://www.hallofthegods.com',
    desc: 'The Nexus of Limitless Potential - a protective Webwork for creators, brands, and ventures of any scale. Parent company housing the entire ecosystem.',
  },
  {
    key: 'triforce',
    name: 'Triforce of the Gods',
    tag: 'Architecture · Live',
    color: '#d9be6f',
    url: 'https://www.triforceofthegods.com',
    desc: 'The explicit source code of reality. A philosophical and architectural framework bridging sacred geometry, alchemical principles, and decentralized web mechanics into a unified system for creation.',
  },
  {
    key: 'sacredrealm',
    name: 'Sacred Realm',
    tag: 'Community · Live',
    color: '#c5a059',
    url: 'https://www.sacredrealm.org',
    desc: 'Forging transformative art and community. A sovereign digital space sheltered within the Hall\'s Umbra, dedicated to the intersection of creative expression, deep lore, and decentralized connection.',
  },

  // --- THE INFRASTRUCTURE ---
  {
    key: 'blackbox',
    name: 'BlackBOX / w⁴ Protocol',
    tag: 'Infrastructure · Live',
    color: '#555',
    url: 'https://www.buildablox.com', 
    desc: 'Proprietary sovereign infrastructure - self-healing, fully automated BlackBOX nodes networked via the w⁴ Hyper-cube Protocol. The backbone of the Worldwide Webwork.',
  },
  {
    key: 'tucsonerd',
    name: 'Tucsonerd ACS',
    tag: 'Local Base · Active',
    color: 'green',
    url: 'https://acs.tucsonerd.com/',
    desc: 'Local infrastructure anchored in the Sonoran desert. Bridging the gap between the global Webwork and physical reality, providing architectural support for the Tucson and Oro Valley digital frontier.',
  },

  // --- THE MECHANICS & DEEP CODE ---
  {
    key: 'midnightnerd',
    name: 'Midnight Nerd',
    tag: 'Deep Code · Active',
    color: '#8d105e',
    url: 'https://www.midnightnerd.com',
    desc: 'The ultimate secret weapon. Operating in the twilight hours, this represents the deep-code alchemy and meticulous late-night engineering required to keep the ecosystem\'s architecture flawless.',
  },
  {
    key: 'forthexp',
    name: 'Do It for the XP',
    tag: 'Productivity · Live',
    color: '#f30b0b',
    url: 'https://doit.forthexp.com',
    desc: 'Turn productivity into an adventure worth playing. A gamified progression system and organizational toolset that translates real-world grinds and milestones into tangible, rewarding mechanics.',
  },
  {
    key: 'mro-wizard',
    name: 'My Remarkably Organized Planner Wizard',
    tag: 'Productivity · Live',
    color: '#0ea5e9', 
    url: 'https://planner.mycompassconsulting.com', // Replace with exact deployment URL if different
    desc: 'The gateway to meticulous organization. A comprehensive digital planning tool and onboarding ecosystem designed to bring structural integrity and automated clarity to daily workflows.',
  },
  {
    key: 'glowitheflow',
    name: 'GlowitheFlow',
    tag: 'Social · Active Build',
    color: '#007bff',
    url: 'https://www.glowitheflow.com',
    desc: 'A next-gen creator network built on mutual promotion economics. Think Reddit if Reddit actually wanted you to succeed - Flow economy, Tributaries, gamified click-value.',
  },

  // --- THE STEWARDSHIP ---
  {
    key: 'compass',
    name: 'My Compass Consulting',
    tag: 'Advisory · Live',
    color: 'rgb(49, 128, 137)',
    url: 'https://www.mycompassconsulting.com',
    desc: 'Strategic Synthesis - the rare bridge between executive vision and rigorous engineering. Three pillars: Structural Integrity, Meticulous Performance, Strategic Clarity.',
  },
  {
    key: 'bbwg',
    name: 'BlackBOX WhiteGLOVE',
    tag: 'Managed Service · Live',
    color: '#fff',
    url: 'https://www.blackboxwhiteglove.com',
    desc: 'Premium concierge digital management - Signature ($249/mo), Concierge, and Enterprise tiers. Your entire digital footprint managed so you can focus on creation.',
  },

  // --- THE HORIZON ---
  {
    key: 'webwork',
    name: 'Worldwide Webwork',
    tag: 'Infrastructure · Live',
    color: 'rgb(61, 238, 152)',
    url: 'https://www.worldwidewebwork.com',
    desc: 'The foundational architecture where sovereignty is anchored. Designed for speed, security, and stability, it provides the sovereign infrastructure and stable ground that anchors the entire Hall.',
  },
  {
    key: 'youmeos',
    name: 'YouMeOS',
    tag: 'Vision · 100-Year Play',
    color: '#a78bfa',
    url: 'https://www.youmeos.com',
    desc: 'A spatial OS for the web - Vue + WebGPU over the Compass Engine. Each install is a Youniverse: HeliOS (command center), NexOS (relational layer), NoOSphere (collective thought).',
  },
];

const links = [
  // --- Professional & Developer ---
  { id: 'link-github', label: 'GitHub', href: 'https://github.com/xopherdeep', color: '#e4e4e7', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>` },
  { id: 'link-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/xophz', color: '#0a66c2', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },

  // --- Community & Social ---
  { id: 'link-discord', label: 'Discord', href: 'https://discord.gg/2QDwKKxEqb', color: '#5865f2', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` },
  { id: 'link-twitter', label: 'X / Twitter', href: 'https://twitter.com/xopherdeep', color: '#e4e4e7', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },

  // --- Payments ---
  { id: 'link-cash', label: 'Cash App', href: 'https://cash.app/$xopherdeep', color: '#00D632', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.516 0C5.147 0 0 5.161 0 11.543 0 17.925 5.147 23.086 11.516 23.086c6.353 0 11.516-5.161 11.516-11.543C23.032 5.161 17.869 0 11.516 0Zm6.425 15.306-1.579 2.052h-2.146v1.396h-2.736v-1.396H6.168l-1.066-1.381 2.383-1.84c.324.42.753.766 1.285 1.037.531.271 1.258.406 2.181.406h1.229c.64 0 1.127-.14 1.46-.421.334-.281.5-.66.5-1.139 0-.422-.167-.783-.5-1.082-.334-.3-.825-.56-1.474-.783l-1.996-.653c-1.312-.413-2.259-.92-2.842-1.521-.583-.601-.875-1.406-.875-2.414 0-.82.207-1.525.621-2.115.414-.59 1.002-1.026 1.764-1.309V2.554h2.736v1.498h4.48l.968 1.341-2.28 1.706c-.344-.396-.75-.689-1.218-.88-.468-.191-1.036-.286-1.702-.286h-.735c-.779 0-1.332.141-1.66.422-.328.281-.492.658-.492 1.131 0 .432.181.794.542 1.085.361.291.956.578 1.785.861l2.057.69c1.139.382 1.979.883 2.518 1.503.539.62.809 1.442.809 2.466 0 .864-.236 1.614-.707 2.248-.471.634-1.123 1.096-1.954 1.387v1.58Z"/></svg>` },
  { id: 'link-venmo', label: 'Venmo', href: 'https://venmo.com/u/xopherdeep', color: '#008CFF', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.663 21.053c-3.774 0-6.177-3.031-6.177-7.854L7.546 1.58h4.945l-1.998 10.983c-.027.168-.041.336-.041.507 0 2.213 1.171 3.529 2.97 3.529 2.116 0 4.148-1.503 4.981-3.619l2.128-11.4h4.945l-2.446 13.064c-1.427 4.103-5.26 6.409-11.367 6.409z"/></svg>` },

  // --- Direct Contact ---
  { id: 'link-email', label: 'Email', href: 'mailto:sayhi@xophz.com', color: '#f59e0b', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>` },

]

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  const ctx = canvas.getContext('2d')!
  let nodes: Node[] = []
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; nodes = buildNodes(canvas.width, canvas.height) }
  const draw = (t: number) => {
    const { width: w, height: h } = canvas
    ctx.clearRect(0, 0, w, h)
    for (const node of nodes) { node.x += node.vx; node.y += node.vy; if (node.x < 0 || node.x > w) node.vx *= -1; if (node.y < 0 || node.y > h) node.vy *= -1 }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]; const b = nodes[j]
        const dx = a.x - b.x; const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > MAX_DIST) continue
        const alpha = (1 - dist / MAX_DIST) * 0.18
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        grad.addColorStop(0, a.color); grad.addColorStop(1, b.color)
        ctx.strokeStyle = grad; ctx.globalAlpha = alpha; ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }
    }
    for (const node of nodes) {
      const pulse = Math.sin(t * 0.001 + node.pulseOffset) * 0.4 + 0.6
      ctx.globalAlpha = pulse * 0.75; ctx.fillStyle = node.color
      ctx.shadowColor = node.color; ctx.shadowBlur = 6
      ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0
    }
    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(draw)
  }
  resize()
  window.addEventListener('resize', resize)
  rafId = requestAnimationFrame(draw)
  onUnmounted(() => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) })
})
</script>

<template>
  <main class="app-shell">
    <canvas
      ref="canvasRef"
      class="particle-canvas"
      aria-hidden="true"
    />
    <div
      class="orb orb-purple"
      aria-hidden="true"
    />
    <div
      class="orb orb-cyan"
      aria-hidden="true"
    />
    <div
      class="orb orb-amber"
      aria-hidden="true"
    />

    <div class="panel-stage">
      <Transition
        name="panel"
        mode="out-in"
      >
        <section
          v-if="activePanel === 'home'"
          key="home"
          class="panel"
          aria-label="Home"
        >
          <div class="avatar-ring">
            <div class="avatar"><span class="avatar-initials">XP</span></div>
          </div>
          <div class="identity">
            <p class="site-handle">xophz.com</p>
            <h1 class="name">Xopher Pollard</h1>
            <p class="role">Principal Systems Synthesist</p>
            <p class="bio">25+ years engineering massive-scale software. I build the architectural blueprints
              enterprises stake their futures on - cloud-first, modular, and built to last.</p>
          </div>
          <ul
            class="tag-row"
            aria-label="Skills and roles"
          >
            <li class="tag">Principal Architect</li>
            <li class="tag">CTO / VP Eng</li>
            <li class="tag">AWS · Node.js · Vue</li>
            <li class="tag">Legacy Modernization</li>
            <li class="tag">Founder</li>
            <li class="tag">25+ Years</li>
          </ul>
          <div class="cta-row">
            <button
              id="cta-about"
              class="cta-btn primary"
              @click="navigateTo('about')"
            >Who I Am</button>
            <button
              id="cta-connect"
              class="cta-btn ghost"
              @click="navigateTo('connect')"
            >Connect</button>
            <NuxtLink
              id="cta-posts"
              to="/posts"
              class="cta-btn ghost posts-link"
            >Posts ♣</NuxtLink>
          </div>

          <div
            v-if="recentPosts && recentPosts.length"
            class="recent-posts-widget"
          >
            <div class="recent-posts-header">
              <span class="section-label-sm">RECENT POSTS</span>
              <NuxtLink
                to="/posts"
                class="view-all-link"
              >View all →</NuxtLink>
            </div>
            <div class="recent-posts-list">
              <NuxtLink
                v-for="post in recentPosts"
                :key="post.path"
                :to="post.path"
                class="recent-post-item"
                :style="{ '--rp-color': postTypeColor(post.type ?? 'article') }"
              >
                <span class="rp-dot" />
                <span class="rp-title">{{ post.title }}</span>
                <time class="rp-date">{{ formatShortDate(post.date) }}</time>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section
          v-else-if="activePanel === 'about'"
          key="about"
          class="panel"
          aria-label="Who I Am"
        >
          <h2 class="panel-title">Who I Am</h2>
          <p class="panel-lead">I'm Xopher - a systems thinker, builder, and architect who has spent 25+ years at the
            intersection of technology and business impact.</p>
          <div class="glass-card bio-card">
            <p>I've led engineering at Series A through Fortune 500. I've been a co-founder, a solo contributor, a CTO,
              and everything in between. My superpower is seeing the entire system - code, team, process, and market -
              as one coherent machine that needs to be tuned.</p>
          </div>
          <div class="section-label">SKILLS &amp; STACK</div>
          <div class="skill-grid">
            <div
              v-for="group in skills"
              :key="group.group"
              class="skill-group glass-card"
            >
              <p class="skill-group-name">{{ group.group }}</p>
              <ul class="skill-list">
                <li
                  v-for="skill in group.items"
                  :key="skill"
                  class="skill-item"
                >{{ skill }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          v-else-if="activePanel === 'whatido'"
          key="whatido"
          class="panel"
          aria-label="What I Do"
        >
          <h2 class="panel-title">What I Do</h2>
          <p class="panel-lead">I solve the hard problems - the ones that keep CTOs up at night and boards questioning
            their technology bets.</p>
          <div class="accordion-list">
            <div
              v-for="item in whatIDo"
              :key="item.key"
              class="accordion-item glass-card"
              :class="{ expanded: openAccordion === item.key }"
            >
              <button
                :id="`accordion-${item.key}`"
                class="accordion-trigger"
                :aria-expanded="openAccordion === item.key"
                @click="toggleAccordion(item.key)"
              >
                <span class="accordion-icon">{{ item.icon }}</span>
                <span class="accordion-title">{{ item.title }}</span>
                <span
                  class="accordion-chevron"
                  :class="{ rotated: openAccordion === item.key }"
                >›</span>
              </button>
              <Transition name="accordion">
                <p
                  v-if="openAccordion === item.key"
                  class="accordion-body"
                >{{ item.desc }}</p>
              </Transition>
            </div>
          </div>
        </section>

        <section
          v-else-if="activePanel === 'projects'"
          key="projects"
          class="panel"
          aria-label="Projects"
        >
          <h2 class="panel-title">Magnum Opus</h2>
          <p class="panel-lead">The Hall of the Gods ecosystem - infrastructure, services, and visions I'm building.</p>
          <div class="project-list">
            <div
              v-for="project in projects"
              :key="project.key"
              class="project-card glass-card"
              :style="{ '--proj-color': project.color }"
            >
              <div class="project-top">
                <div class="project-dot" />
                <span class="project-tag">{{ project.tag }}</span>
                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                >Visit ↗</a>
              </div>
              <p class="project-name">{{ project.name }}</p>
              <p class="project-desc">{{ project.desc }}</p>
            </div>
          </div>
        </section>

        <section
          v-else-if="activePanel === 'connect'"
          key="connect"
          class="panel"
          aria-label="Connect"
        >
          <h2 class="panel-title">Connect</h2>
          <p class="panel-lead">Find me where the builders hang out.</p>
          <nav
            class="social-grid"
            aria-label="Social links"
          >
            <a
              v-for="link in links"
              :id="link.id"
              :key="link.id"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="social-card"
              :style="{ '--link-color': link.color }"
            >
              <span
                class="social-icon"
                v-html="link.icon"
              />
              <span class="social-label">{{ link.label }}</span>
              <svg
                class="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </nav>
        </section>
      </Transition>
    </div>


  </main>
</template>

<style scoped>
  .app-shell {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .particle-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: driftOrb 18s ease-in-out infinite;
  }

  .orb-purple {
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%);
    top: -10%;
    left: -15%;
    animation-duration: 20s;
  }

  .orb-cyan {
    width: 360px;
    height: 360px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%);
    bottom: 5%;
    right: -10%;
    animation-delay: -7s;
    animation-duration: 24s;
  }

  .orb-amber {
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
    top: 50%;
    left: 60%;
    animation-delay: -14s;
    animation-duration: 28s;
  }

  @keyframes driftOrb {

    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }

    33% {
      transform: translate(30px, -20px) scale(1.06);
    }

    66% {
      transform: translate(-20px, 15px) scale(0.96);
    }
  }


  .panel-stage {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 540px;
    padding: 72px 1rem 80px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .panel-title {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.03em;
    align-self: flex-start;
  }

  .panel-lead {
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-secondary);
    align-self: flex-start;
  }

  .glass-card {
    width: 100%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    backdrop-filter: blur(28px) saturate(1.6);
    -webkit-backdrop-filter: blur(28px) saturate(1.6);
    padding: 1.25rem;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.1) inset,
      0 8px 32px rgba(0, 0, 0, 0.4);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .glass-card:hover {
    border-color: rgba(139, 92, 246, 0.25);
    background: rgba(255, 255, 255, 0.08);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.12) inset,
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(139, 92, 246, 0.06);
  }

  .avatar-ring {
    padding: 3px;
    border-radius: 50%;
    background: var(--gradient-hero);
    animation: spinGlow 6s linear infinite;
  }

  @keyframes spinGlow {
    0% {
      filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
    }

    50% {
      filter: hue-rotate(30deg) drop-shadow(0 0 14px rgba(6, 182, 212, 0.5));
    }

    100% {
      filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
    }
  }

  .avatar {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--bg);
  }

  .avatar-initials {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    background: var(--gradient-hero);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .identity {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .site-handle {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.8;
  }

  .name {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .role {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent-2);
    letter-spacing: 0.02em;
  }

  .bio {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--text-secondary);
    max-width: 36ch;
    margin-inline: auto;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .tag {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.25);
    color: var(--text-secondary);
    white-space: nowrap;
    transition: all 0.2s ease;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  }

  .tag:hover {
    background: rgba(139, 92, 246, 0.22);
    border-color: rgba(139, 92, 246, 0.5);
    color: var(--text-primary);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 0 12px rgba(139, 92, 246, 0.15);
  }

  .cta-row {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    justify-content: center;
  }

  .cta-btn {
    padding: 0.75rem 1.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    letter-spacing: 0.01em;
  }

  .cta-btn.primary {
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    border: none;
    color: #fff;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
  }

  .cta-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(139, 92, 246, 0.55);
  }

  .cta-btn.ghost {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: var(--text-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  }

  .cta-btn.ghost:hover {
    border-color: rgba(139, 92, 246, 0.4);
    color: var(--text-primary);
    background: rgba(139, 92, 246, 0.12);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 4px 16px rgba(139, 92, 246, 0.1);
  }

  .bio-card p {
    font-size: 0.875rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .section-label {
    align-self: flex-start;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .skill-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .skill-group {
    padding: 1rem;
  }

  .skill-group-name {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.6rem;
  }

  .skill-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .skill-item {
    font-size: 0.8rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .skill-item::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent-2);
    flex-shrink: 0;
  }

  .accordion-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .accordion-item {
    padding: 0;
    overflow: hidden;
  }

  .accordion-item.expanded {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.1) inset, 0 8px 32px rgba(0, 0, 0, 0.35);
  }

  .accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    text-align: left;
  }

  .accordion-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .accordion-title {
    flex: 1;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .accordion-chevron {
    font-size: 1.2rem;
    color: var(--text-muted);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
    display: inline-block;
  }

  .accordion-chevron.rotated {
    transform: rotate(90deg);
    color: var(--accent);
  }

  .accordion-body {
    padding: 0 1.25rem 1.1rem;
    font-size: 0.85rem;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  .accordion-enter-active,
  .accordion-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    max-height: 200px;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .project-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-card {
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--proj-color);
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 12px var(--proj-color);
  }

  .project-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }

  .project-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--proj-color);
    box-shadow: 0 0 8px var(--proj-color);
    flex-shrink: 0;
  }

  .project-tag {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--proj-color);
  }

  .project-name {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.4rem;
  }

  .project-desc {
    font-size: 0.82rem;
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .project-link {
    margin-left: auto;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--proj-color);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }

  .project-link:hover {
    opacity: 1;
  }

  .social-grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .social-card {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem 1.1rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-primary);
    text-decoration: none;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
      0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .social-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 0% 50%, var(--link-color), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .social-card:hover {
    border-color: var(--link-color);
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.12) inset,
      0 8px 24px rgba(0, 0, 0, 0.35),
      -4px 0 16px -2px var(--link-color);
  }

  .social-card:hover::before {
    opacity: 0.08;
  }

  .social-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: var(--link-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-icon :deep(svg) {
    width: 100%;
    height: 100%;
  }

  .social-label {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .arrow {
    width: 16px;
    height: 16px;
    color: var(--text-muted);
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .social-card:hover .arrow {
    transform: translate(2px, -2px);
    color: var(--text-secondary);
  }




  .panel-enter-active {
    animation: fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .panel-leave-active {
    animation: fadeDown 0.25s ease both;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeDown {
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .posts-link {
    color: #a78bfa;
    border-color: rgba(139, 92, 246, 0.25);
    cursor: pointer;
  }

  .posts-link:hover {
    background: rgba(139, 92, 246, 0.12);
    border-color: rgba(139, 92, 246, 0.4);
    color: #c4b5fd;
  }

  .recent-posts-widget {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .recent-posts-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .section-label-sm {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted, #71717a);
  }

  .view-all-link {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent, #8b5cf6);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .view-all-link:hover {
    opacity: 1;
  }

  .recent-posts-list {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
      0 4px 16px rgba(0, 0, 0, 0.25);
  }

  .recent-post-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.7rem 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    transition: background 0.15s ease;
    cursor: pointer;
  }

  .recent-post-item:last-child {
    border-bottom: none;
  }

  .recent-post-item:hover {
    background: rgba(139, 92, 246, 0.07);
  }

  .rp-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--rp-color, #8b5cf6);
    flex-shrink: 0;
    box-shadow: 0 0 6px var(--rp-color, #8b5cf6);
  }

  .rp-title {
    flex: 1;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text-secondary, #a1a1aa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .recent-post-item:hover .rp-title {
    color: var(--text-primary, #f4f4f5);
  }

  .rp-date {
    font-size: 0.68rem;
    color: var(--text-muted, #71717a);
    flex-shrink: 0;
  }
</style>

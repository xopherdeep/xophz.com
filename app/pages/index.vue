<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

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

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

type PanelKey = 'home' | 'about' | 'whatido' | 'projects' | 'connect'
const activePanel = ref<PanelKey>('home')
const navigateTo = (panel: PanelKey) => {
  activePanel.value = panel
  closeMenu()
}

const openAccordion = ref<string | null>(null)
const toggleAccordion = (key: string) => {
  openAccordion.value = openAccordion.value === key ? null : key
}

const navItems = [
  { key: 'home' as PanelKey, label: 'Home', icon: '◎' },
  { key: 'about' as PanelKey, label: 'Who I Am', icon: '♥' },
  { key: 'whatido' as PanelKey, label: 'What I Do', icon: '♣' },
  { key: 'projects' as PanelKey, label: 'Projects', icon: '♦' },
  { key: 'connect' as PanelKey, label: 'Connect', icon: '♠' },
]

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

const projects = [
  {
    key: 'hotg',
    name: 'Hall of the Gods, Inc.',
    tag: 'Parent Co · Live',
    color: '#8b5cf6',
    url: 'https://www.hallofthegods.com',
    desc: 'The Nexus of Limitless Potential - a protective Webwork for creators, brands, and ventures of any scale. Parent company housing the entire ecosystem.',
  },
  {
    key: 'blackbox',
    name: 'BlackBOX / w⁴ Protocol',
    tag: 'Infrastructure · Live',
    color: '#06b6d4',
    url: 'https://www.worldwidewebwork.com',
    desc: 'Proprietary sovereign infrastructure - self-healing, fully automated BlackBOX nodes networked via the w⁴ Hyper-cube Protocol. The backbone of the Worldwide Webwork.',
  },
  {
    key: 'bbwg',
    name: 'BlackBOX WhiteGLOVE',
    tag: 'Managed Service · Live',
    color: '#f59e0b',
    url: 'https://www.blackboxwhiteglove.com',
    desc: 'Premium concierge digital management - Signature ($249/mo), Concierge, and Enterprise tiers. Your entire digital footprint managed so you can focus on creation.',
  },
  {
    key: 'compass',
    name: 'My Compass Consulting',
    tag: 'Advisory · Live',
    color: '#10b981',
    url: 'https://www.mycompassconsulting.com',
    desc: 'Strategic Synthesis - the rare bridge between executive vision and rigorous engineering. Three pillars: Structural Integrity, Meticulous Performance, Strategic Clarity.',
  },
  {
    key: 'glowitheflow',
    name: 'GlowitheFlow',
    tag: 'Social · Active Build',
    color: '#f43f5e',
    url: null,
    desc: 'A next-gen creator network built on mutual promotion economics. Think Reddit if Reddit actually wanted you to succeed - Flow economy, Tributaries, gamified click-value.',
  },
  {
    key: 'youmeos',
    name: 'YouMeOS',
    tag: 'Vision · 100-Year Play',
    color: '#a78bfa',
    url: null,
    desc: 'A spatial OS for the web - Vue + WebGPU over the Compass Engine. Each install is a Youniverse: HeliOS (command center), NexOS (relational layer), NoOSphere (collective thought).',
  },
]

const links = [
  { id: 'link-github', label: 'GitHub', href: 'https://github.com/xopherdeep', color: '#e4e4e7', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>` },
  { id: 'link-twitter', label: 'X / Twitter', href: 'https://twitter.com/xopherdeep', color: '#e4e4e7', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
  { id: 'link-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/xophz', color: '#0a66c2', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  { id: 'link-discord', label: 'Discord', href: 'https://discord.gg/2QDwKKxEqb', color: '#5865f2', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` },
  { id: 'link-email', label: 'Email', href: 'mailto:xopher@xophz.com', color: '#f59e0b', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>` },
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

    <button
      id="hamburger-btn"
      class="hamburger"
      :class="{ open: menuOpen }"
      aria-label="Toggle navigation"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
    </button>

    <header class="top-bar">
      <span class="top-handle">xophz.com</span>
      <span class="top-panel-title">{{ navItems.find(n => n.key === activePanel)?.label ?? 'Home' }}</span>
    </header>

    <Transition name="overlay">
      <div
        v-if="menuOpen"
        class="drawer-overlay"
        @click="closeMenu"
      />
    </Transition>

    <Transition name="drawer">
      <nav
        v-if="menuOpen"
        class="nav-drawer"
        aria-label="Main navigation"
      >
        <div class="drawer-header">
          <div class="drawer-avatar">XP</div>
          <div class="drawer-identity">
            <p class="drawer-name">Xopher Pollard</p>
            <p class="drawer-role">Principal Systems Synthesist</p>
          </div>
        </div>
        <ul class="nav-list">
          <li
            v-for="item in navItems"
            :key="item.key"
          >
            <button
              :id="`nav-${item.key}`"
              class="nav-item"
              :class="{ active: activePanel === item.key }"
              @click="navigateTo(item.key)"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
              <span class="nav-arrow">›</span>
            </button>
          </li>
        </ul>
        <div class="drawer-footer">
          <p class="drawer-copy">© {{ new Date().getFullYear() }} Xopher Pollard</p>
        </div>
      </nav>
    </Transition>

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
            >Posts ✦</NuxtLink>
          </div>

          <div v-if="recentPosts && recentPosts.length" class="recent-posts-widget">
            <div class="recent-posts-header">
              <span class="section-label-sm">RECENT POSTS</span>
              <NuxtLink to="/posts" class="view-all-link">View all →</NuxtLink>
            </div>
            <div class="recent-posts-list">
              <NuxtLink
                v-for="post in recentPosts"
                :key="post._path"
                :to="post._path"
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
          <h2 class="panel-title">Projects</h2>
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

    <nav
      class="bottom-nav"
      aria-label="Quick navigation"
    >
      <button
        v-for="item in navItems"
        :id="`bottom-nav-${item.key}`"
        :key="item.key"
        class="bottom-nav-item"
        :class="{ active: activePanel === item.key }"
        :aria-label="item.label"
        @click="navigateTo(item.key)"
      >
        <span class="bottom-nav-icon">{{ item.icon }}</span>
        <span class="bottom-nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </main>
</template>

<style scoped>
  .app-shell {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4rem;
    background: rgba(10, 10, 18, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .top-handle {
    position: absolute;
    left: 4rem;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.7;
  }

  .top-panel-title {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .hamburger {
    position: fixed;
    top: 12px;
    left: 16px;
    z-index: 100;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .hamburger:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .bar {
    display: block;
    width: 18px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open .bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.open .bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .nav-drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 70;
    width: min(320px, 88vw);
    display: flex;
    flex-direction: column;
    background: rgba(10, 10, 20, 0.92);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border-right: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow: 4px 0 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  }

  .drawer-header {
    padding: 4.5rem 1.5rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .drawer-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }

  .drawer-name {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .drawer-role {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 0.2rem;
  }

  .nav-list {
    flex: 1;
    padding: 1rem 0.75rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: left;
  }

  .nav-item:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.15);
    color: var(--text-primary);
  }

  .nav-item.active {
    background: rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.35);
    color: var(--text-primary);
    box-shadow: 0 0 16px rgba(139, 92, 246, 0.1) inset;
  }

  .nav-icon {
    font-size: 1rem;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-label {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .nav-arrow {
    font-size: 1.1rem;
    color: var(--text-muted);
    transition: transform 0.2s ease;
  }

  .nav-item:hover .nav-arrow,
  .nav-item.active .nav-arrow {
    transform: translateX(2px);
    color: var(--accent);
  }

  .drawer-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .drawer-copy {
    font-size: 0.7rem;
    color: var(--text-muted);
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
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 1.25rem;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.35);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .glass-card:hover {
    border-color: rgba(139, 92, 246, 0.2);
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
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    color: var(--text-secondary);
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .tag:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.45);
    color: var(--text-primary);
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
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-secondary);
  }

  .cta-btn.ghost:hover {
    border-color: rgba(139, 92, 246, 0.4);
    color: var(--text-primary);
    background: rgba(139, 92, 246, 0.08);
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: var(--text-primary);
    text-decoration: none;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
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
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(4px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), -4px 0 12px -2px var(--link-color);
  }

  .social-card:hover::before {
    opacity: 0.06;
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

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 0.5rem;
    background: rgba(10, 10, 18, 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    gap: 0.25rem;
  }

  .bottom-nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 0.4rem 0.25rem;
    border-radius: 10px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .bottom-nav-item:hover {
    color: var(--text-secondary);
  }

  .bottom-nav-item.active {
    color: var(--accent);
  }

  .bottom-nav-item.active .bottom-nav-icon {
    background: rgba(139, 92, 246, 0.15);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
  }

  .bottom-nav-icon {
    font-size: 1rem;
    width: 34px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }

  .bottom-nav-label {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }

  .drawer-enter-active,
  .drawer-leave-active {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateX(-100%);
  }

  .overlay-enter-active,
  .overlay-leave-active {
    transition: opacity 0.3s ease;
  }

  .overlay-enter-from,
  .overlay-leave-to {
    opacity: 0;
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

  .view-all-link:hover { opacity: 1; }

  .recent-posts-list {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    overflow: hidden;
  }

  .recent-post-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.7rem 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    transition: background 0.15s ease;
  }

  .recent-post-item:last-child { border-bottom: none; }

  .recent-post-item:hover { background: rgba(139, 92, 246, 0.07); }

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

  .recent-post-item:hover .rp-title { color: var(--text-primary, #f4f4f5); }

  .rp-date {
    font-size: 0.68rem;
    color: var(--text-muted, #71717a);
    flex-shrink: 0;
  }
</style>


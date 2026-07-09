<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'

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
  { key: 'modernize', title: 'Legacy Modernization', icon: resolveComponent('LucideZap'), desc: 'I take rotting monoliths and carve them into clean, scalable services - without burning the company down during the migration.' },
  { key: 'architect', title: 'Systems Architecture', icon: resolveComponent('LucideBuilding2'), desc: 'End-to-end architectural blueprints that carry your org from startup chaos to enterprise-grade reliability, cloud-first from day one.' },
  { key: 'lead', title: 'Engineering Leadership', icon: resolveComponent('LucideTarget'), desc: 'CTO / VP Eng experience. I build the teams, processes, and culture that ship product - fast, reliably, and with pride.' },
  { key: 'found', title: 'Founding & Advising', icon: resolveComponent('LucideRocket'), desc: "Multiple founder credits. I know the terror and the thrill. I help early-stage teams avoid the pitfalls I've already survived." },
]

const projects = [
  { key: 'hotg', name: 'Hall of the Gods, Inc.', tag: 'Parent Co · Live', color: 'rgb(217, 190, 111)', url: 'https://www.hallofthegods.com', desc: 'The Nexus of Limitless Potential - a protective Webwork for creators, brands, and ventures of any scale. Parent company housing the entire ecosystem.' },
  { key: 'triforce', name: 'Triforce of the Gods', tag: 'Architecture · Live', color: '#d9be6f', url: 'https://www.triforceofthegods.com', desc: 'The explicit source code of reality. A philosophical and architectural framework bridging sacred geometry, alchemical principles, and decentralized web mechanics into a unified system for creation.' },
  { key: 'sacredrealm', name: 'Sacred Realm', tag: 'Community · Live', color: '#c5a059', url: 'https://www.sacredrealm.org', desc: 'Forging transformative art and community. A sovereign digital space sheltered within the Hall\'s Umbra, dedicated to the intersection of creative expression, deep lore, and decentralized connection.' },
  { key: 'blackbox', name: 'BlackBOX / w⁴ Protocol', tag: 'Infrastructure · Live', color: '#555', url: 'https://www.buildablox.com', desc: 'Proprietary sovereign infrastructure - self-healing, fully automated BlackBOX nodes networked via the w⁴ Hyper-cube Protocol. The backbone of the Worldwide Webwork.' },
  { key: 'tucsonerd', name: 'Tucsonerd ACS', tag: 'Local Base · Active', color: 'green', url: 'https://acs.tucsonerd.com/', desc: 'Local infrastructure anchored in the Sonoran desert. Bridging the gap between the global Webwork and physical reality, providing architectural support for the Tucson and Oro Valley digital frontier.' },
  { key: 'midnightnerd', name: 'Midnight Nerd', tag: 'Deep Code · Active', color: '#8d105e', url: 'https://www.midnightnerd.com', desc: 'The ultimate secret weapon. Operating in the twilight hours, this represents the deep-code alchemy and meticulous late-night engineering required to keep the ecosystem\'s architecture flawless.' },
  { key: 'forthexp', name: 'Do It for the XP', tag: 'Productivity · Live', color: '#f30b0b', url: 'https://doit.forthexp.com', desc: 'Turn productivity into an adventure worth playing. A gamified progression system and organizational toolset that translates real-world grinds and milestones into tangible, rewarding mechanics.' },
  { key: 'mro-wizard', name: 'My Remarkably Organized Planner Wizard', tag: 'Productivity · Live', color: '#0ea5e9', url: 'https://planner.mycompassconsulting.com', desc: 'The gateway to meticulous organization. A comprehensive digital planning tool and onboarding ecosystem designed to bring structural integrity and automated clarity to daily workflows.' },
  { key: 'glowitheflow', name: 'GlowitheFlow', tag: 'Social · Active Build', color: '#007bff', url: 'https://www.glowitheflow.com', desc: 'A next-gen creator network built on mutual promotion economics. Think Reddit if Reddit actually wanted you to succeed - Flow economy, Tributaries, gamified click-value.' },
  { key: 'compass', name: 'My Compass Consulting', tag: 'Advisory · Live', color: 'rgb(49, 128, 137)', url: 'https://www.mycompassconsulting.com', desc: 'Strategic Synthesis - the rare bridge between executive vision and rigorous engineering. Three pillars: Structural Integrity, Meticulous Performance, Strategic Clarity.' },
  { key: 'bbwg', name: 'BlackBOX WhiteGLOVE', tag: 'Managed Service · Live', color: '#fff', url: 'https://www.blackboxwhiteglove.com', desc: 'Premium concierge digital management - Signature ($249/mo), Concierge, and Enterprise tiers. Your entire digital footprint managed so you can focus on creation.' },
  { key: 'webwork', name: 'Worldwide Webwork', tag: 'Infrastructure · Live', color: 'rgb(61, 238, 152)', url: 'https://www.worldwidewebwork.com', desc: 'The foundational architecture where sovereignty is anchored. Designed for speed, security, and stability, it provides the sovereign infrastructure and stable ground that anchors the entire Hall.' },
  { key: 'youmeos', name: 'YouMeOS', tag: 'Vision · 100-Year Play', color: '#a78bfa', url: 'https://www.youmeos.com', desc: 'A spatial OS for the web - Vue + WebGPU over the Compass Engine. Each install is a Youniverse: HeliOS (command center), NexOS (relational layer), NoOSphere (collective thought).' },
];

const links = [
  { id: 'link-calendar', label: 'Book a Meeting', href: 'https://calendar.app.google/Y732Ak5gxuCMVoHo8', color: '#10b981', icon: resolveComponent('LucideCalendar') },
  { id: 'link-github', label: 'GitHub', href: 'https://github.com/xopherdeep', color: '#e4e4e7', icon: resolveComponent('IconGithub') },
  { id: 'link-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/xophz', color: '#0a66c2', icon: resolveComponent('IconLinkedin') },
  { id: 'link-discord', label: 'Discord', href: 'https://discord.gg/2QDwKKxEqb', color: '#5865f2', icon: resolveComponent('LucideMessageSquare') },
  { id: 'link-twitter', label: 'X / Twitter', href: 'https://twitter.com/xopherdeep', color: '#e4e4e7', icon: resolveComponent('IconTwitter') },
  { id: 'link-cash', label: 'Cash App', href: 'https://cash.app/$xopherdeep', color: '#00D632', icon: resolveComponent('LucideBanknote') },
  { id: 'link-venmo', label: 'Venmo', href: 'https://venmo.com/u/xopherdeep', color: '#008CFF', icon: resolveComponent('LucideBanknote') },
  { id: 'link-email', label: 'Email', href: 'mailto:sayhi@xophz.com', color: '#f59e0b', icon: resolveComponent('LucideMail') },
]

const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  if (reducedMotion.value) return
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

const motionStagger = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { stagger: 100 } }
}
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden">
    <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60" aria-hidden="true" />
    
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_20s_ease-in-out_infinite] w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(139,92,246,0.22)_0%,transparent_70%)] -top-[10%] -left-[15%]" aria-hidden="true" />
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_24s_ease-in-out_infinite_-7s] w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)] bottom-[5%] -right-[10%]" aria-hidden="true" />
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_28s_ease-in-out_infinite_-14s] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(245,158,21,0.12)_0%,transparent_70%)] top-[50%] left-[60%]" aria-hidden="true" />

    <div class="relative z-10 w-full max-w-[540px] pt-[72px] px-4 pb-[80px] flex-1 flex flex-col justify-center">
      <Transition
        enter-active-class="animate-[fadeUp_0.45s_cubic-bezier(0.16,1,0.3,1)_both]"
        leave-active-class="animate-[fadeDown_0.25s_ease_both]"
        mode="out-in"
      >
        <section v-if="activePanel === 'home'" key="home" class="w-full flex flex-col items-center gap-6" aria-label="Home">
          <div class="p-[3px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]">
            <div class="w-[88px] h-[88px] rounded-full bg-bg flex items-center justify-center border-[3px] border-bg">
              <span class="font-display text-[1.75rem] font-bold bg-gradient-hero bg-clip-text text-transparent tracking-[-0.02em]">XP</span>
            </div>
          </div>
          
          <div class="text-center flex flex-col gap-1.5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0 } }">
            <p class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-accent opacity-80">xophz.com</p>
            <h1 class="font-display text-4xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">Xopher Pollard</h1>
            <p class="text-sm font-medium text-accent-2 tracking-[0.02em]">Principal Systems Synthesist</p>
            <p class="mt-2 text-sm leading-[1.65] text-text-secondary max-w-[36ch] mx-auto">25+ years engineering massive-scale software. I build the architectural blueprints enterprises stake their futures on - cloud-first, modular, and built to last.</p>
          </div>
          
          <ul class="flex flex-wrap gap-2 justify-center list-none p-0" aria-label="Skills and roles" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }">
            <li v-for="tag in ['Principal Architect', 'CTO / VP Eng', 'AWS · Node.js · Vue', 'Legacy Modernization', 'Founder', '25+ Years']" :key="tag" class="text-[0.68rem] font-medium tracking-[0.06em] px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-text-secondary whitespace-nowrap transition-all duration-200 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] hover:bg-accent/20 hover:border-accent/50 hover:text-text-primary hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_0_12px_rgba(139,92,246,0.15)]">{{ tag }}</li>
          </ul>
          
          <div class="flex gap-3 w-full justify-center" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 200 } } }">
            <button class="px-7 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-gradient-hero border-none text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.55)]" @click="navigateTo('about')">Who I Am</button>
            <button class="px-7 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-white/15 text-text-secondary backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(139,92,246,0.1)]" @click="navigateTo('connect')">Connect</button>
            <NuxtLink to="/posts" class="px-7 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-white/15 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] text-[#a78bfa] border-accent/25 hover:bg-accent/10 hover:border-accent/40 hover:text-[#c4b5fd] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(139,92,246,0.1)] no-underline">Posts ♣</NuxtLink>
          </div>

          <div v-if="recentPosts && recentPosts.length" class="w-full flex flex-col gap-2.5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 300 } } }">
            <div class="flex items-center justify-between">
              <span class="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-text-muted">RECENT POSTS</span>
              <NuxtLink to="/posts" class="text-[0.72rem] font-semibold text-accent no-underline opacity-80 transition-opacity duration-200 hover:opacity-100">View all →</NuxtLink>
            </div>
            <div class="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.25)]">
              <NuxtLink v-for="post in recentPosts" :key="post.path" :to="post.path" class="flex items-center gap-2.5 px-3.5 py-3 no-underline border-b border-white/5 transition-colors duration-150 cursor-pointer hover:bg-accent/10 group last:border-b-0">
                <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_6px_var(--rp-color)]" :style="{ backgroundColor: postTypeColor(post.type ?? 'article'), '--rp-color': postTypeColor(post.type ?? 'article') }" />
                <span class="flex-1 text-[0.82rem] font-medium text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-text-primary">{{ post.title }}</span>
                <time class="text-[0.68rem] text-text-muted shrink-0">{{ formatShortDate(post.date) }}</time>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section v-else-if="activePanel === 'about'" key="about" class="w-full flex flex-col items-center gap-6" aria-label="Who I Am">
          <h2 class="font-display text-3xl font-bold text-text-primary tracking-[-0.03em] self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">Who I Am</h2>
          <p class="text-sm leading-[1.7] text-text-secondary self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: 50 } } }">I'm Xopher - a systems thinker, builder, and architect who has spent 25+ years at the intersection of technology and business impact.</p>
          
          <div class="w-full bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl p-5 shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(139,92,246,0.06)]" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }">
            <p class="text-sm leading-[1.75] text-text-secondary">I've led engineering at Series A through Fortune 500. I've been a co-founder, a solo contributor, a CTO, and everything in between. My superpower is seeing the entire system - code, team, process, and market - as one coherent machine that needs to be tuned.</p>
          </div>
          
          <div class="self-start text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mt-2" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 150 } } }">SKILLS &amp; STACK</div>
          <div class="w-full grid grid-cols-2 gap-3" v-motion="motionStagger">
            <div v-for="(group, idx) in skills" :key="group.group" class="p-4 w-full bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/10">
              <p class="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent mb-2.5">{{ group.group }}</p>
              <ul class="list-none p-0 flex flex-col gap-1.5">
                <li v-for="skill in group.items" :key="skill" class="text-[0.8rem] text-text-secondary flex items-center gap-1.5 before:content-[''] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-accent-2 before:shrink-0">{{ skill }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section v-else-if="activePanel === 'whatido'" key="whatido" class="w-full flex flex-col items-center gap-6" aria-label="What I Do">
          <h2 class="font-display text-3xl font-bold text-text-primary tracking-[-0.03em] self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">What I Do</h2>
          <p class="text-sm leading-[1.7] text-text-secondary self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: 50 } } }">I solve the hard problems - the ones that keep CTOs up at night and boards questioning their technology bets.</p>
          
          <div class="w-full flex flex-col gap-2.5" v-motion="motionStagger">
            <div v-for="(item, index) in whatIDo" :key="item.key" class="p-0 overflow-hidden w-full bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-200" :class="{ 'border-accent/30 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.1),0_8px_32px_rgba(0,0,0,0.35)]': openAccordion === item.key }">
              <button class="w-full flex items-center gap-3.5 px-5 py-4 bg-transparent border-none text-text-primary cursor-pointer text-left" :aria-expanded="openAccordion === item.key" @click="toggleAccordion(item.key)">
                <span class="text-[1.2rem] shrink-0 text-accent-2 flex items-center justify-center"><component :is="item.icon" class="w-5 h-5" /></span>
                <span class="flex-1 text-[0.95rem] font-semibold">{{ item.title }}</span>
                <span class="text-[1.2rem] text-text-muted transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] inline-block" :class="{ 'rotate-90 text-accent': openAccordion === item.key }">›</span>
              </button>
              <Transition enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden max-h-[200px]" enter-from-class="max-h-0 opacity-0" leave-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden max-h-[200px]" leave-to-class="max-h-0 opacity-0">
                <p v-if="openAccordion === item.key" class="px-5 pb-4 text-[0.85rem] leading-[1.7] text-text-secondary">{{ item.desc }}</p>
              </Transition>
            </div>
          </div>
        </section>

        <section v-else-if="activePanel === 'projects'" key="projects" class="w-full flex flex-col items-center gap-6" aria-label="Projects">
          <h2 class="font-display text-3xl font-bold text-text-primary tracking-[-0.03em] self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">Magnum Opus</h2>
          <p class="text-sm leading-[1.7] text-text-secondary self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: 50 } } }">The Hall of the Gods ecosystem - infrastructure, services, and visions I'm building.</p>
          
          <div class="w-full flex flex-col gap-3" v-motion="motionStagger">
            <div v-for="project in projects" :key="project.key" class="relative overflow-hidden w-full bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl p-5 shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/10 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-[0_2px_2px_0]" :style="{ '--proj-color': project.color, boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' }">
              <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm shadow-[0_0_12px_var(--proj-color)]" :style="{ backgroundColor: project.color }" />
              <div class="flex items-center gap-2 mb-1.5">
                <div class="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_var(--proj-color)]" :style="{ backgroundColor: project.color }" />
                <span class="text-[0.6rem] font-bold tracking-[0.12em] uppercase" :style="{ color: project.color }">{{ project.tag }}</span>
                <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="ml-auto text-[0.6rem] font-bold tracking-[0.08em] uppercase no-underline opacity-70 transition-opacity duration-200 shrink-0 hover:opacity-100" :style="{ color: project.color }">Visit ↗</a>
              </div>
              <p class="font-display text-[1.1rem] font-bold text-text-primary mb-1.5">{{ project.name }}</p>
              <p class="text-[0.82rem] leading-[1.65] text-text-secondary">{{ project.desc }}</p>
            </div>
          </div>
        </section>

        <section v-else-if="activePanel === 'connect'" key="connect" class="w-full flex flex-col items-center gap-6" aria-label="Connect">
          <h2 class="font-display text-3xl font-bold text-text-primary tracking-[-0.03em] self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">Connect</h2>
          <p class="text-sm leading-[1.7] text-text-secondary self-start" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: 50 } } }">Find me where the builders hang out.</p>
          
          <nav class="w-full flex flex-col gap-2.5" aria-label="Social links" v-motion="motionStagger">
            <a v-for="link in links" :id="link.id" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-text-primary no-underline transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:translate-x-1 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.35),-4px_0_16px_-2px_var(--link-color)]" :style="{ '--link-color': link.color, borderColor: 'hover:var(--link-color)' }">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,var(--link-color),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]" />
              <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[color:var(--link-color)]">
                <component :is="link.icon" class="w-full h-full" />
              </span>
              <span class="flex-1 text-[0.9rem] font-medium">{{ link.label }}</span>
              <LucideArrowUpRight class="w-4 h-4 text-text-muted shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary" />
            </a>
          </nav>
        </section>
      </Transition>
    </div>
  </main>
</template>

<style>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeDown {
  to { opacity: 0; transform: translateY(-10px); }
}
@keyframes spinGlow {
  0% { filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5)); }
  50% { filter: hue-rotate(30deg) drop-shadow(0 0 14px rgba(6, 182, 212, 0.5)); }
  100% { filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5)); }
}
@keyframes driftOrb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.06); }
  66% { transform: translate(-20px, 15px) scale(0.96); }
}
</style>

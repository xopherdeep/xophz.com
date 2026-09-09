<script setup lang="ts">
import {
  Compass as LucideCompass,
  Search as LucideSearch,
  ArrowUpRight as LucideArrowUpRight,
  Zap as LucideZap,
  Building2 as LucideBuilding2,
  Calendar as LucideCalendar,
  Layers as LucideLayers,
  Code as LucideCode,
  Sparkles as LucideSparkles,
  Flame as LucideFlame,
  BookOpen as LucideBookOpen,
  Target as LucideTarget,
  Magnet as LucideMagnet,
  Wand2 as LucideWand2,
  Bug as LucideBug,
  Shield as LucideShield,
  Link as LucideLink,
  RefreshCw as LucideRefreshCw,
  Key as LucideKey,
  Moon as LucideMoon,
  Flag as LucideFlag,
  ShoppingBag as LucideShoppingBag,
  Gauge as LucideGauge,
  Activity as LucideActivity,
  CheckCircle2 as LucideCheckCircle2,
  Download as LucideDownload
} from '@lucide/vue'
import type { CompassPlugin } from '../composables/useCompassPlugins'

const route = useRoute()
const router = useRouter()

const {
  plugins,
  categories,
  loadPurchasedPlugins,
  markAsPurchased,
  isPurchased
} = useCompassPlugins()

const { fetchLatestRelease, triggerDownload } = useGitHubReleases()

useSeoMeta({
  title: 'My Compass Suite · Xophz & My Compass Consulting',
  description: 'The Xophz-COMPASS plugin architecture & software suite. 40+ sovereign WordPress extensions, enterprise systems architecture, and legacy modernization.',
})

const activeCategory = ref('All')
const searchQuery = ref('')
const failedLogos = ref<Record<string, boolean>>({})
const downloadingKeys = ref<Record<string, boolean>>({})
const highlightedPluginKey = ref<string | null>(null)
const purchasedSuccessMessage = ref<string | null>(null)

const onLogoError = (pluginKey: string) => {
  failedLogos.value[pluginKey] = true
}

const iconMap: Record<string, any> = {
  compass: LucideCompass,
  sparkles: LucideSparkles,
  flame: LucideFlame,
  book: LucideBookOpen,
  target: LucideTarget,
  magnet: LucideMagnet,
  wand: LucideWand2,
  bug: LucideBug,
  shield: LucideShield,
  link: LucideLink,
  refresh: LucideRefreshCw,
  key: LucideKey,
  zap: LucideZap,
  castle: LucideBuilding2,
  layers: LucideLayers,
  code: LucideCode,
  waves: LucideActivity,
  flag: LucideFlag,
  bag: LucideShoppingBag,
  gauge: LucideGauge,
  moon: LucideMoon,
}

const getIcon = (iconName: string) => iconMap[iconName] || LucideCompass

const filteredPlugins = computed(() => {
  return plugins.value.filter(plugin => {
    const matchesCategory = activeCategory.value === 'All' || plugin.category === activeCategory.value
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !query ||
      plugin.name.toLowerCase().includes(query) ||
      plugin.codename.toLowerCase().includes(query) ||
      plugin.desc.toLowerCase().includes(query) ||
      (plugin.marketEqv && plugin.marketEqv.toLowerCase().includes(query))
    return matchesCategory && matchesSearch
  })
})

const getCheckoutUrl = (plugin: CompassPlugin) => {
  const returnUrl = `https://xophz.com/compass?purchased=${plugin.githubRepo}`
  return `https://www.mycompassconsulting.com/buy/${plugin.githubRepo}?return_url=${encodeURIComponent(returnUrl)}`
}

const onDownloadPlugin = async (plugin: CompassPlugin) => {
  downloadingKeys.value[plugin.key] = true
  try {
    const release = await fetchLatestRelease(plugin.githubRepo, plugin.version)
    triggerDownload(release.zipUrl, release.zipName)
  } finally {
    downloadingKeys.value[plugin.key] = false
  }
}

onMounted(async () => {
  loadPurchasedPlugins()

  const purchasedQuery = route.query.purchased as string | undefined
  if (purchasedQuery) {
    const matched = markAsPurchased(purchasedQuery)
    if (matched) {
      highlightedPluginKey.value = matched.key
      purchasedSuccessMessage.value = `Thank you for purchasing ${matched.name}! Your plugin package is downloading automatically.`

      try {
        const release = await fetchLatestRelease(matched.githubRepo, matched.version)
        triggerDownload(release.zipUrl, release.zipName)
      } catch {
        // Handled inside composable
      }

      nextTick(() => {
        const cardElement = document.getElementById(`plugin-${matched.key}`)
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })

      router.replace({ query: { ...route.query, purchased: undefined } })
    }
  }
})

const consultingFeatures = [
  {
    title: 'Legacy Modernization',
    icon: LucideZap,
    desc: 'Transform monolithic systems into clean, decoupled micro-services and modern Vue/Nuxt frontends without downtime.',
    color: '#06b6d4'
  },
  {
    title: 'Custom Plugin Architecture',
    icon: LucideLayers,
    desc: 'Bespoke WordPress & Vue plugin suites built on the Xophz-COMPASS atomic design pattern and spatial OS mechanics.',
    color: '#8b5cf6'
  },
  {
    title: 'Systems & Cloud Advisory',
    icon: LucideBuilding2,
    desc: '25+ years of distributed systems engineering, AWS cloud optimization, and CTO-level technical leadership.',
    color: '#f59e0b'
  }
]
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[1100px] px-4 pt-[80px] pb-[100px] flex flex-col gap-10">

      <!-- Post-Purchase Success Alert Banner -->
      <div
        v-if="purchasedSuccessMessage"
        class="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-3 shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-xl"
        v-motion="{ initial: { opacity: 0, y: -10 }, enter: { opacity: 1, y: 0 } }"
      >
        <div class="flex items-center gap-2.5">
          <LucideCheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
          <span class="font-medium">{{ purchasedSuccessMessage }}</span>
        </div>
        <button
          type="button"
          class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[0.65rem] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          @click="purchasedSuccessMessage = null"
        >
          Dismiss
        </button>
      </div>

      <!-- Hero Banner -->
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a]/80 via-[#0c0618]/90 to-[#180e29]/80 border border-white/10 p-6 md:p-10 backdrop-blur-2xl shadow-glass-shadow"
        v-motion="{ initial: { opacity: 0, y: -20 }, enter: { opacity: 1, y: 0 } }"
      >
        <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-[90px] pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-2/20 blur-[90px] pointer-events-none" />

        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="max-w-[680px]">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[0.68rem] font-bold tracking-[0.14em] uppercase">
                <LucideCompass class="w-3.5 h-3.5" />
                The Software Suite & Advisory
              </span>
              <span class="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-text-muted">40+ Sovereign Extensions</span>
            </div>

            <h1 class="font-display text-3xl md:text-5xl font-bold text-text-primary tracking-[-0.03em] leading-[1.1]">
              My Compass Software Suite
            </h1>

            <p class="text-sm md:text-base leading-[1.7] text-text-secondary mt-3">
              The bridge connecting <span class="text-text-primary font-semibold">Xophz</span>, <span class="text-accent-2 font-semibold">My Compass Consulting</span>, and our sovereign plugin architecture. Modular software extensions designed for maximum performance, spatial elegance, and structural integrity.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded-xl bg-accent text-white font-semibold text-xs tracking-[0.06em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-accent/90 transition-all no-underline"
            >
              <LucideCalendar class="w-4 h-4" /> Book Consultation
            </a>
            <a
              href="https://www.mycompassconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary font-semibold text-xs tracking-[0.06em] uppercase flex items-center justify-center gap-2 hover:bg-white/10 transition-all no-underline"
            >
              My Compass Consulting <LucideArrowUpRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }">
        <div
          v-for="service in consultingFeatures"
          :key="service.title"
          class="p-5 rounded-2xl bg-white/5 border border-white/[0.08] backdrop-blur-xl flex flex-col gap-2.5 shadow-glass-shadow transition-all hover:bg-white/8 hover:border-white/20"
        >
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" :style="{ backgroundColor: service.color + '20', color: service.color }">
            <component :is="service.icon" class="w-5 h-5" />
          </div>
          <h2 class="font-display text-base font-bold text-text-primary">{{ service.title }}</h2>
          <p class="text-xs leading-[1.65] text-text-secondary">{{ service.desc }}</p>
        </div>
      </div>

      <!-- Section Title & Filter Controls -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-white/10">
        <div>
          <h2 class="font-display text-xl font-bold text-text-primary flex items-center gap-2">
            <LucideCode class="w-5 h-5 text-accent" /> Plugin Catalog
          </h2>
          <p class="text-xs text-text-muted mt-0.5">Official Xophz-COMPASS plugins with uncontained side-bleeding logo graphic artwork.</p>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
          <LucideSearch class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search plugins, keywords, replacements..."
            class="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap gap-1.5" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1 } }">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.04em] border cursor-pointer transition-all duration-200 backdrop-blur-md"
          :class="activeCategory === cat
            ? 'bg-accent/20 border-accent/50 text-text-primary shadow-[0_0_12px_rgba(139,92,246,0.2)]'
            : 'bg-white/5 border-white/[0.06] text-text-muted hover:bg-white/10 hover:border-white/20 hover:text-text-secondary'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Plugin Count indicator -->
      <p class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-text-muted -mt-4">
        Showing {{ filteredPlugins.length }} plugin{{ filteredPlugins.length === 1 ? '' : 's' }}
      </p>

      <!-- Plugin Grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
        enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div
          v-for="plugin in filteredPlugins"
          :id="'plugin-' + plugin.key"
          :key="plugin.key"
          class="group relative overflow-hidden bg-[#132035]/85 border rounded-2xl backdrop-blur-xl p-4 md:p-5 shadow-glass-shadow transition-all duration-300 hover:border-[color:var(--plug-color)]/60 hover:bg-[#182945]/95 flex items-center justify-between gap-3 min-h-[155px]"
          :class="highlightedPluginKey === plugin.key
            ? 'border-accent ring-2 ring-accent/60 shadow-[0_0_30px_rgba(139,92,246,0.4)]'
            : 'border-white/10'"
          :style="{ '--plug-color': plugin.color }"
        >
          <!-- Official Live Plugin Logo Image directly bleeding off the left edge without wrapper circle -->
          <img
            v-if="!failedLogos[plugin.key]"
            :src="plugin.logoUrl"
            :alt="plugin.name"
            class="shrink-0 -ml-10 md:-ml-12 w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            @error="onLogoError(plugin.key)"
          />

          <!-- Fallback Container ONLY used if the image fails to load -->
          <div
            v-else
            class="relative shrink-0 -ml-10 md:-ml-12 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center p-3 shadow-2xl transition-transform duration-300 group-hover:scale-105"
            :style="{ background: plugin.gradient }"
          >
            <component
              :is="getIcon(plugin.iconName)"
              class="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] relative z-10"
            />
          </div>

          <!-- Middle Details Column (Title, Description, Category, Price & Market Eqv) -->
          <div class="flex-1 flex flex-col justify-between py-1 min-w-0 z-10 pl-1">
            <div>
              <div class="flex items-center gap-1.5 flex-wrap mb-1">
                <span class="px-2 py-0.5 rounded-full text-[0.6rem] font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-accent">
                  {{ plugin.category }}
                </span>
                <span v-if="plugin.group" class="px-1.5 py-0.5 rounded text-[0.58rem] font-mono font-semibold bg-white/5 text-text-muted">
                  {{ plugin.group }}
                </span>
                <span class="px-2 py-0.5 rounded bg-accent/15 border border-accent/30 text-text-primary font-mono font-bold text-[0.65rem]">
                  {{ plugin.price }}
                </span>
              </div>

              <h3 class="font-display text-lg md:text-xl font-bold text-text-primary group-hover:text-accent transition-colors leading-snug tracking-[-0.01em]">
                {{ plugin.name }}
              </h3>

              <p class="text-[0.78rem] leading-[1.5] text-text-secondary mt-1 line-clamp-2">
                {{ plugin.desc }}
              </p>
            </div>

            <!-- Version & Publisher Footer -->
            <div class="flex flex-wrap items-center gap-1.5 mt-3 text-[0.65rem] font-mono text-text-muted">
              <span class="font-bold text-text-primary">{{ plugin.version || 'v26.9.5' }}</span>
              <span>·</span>
              <span v-if="plugin.marketEqv" class="text-text-secondary">Eqv: {{ plugin.marketEqv }}</span>
              <span v-if="plugin.marketEqv">·</span>
              <span>Hall of the Gods, Inc.</span>
            </div>
          </div>

          <!-- Right Action Controls (Buy/Download Button + GO, SYNC, ON) -->
          <div class="flex flex-col items-end gap-2 shrink-0 z-10 pl-2 border-l border-white/10 min-w-[95px]">
            <!-- Dynamic Download / Buy Action Button -->
            <button
              v-if="isPurchased(plugin)"
              type="button"
              class="w-full px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[0.62rem] uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer"
              :disabled="downloadingKeys[plugin.key]"
              @click="onDownloadPlugin(plugin)"
            >
              <LucideDownload class="w-3 h-3" :class="{ 'animate-bounce': downloadingKeys[plugin.key] }" />
              <span>{{ downloadingKeys[plugin.key] ? 'Loading' : 'Download' }}</span>
            </button>

            <a
              v-else
              :href="getCheckoutUrl(plugin)"
              class="w-full px-2.5 py-1.5 rounded-lg bg-accent text-white font-bold text-[0.62rem] uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-accent/90 transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)] no-underline text-center"
            >
              <LucideShoppingBag class="w-3 h-3" />
              <span>Get</span>
            </a>

            <!-- Admin Controls (GO, SYNC, ON) -->
            <div class="flex items-center gap-1">
              <a
                :href="plugin.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2 py-0.5 rounded bg-black/40 border border-white/15 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-text-primary hover:bg-accent/30 hover:border-accent/50 transition-all flex items-center gap-0.5 no-underline"
                title="View GitHub Repository"
              >
                GO <LucideArrowUpRight class="w-2.5 h-2.5 text-accent" />
              </a>

              <a
                :href="plugin.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2 py-0.5 rounded bg-black/40 border border-white/15 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-text-secondary hover:bg-white/20 transition-all flex items-center gap-0.5 no-underline"
                title="Sync from Repository"
              >
                SYNC <LucideRefreshCw class="w-2.5 h-2.5" />
              </a>

              <span class="px-2 py-0.5 rounded bg-emerald-500/25 border border-emerald-500/50 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-emerald-300 flex items-center gap-0.5">
                ON <LucideCheckCircle2 class="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

        </div>
      </TransitionGroup>

    </div>
  </main>
</template>

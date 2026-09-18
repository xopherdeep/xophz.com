<script setup lang="ts">
import {
  Compass as LucideCompass,
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
  Building2 as LucideBuilding2,
  Layers as LucideLayers,
  Zap as LucideZap,
  ArrowUpRight as LucideArrowUpRight,
  Download as LucideDownload
} from '@lucide/vue'
import type { CompassPlugin } from '~/composables/useCompassPlugins'
import { useContextualSearch } from '~/composables/useContextualSearch'

const props = defineProps<{
  plugins: CompassPlugin[]
  categories: string[]
  highlightedPluginKey: string | null
  downloadingKeys: Record<string, boolean>
}>()

const emit = defineEmits<{
  openModal: [plugin: CompassPlugin]
  download: [plugin: CompassPlugin]
}>()

const activeCategory = ref('All')
const searchQuery = ref('')
const failedLogos = ref<Record<string, boolean>>({})

const onLogoError = (pluginKey: string) => {
  failedLogos.value[pluginKey] = true
}

const pluginSearchItems = computed(() =>
  props.plugins.map((plugin) => ({
    id: `plugin-${plugin.key}`,
    title: plugin.name,
    subtitle: plugin.desc,
    category: 'compass' as const,
    categoryLabel: 'Plugin',
    icon: 'i-lucide-box',
    logoUrl: plugin.logoUrl,
    iconColor: plugin.color || '#62c9ff',
    badge: plugin.category,
    route: `/my-compass?plugin=${plugin.key}`,
    action: () => emit('openModal', plugin),
    keywords: [plugin.key, plugin.name, plugin.codename, plugin.category]
  }))
)

useContextualSearch({
  placeholder: 'Search 40+ plugins, replacements...',
  query: searchQuery,
  categoryLabel: 'Plugins',
  items: pluginSearchItems
})

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
  return props.plugins.filter(plugin => {
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
</script>

<template>
  <section class="flex flex-col gap-6">
    <!-- Section Title & Search Consolidation -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]">
      <div>
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <UIcon name="i-lucide-code" class="w-5 h-5 text-violet-500" />
          Plugin Catalog
        </h2>
      </div>
      <div v-if="searchQuery" class="flex items-center gap-2">
        <span class="text-xs text-zinc-500">
          Filtered by "<span class="text-violet-600 dark:text-cyan-400 font-semibold">{{ searchQuery }}</span>"
        </span>
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-x"
          @click="searchQuery = ''"
        >
          Clear
        </UButton>
      </div>
    </div>

    <!-- Category Filter Pills -->
    <div class="flex flex-wrap gap-1.5">
      <UButton
        v-for="cat in categories"
        :key="cat"
        :variant="activeCategory === cat ? 'solid' : 'ghost'"
        :color="activeCategory === cat ? 'primary' : 'neutral'"
        size="xs"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </UButton>
    </div>

    <!-- Count -->
    <p class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-500 -mt-4">
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
        class="xo-shine-on-hover group relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border backdrop-blur-xl p-4 md:p-5 transition-all duration-300 hover:border-[color:var(--plug-color)]/40 dark:hover:border-[color:var(--plug-color)]/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 min-h-[160px] cursor-pointer"
        :class="highlightedPluginKey === plugin.key
          ? 'border-violet-500 ring-2 ring-violet-500/60 shadow-glow-violet'
          : 'border-zinc-200/80 dark:border-white/[0.06]'"
        :style="{ '--plug-color': plugin.color }"
        @click="emit('openModal', plugin)"
      >
        <!-- Logo Image -->
        <img
          v-if="!failedLogos[plugin.key]"
          :src="plugin.logoUrl"
          :alt="plugin.name"
          class="shrink-0 -ml-10 md:-ml-12 w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
          @error="onLogoError(plugin.key)"
        />

        <!-- Fallback Icon -->
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

        <!-- Details Column -->
        <div class="flex-1 flex flex-col justify-between py-1 min-w-0 z-10 pl-1">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap mb-1">
              <UBadge color="primary" variant="subtle" size="xs">
                {{ plugin.category }}
              </UBadge>
              <span
                v-if="plugin.group"
                class="px-1.5 py-0.5 rounded text-[0.58rem] font-mono font-semibold bg-zinc-100 dark:bg-white/[0.05] text-zinc-500 dark:text-zinc-400"
              >
                {{ plugin.group }}
              </span>
              <UBadge
                v-if="plugin.saasOffer?.badge || plugin.showcaseUrl"
                color="success"
                variant="subtle"
                size="xs"
                class="font-mono"
              >
                {{ plugin.saasOffer?.badge || 'Live App' }}
              </UBadge>
              <UBadge color="primary" variant="outline" size="xs" class="font-mono">
                {{ plugin.price.startsWith('$') ? plugin.price : '$' + plugin.price }}
              </UBadge>
            </div>

            <h3 class="font-display text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug tracking-tight">
              {{ plugin.name }}
            </h3>

            <p class="text-[0.78rem] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
              {{ plugin.desc }}
            </p>
          </div>

          <!-- Bottom Bar -->
          <div class="flex flex-wrap items-center justify-between gap-2.5 mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/[0.04]">
            <div class="flex flex-wrap items-center gap-1.5 text-[0.65rem] font-mono text-zinc-400 dark:text-zinc-500">
              <span class="font-bold text-zinc-700 dark:text-zinc-300">{{ plugin.version || 'v26.9.6' }}</span>
              <span>·</span>
              <span v-if="plugin.marketEqv" class="text-zinc-500 dark:text-zinc-400">Eqv: {{ plugin.marketEqv }}</span>
              <span v-if="plugin.marketEqv">·</span>
              <span>Hall of the Gods, Inc.</span>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              <UButton
                v-if="plugin.showcaseUrl"
                :to="plugin.showcaseUrl"
                target="_blank"
                color="neutral"
                variant="outline"
                size="xs"
                trailing-icon="i-lucide-external-link"
                @click.stop
              >
                {{ plugin.showcaseLabel || 'Live App' }}
              </UButton>
              <UButton
                color="primary"
                variant="soft"
                size="xs"
                trailing-icon="i-lucide-arrow-up-right"
                @click.stop="emit('openModal', plugin)"
              >
                More Details
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty State -->
    <div v-if="filteredPlugins.length === 0" class="text-center py-16">
      <UIcon name="i-lucide-search-x" class="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
      <p class="text-sm text-zinc-500 dark:text-zinc-400">No plugins match this filter.</p>
    </div>
  </section>
</template>

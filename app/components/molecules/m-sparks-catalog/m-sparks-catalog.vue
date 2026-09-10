<script setup lang="ts">
import {
  Sparkles as LucideSparkles,
  Layers as LucideLayers,
  Terminal as LucideTerminal,
  Calculator as LucideCalculator,
  Clock as LucideClock,
  Activity as LucideActivity,
  Bomb as LucideBomb,
  Compass as LucideCompass,
  ArrowUpRight as LucideArrowUpRight,
  Zap as LucideZap
} from '@lucide/vue'
import type { Spark } from '~/composables/useSparks'
import { useContextualSearch } from '~/composables/useContextualSearch'

const props = defineProps<{
  sparks: Spark[]
  categories: string[]
  highlightedSparkKey?: string | null
}>()

const emit = defineEmits<{
  openModal: [spark: Spark]
}>()

const activeCategory = ref('All')
const searchQuery = ref('')
const failedLogos = ref<Record<string, boolean>>({})

const onLogoError = (sparkKey: string) => {
  failedLogos.value[sparkKey] = true
}

const sparkSearchItems = computed(() =>
  props.sparks.map((spark) => ({
    id: `spark-${spark.key}`,
    title: spark.name,
    subtitle: spark.desc,
    category: 'sparks' as const,
    categoryLabel: 'Spark',
    icon: 'i-lucide-sparkles',
    logoUrl: spark.logoUrl,
    iconColor: spark.color || '#06b6d4',
    badge: spark.category,
    route: `/sparks?spark=${spark.key}`,
    action: () => emit('openModal', spark),
    keywords: [spark.key, spark.name, spark.codename, spark.category, spark.tag || '']
  }))
)

useContextualSearch({
  placeholder: 'Search 50+ sparks, tools, games...',
  query: searchQuery,
  categoryLabel: 'Sparks',
  items: sparkSearchItems
})

const iconMap: Record<string, any> = {
  sparkles: LucideSparkles,
  layers: LucideLayers,
  terminal: LucideTerminal,
  calculator: LucideCalculator,
  clock: LucideClock,
  activity: LucideActivity,
  bomb: LucideBomb,
  compass: LucideCompass,
  zap: LucideZap,
}

const getIcon = (iconName: string) => iconMap[iconName] || LucideSparkles

const filteredSparks = computed(() => {
  return props.sparks.filter((spark) => {
    const isCategoryMatch = activeCategory.value === 'All' || spark.category === activeCategory.value
    const query = searchQuery.value.toLowerCase().trim()
    const isSearchMatch = !query ||
      spark.name.toLowerCase().includes(query) ||
      spark.codename.toLowerCase().includes(query) ||
      spark.desc.toLowerCase().includes(query) ||
      (spark.tag && spark.tag.toLowerCase().includes(query))
    return isCategoryMatch && isSearchMatch
  })
})
</script>

<template>
  <section class="flex flex-col gap-6">
    <!-- Section Title & Search Consolidation -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]"
    >
      <div>
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <UIcon
            name="i-lucide-grid-3x3"
            class="w-5 h-5 text-cyan-500"
          />
          Spark Plugs Catalog
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
      Showing {{ filteredSparks.length }} spark{{ filteredSparks.length === 1 ? '' : 's' }}
    </p>

    <!-- Sparks Grid -->
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
        v-for="spark in filteredSparks"
        :id="'spark-' + spark.key"
        :key="spark.key"
        class="xo-shine-on-hover group relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border backdrop-blur-xl p-4 md:p-5 transition-all duration-300 hover:border-[color:var(--spark-color)]/50 hover:shadow-[0_8px_32px_color-mix(in_srgb,var(--spark-color)_25%,transparent)] flex items-center justify-between gap-3 min-h-[160px] cursor-pointer"
        :class="highlightedSparkKey === spark.key
          ? 'border-cyan-500 ring-2 ring-cyan-500/60 shadow-glow-violet'
          : 'border-zinc-200/80 dark:border-white/[0.06]'"
        :style="{ '--spark-color': spark.color }"
        @click="emit('openModal', spark)"
      >
        <!-- Logo Image with Glowing Brand Color Aura -->
        <img
          v-if="!failedLogos[spark.key]"
          :src="spark.logoUrl"
          :alt="spark.name"
          class="shrink-0 -ml-10 md:-ml-12 w-32 h-32 md:w-40 md:h-40 object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 pointer-events-none"
          :style="{ filter: `drop-shadow(0 0 14px ${spark.color}) drop-shadow(0 0 28px color-mix(in srgb, ${spark.color} 45%, transparent))` }"
          @error="onLogoError(spark.key)"
        />

        <!-- Fallback Icon -->
        <div
          v-else
          class="relative shrink-0 -ml-10 md:-ml-12 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center p-3 shadow-2xl transition-transform duration-300 group-hover:scale-105"
          :style="{ background: spark.gradient }"
        >
          <component
            :is="getIcon(spark.iconName)"
            class="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] relative z-10"
          />
        </div>

        <!-- Details Column -->
        <div class="flex-1 flex flex-col justify-between py-1 min-w-0 z-10 pl-1">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap mb-1">
              <UBadge
                color="primary"
                variant="subtle"
                size="xs"
              >
                {{ spark.category }}
              </UBadge>
              <span
                v-if="spark.group"
                class="px-1.5 py-0.5 rounded text-[0.58rem] font-mono font-semibold bg-zinc-100 dark:bg-white/[0.05] text-zinc-500 dark:text-zinc-400"
              >
                {{ spark.group }}
              </span>
              <UBadge
                color="primary"
                variant="outline"
                size="xs"
                class="font-mono"
              >
                PWA Ready
              </UBadge>
            </div>

            <h3
              class="font-display text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[color:var(--spark-color)] transition-colors leading-snug tracking-tight"
            >
              {{ spark.name }}
            </h3>

            <p class="text-[0.78rem] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
              {{ spark.desc }}
            </p>
          </div>

          <!-- Bottom Bar -->
          <div
            class="flex flex-wrap items-center justify-between gap-2.5 mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/[0.04]"
          >
            <div class="flex flex-wrap items-center gap-1.5 text-[0.65rem] font-mono text-zinc-400 dark:text-zinc-500">
              <span class="font-bold text-zinc-700 dark:text-zinc-300">{{ spark.version || 'v2.4.0' }}</span>
              <span>·</span>
              <span class="text-zinc-500 dark:text-zinc-400">{{ spark.engine || 'Vue 3' }}</span>
              <span>·</span>
              <span>YouMeOS</span>
            </div>

            <div class="flex items-center gap-1.5">
              <UButton
                :to="spark.pwaUrl"
                target="_blank"
                color="primary"
                variant="solid"
                size="xs"
                trailing-icon="i-lucide-arrow-up-right"
                @click.stop
              >
                Open PWA
              </UButton>

              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                @click.stop="emit('openModal', spark)"
              >
                Details
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty State -->
    <div
      v-if="filteredSparks.length === 0"
      class="text-center py-16"
    >
      <UIcon
        name="i-lucide-search-x"
        class="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4"
      />
      <p class="text-sm text-zinc-500 dark:text-zinc-400">No sparks match this filter.</p>
    </div>
  </section>
</template>

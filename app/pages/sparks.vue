<script setup lang="ts">
import {
  Sparkles as LucideSparkles,
  Search as LucideSearch,
  ArrowUpRight as LucideArrowUpRight,
  ExternalLink as LucideExternalLink,
  Zap as LucideZap,
  Grid as LucideGrid,
  Play as LucidePlay,
} from '@lucide/vue'

const { sparks, categories } = useSparks()

useSeoMeta({
  title: 'YouMeOS Sparks · Spatial OS Widgets & Apps',
  description: 'Explore the 50+ spatial OS widgets, system applications, retro arcade games, and creative tools powering YouMeOS.',
})

const activeCategory = ref('All')
const searchQuery = ref('')

const filteredSparks = computed(() => {
  return sparks.value.filter(spark => {
    const matchesCategory = activeCategory.value === 'All' || spark.category === activeCategory.value
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !query ||
      spark.name.toLowerCase().includes(query) ||
      spark.desc.toLowerCase().includes(query) ||
      spark.tag.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[1100px] px-4 pt-[80px] pb-[100px] flex flex-col gap-10">

      <!-- Hero Banner -->
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0618]/90 via-[#0a1526]/85 to-[#160c28]/90 border border-white/10 p-6 md:p-10 backdrop-blur-2xl shadow-glass-shadow"
        v-motion="{ initial: { opacity: 0, y: -20 }, enter: { opacity: 1, y: 0 } }"
      >
        <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-2/25 blur-[90px] pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/25 blur-[90px] pointer-events-none" />

        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="max-w-[680px]">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-2/15 border border-accent-2/30 text-accent-2 text-[0.68rem] font-bold tracking-[0.14em] uppercase">
                <LucideSparkles class="w-3.5 h-3.5" />
                Spatial OS Ecosystem
              </span>
              <span class="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-text-muted">50+ YouMeOS Sparks</span>
            </div>

            <h1 class="font-display text-3xl md:text-5xl font-bold text-text-primary tracking-[-0.03em] leading-[1.1]">
              YouMeOS Sparks Catalog
            </h1>

            <p class="text-sm md:text-base leading-[1.7] text-text-secondary mt-3">
              Sparks are the modular, spatial micro-applications and interactive widgets powering <span class="text-text-primary font-semibold">YouMeOS</span>. From WebGPU 3D viewable viewports and CLI matrix terminals to retro synth audio players and productivity tools.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://www.youmeos.com"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 text-white font-semibold text-xs tracking-[0.06em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:opacity-95 transition-all no-underline"
            >
              <LucidePlay class="w-4 h-4 fill-current" /> Launch YouMeOS
            </a>
          </div>
        </div>
      </div>

      <!-- Filter Controls Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-white/10">
        <div>
          <h2 class="font-display text-xl font-bold text-text-primary flex items-center gap-2">
            <LucideGrid class="w-5 h-5 text-accent-2" /> Spatial App Directory
          </h2>
          <p class="text-xs text-text-muted mt-0.5">Filter spatial applications by category or search by keyword.</p>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
          <LucideSearch class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Sparks..."
            class="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-2/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap gap-1.5" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1 } }">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.04em] border cursor-pointer transition-all duration-200 backdrop-blur-md"
          :class="activeCategory === cat
            ? 'bg-accent-2/20 border-accent-2/50 text-text-primary shadow-[0_0_12px_rgba(6,182,212,0.2)]'
            : 'bg-white/5 border-white/[0.06] text-text-muted hover:bg-white/10 hover:border-white/20 hover:text-text-secondary'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Spark Count indicator -->
      <p class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-text-muted -mt-4">
        Showing {{ filteredSparks.length }} Spark{{ filteredSparks.length === 1 ? '' : 's' }}
      </p>

      <!-- Sparks Grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div
          v-for="spark in filteredSparks"
          :key="spark.key"
          class="group relative overflow-hidden bg-white/5 border border-white/[0.08] rounded-2xl backdrop-blur-xl p-5 shadow-glass-shadow transition-all duration-300 hover:border-[color:var(--spark-color)]/40 hover:bg-white/8 flex flex-col justify-between"
          :style="{ '--spark-color': spark.color }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm shadow-[0_0_12px_var(--spark-color)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_var(--spark-color)]" :style="{ backgroundColor: spark.color }" />

          <div>
            <div class="flex items-center gap-2 mb-2 pl-2.5">
              <div class="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_var(--spark-color)]" :style="{ backgroundColor: spark.color }" />
              <span class="text-[0.6rem] font-bold tracking-[0.12em] uppercase" :style="{ color: spark.color }">{{ spark.tag }}</span>
            </div>

            <h3 class="font-display text-base font-bold text-text-primary mb-1.5 pl-2.5 group-hover:text-accent-2 transition-colors">
              {{ spark.name }}
            </h3>

            <p class="text-[0.78rem] leading-[1.6] text-text-secondary pl-2.5 mb-4">
              {{ spark.desc }}
            </p>
          </div>

          <div class="pl-2.5 pt-3 border-t border-white/5 flex items-center justify-between">
            <span class="text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-text-muted">
              {{ spark.category }}
            </span>
            <a
              v-if="spark.demoUrl"
              :href="spark.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[0.65rem] font-bold tracking-[0.08em] uppercase no-underline flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-text-primary hover:bg-accent-2/20 hover:border-accent-2/40 hover:text-accent-2 transition-all"
            >
              Launch <LucideArrowUpRight class="w-3 h-3" />
            </a>
          </div>
        </div>
      </TransitionGroup>

    </div>
  </main>
</template>

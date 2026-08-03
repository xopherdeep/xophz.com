<script setup lang="ts">
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase } from '@lucide/vue'

const { identity, skillTags, stats, specialties, projects, socialLinks } = useProfileData()

const featuredProjects = computed(() => projects.slice(0, 3))
const topLinks = computed(() => socialLinks.slice(0, 3))
</script>

<template>
  <section class="bento w-full min-h-[calc(100dvh-152px)] flex items-center justify-center px-4 py-6" aria-label="Home">
    <div class="w-full max-w-[1100px] grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(100px,1fr)] gap-3">

      <!-- Identity tile (spans 2 cols, 2 rows) -->
      <div class="col-span-2 row-span-2 flex flex-col items-center justify-center gap-4 p-6 md:p-8 bg-white/5 border border-white/12 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, scale: 0.95 }, enter: { opacity: 1, scale: 1, transition: { duration: 400 } } }">
        <div class="p-[2px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]">
          <div class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-bg border-[3px] border-bg overflow-hidden">
            <NuxtImg :src="identity.headshot" :alt="identity.name" width="100" height="100" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="text-center flex flex-col gap-1.5">
          <h1 class="font-display text-2xl md:text-3xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">{{ identity.name }}</h1>
          <p class="text-sm font-medium text-accent-2">{{ identity.title }}</p>
          <p class="text-[0.78rem] leading-[1.6] text-text-secondary max-w-[32ch] mx-auto mt-1">{{ identity.tagline }}</p>
        </div>
        <ul class="flex flex-wrap gap-1.5 justify-center list-none p-0 mt-1">
          <li v-for="tag in skillTags.slice(0, 4)" :key="tag" class="text-[0.62rem] font-medium tracking-[0.06em] px-2.5 py-1 rounded-full bg-accent/8 border border-accent/20 text-text-muted whitespace-nowrap">{{ tag }}</li>
        </ul>
      </div>

      <!-- Stats tile (1 col, 2 rows) -->
      <div class="row-span-2 flex flex-col gap-3 p-5 bg-white/5 border border-white/12 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, x: 15 }, enter: { opacity: 1, x: 0, transition: { delay: 100 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">BY THE NUMBERS</p>
        <div class="flex-1 flex flex-col justify-around">
          <div v-for="stat in stats" :key="stat.label" class="text-center py-2">
            <p class="font-display text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">{{ stat.value }}</p>
            <p class="text-[0.62rem] text-text-muted mt-0.5 tracking-[0.06em] uppercase">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Connect tile (1 col, 2 rows) -->
      <div class="row-span-2 flex flex-col gap-2.5 p-5 bg-white/5 border border-white/12 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, x: 15 }, enter: { opacity: 1, x: 0, transition: { delay: 150 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">CONNECT</p>
        <div class="flex-1 flex flex-col gap-1">
          <a v-for="link in socialLinks" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 py-1.5 rounded-lg px-2 text-text-secondary no-underline transition-all duration-200 hover:bg-white/8 hover:text-text-primary" :style="{ '--lc': link.color }">
            <component :is="link.icon" class="w-3.5 h-3.5 shrink-0 text-[color:var(--lc)]" />
            <span class="text-[0.7rem] font-medium truncate">{{ link.label }}</span>
          </a>
        </div>
        <NuxtLink to="/connect" class="text-[0.62rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100 self-end">All links →</NuxtLink>
      </div>

      <!-- Specialties tile (2 cols, 1 row) -->
      <div class="col-span-2 flex flex-col gap-3 p-5 bg-white/5 border border-white/12 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 200 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">WHAT I DO</p>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="s in specialties" :key="s.key" class="flex items-start gap-2">
            <component :is="s.icon" class="w-4 h-4 text-accent-2 shrink-0 mt-0.5" />
            <div>
              <p class="text-[0.75rem] font-semibold text-text-primary">{{ s.title }}</p>
              <p class="text-[0.65rem] leading-[1.5] text-text-muted mt-0.5 line-clamp-2">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects tile (2 cols, 1 row) -->
      <div class="col-span-2 flex flex-col gap-3 p-5 bg-white/5 border border-white/12 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 250 } } }">
        <div class="flex items-center justify-between">
          <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">MAGNUM OPUS</p>
          <NuxtLink to="/projects" class="text-[0.62rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100">View all →</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div v-for="p in featuredProjects" :key="p.key" class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/8 transition-all duration-200 hover:bg-white/10 hover:border-white/15">
            <span class="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_var(--pc)]" :style="{ backgroundColor: p.color, '--pc': p.color }" />
            <div class="min-w-0">
              <p class="text-[0.72rem] font-semibold text-text-primary truncate">{{ p.name }}</p>
              <p class="text-[0.6rem] text-text-muted truncate">{{ p.tag }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action CTAs tile -->
      <div class="col-span-2 md:col-span-4 flex flex-col sm:flex-row gap-3 justify-center py-2" v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: 350 } } }">
        <a
          href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 bg-gradient-hero border-none text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)] no-underline hover:-translate-y-0.5"
        >
          <LucideCalendar class="w-4 h-4 shrink-0" />
          Book a Meeting
        </a>
        <NuxtLink
          to="/projects"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 bg-white/5 border border-white/12 text-text-secondary no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:-translate-y-0.5"
        >
          <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
          Explore Magnum Opus
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

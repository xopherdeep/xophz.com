<script setup lang="ts">
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase } from '@lucide/vue'

const { identity, skillTags, stats, specialties, projects, socialLinks } = useProfileData()

const featuredProjects = computed(() => projects.slice(0, 5))
</script>

<template>
  <section class="split w-full min-h-[calc(100dvh-152px)] flex flex-col md:flex-row" aria-label="Home">

    <!-- Left: Fixed identity sidebar -->
    <aside class="w-full md:w-[340px] lg:w-[380px] shrink-0 flex flex-col items-center justify-center gap-5 p-6 md:p-8 md:sticky md:top-[56px] md:h-[calc(100dvh-126px)] bg-white/[0.03] border-b md:border-b-0 md:border-r border-white/10" v-motion="{ initial: { opacity: 0, x: -30 }, enter: { opacity: 1, x: 0, transition: { duration: 400 } } }">
      <!-- Headshot -->
      <div class="p-[2px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]">
        <div class="w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full bg-bg border-[3px] border-bg overflow-hidden">
          <NuxtImg :src="identity.headshot" :alt="identity.name" width="100" height="100" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Name -->
      <div class="text-center flex flex-col gap-1.5">
        <h1 class="font-display text-2xl md:text-3xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">{{ identity.name }}</h1>
        <p class="text-sm font-medium text-accent-2">{{ identity.title }}</p>
      </div>

      <!-- Tags -->
      <ul class="flex flex-wrap gap-1.5 justify-center list-none p-0">
        <li v-for="tag in skillTags.slice(0, 4)" :key="tag" class="text-[0.6rem] font-medium tracking-[0.06em] px-2.5 py-1 rounded-full bg-accent/8 border border-accent/20 text-text-muted whitespace-nowrap">{{ tag }}</li>
      </ul>

      <!-- Stats row -->
      <div class="flex gap-4">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="font-display text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">{{ stat.value }}</p>
          <p class="text-[0.55rem] text-text-muted tracking-[0.06em] uppercase">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Social links (compact) -->
      <div class="flex gap-2 mt-2">
        <a v-for="link in socialLinks.slice(0, 5)" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-text-muted transition-all duration-200 hover:bg-white/12 hover:border-white/20 hover:text-text-primary no-underline" :style="{ '--lc': link.color }" :title="link.label">
          <component :is="link.icon" class="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>

    <!-- Right: Content area -->
    <div class="flex-1 flex flex-col gap-6 p-6 md:p-8 overflow-y-auto">
      <!-- Tagline -->
      <p class="text-sm md:text-base leading-[1.7] text-text-secondary max-w-[50ch]" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }">{{ identity.tagline }}</p>

      <!-- What I Do -->
      <div v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 150 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-3">WHAT I DO</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div v-for="s in specialties" :key="s.key" class="group flex gap-3 p-4 bg-white/5 border border-white/12 rounded-xl backdrop-blur-xl transition-all duration-200 hover:border-accent/25 hover:bg-white/8">
            <component :is="s.icon" class="w-5 h-5 text-accent-2 shrink-0 mt-0.5" />
            <div>
              <p class="text-[0.82rem] font-semibold text-text-primary">{{ s.title }}</p>
              <p class="text-[0.72rem] leading-[1.5] text-text-muted mt-1">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Projects -->
      <div v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 250 } } }">
        <div class="flex items-center justify-between mb-3">
          <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">MAGNUM OPUS</p>
          <NuxtLink to="/projects" class="text-[0.62rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100">View all →</NuxtLink>
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="p in featuredProjects" :key="p.key" class="relative flex items-center gap-3 p-3.5 bg-white/5 border border-white/12 rounded-xl backdrop-blur-xl transition-all duration-200 hover:border-[color:var(--pc)]/25 hover:bg-white/8 overflow-hidden" :style="{ '--pc': p.color }">
            <div class="absolute left-0 top-0 bottom-0 w-[2px] rounded-r-sm" :style="{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }" />
            <div class="pl-2 min-w-0 flex-1">
              <p class="text-[0.78rem] font-semibold text-text-primary truncate">{{ p.name }}</p>
              <p class="text-[0.62rem] text-text-muted">{{ p.tag }}</p>
            </div>
            <a v-if="p.url" :href="p.url" target="_blank" rel="noopener noreferrer" class="text-[0.55rem] font-bold tracking-[0.08em] uppercase no-underline opacity-50 hover:opacity-100 shrink-0" :style="{ color: p.color }">Visit ↗</a>
          </div>
        </div>
      </div>

      <!-- Action CTAs -->
      <div class="flex flex-col sm:flex-row gap-3 mt-2" v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: 350 } } }">
        <a
          href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 bg-gradient-hero border-none text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)] no-underline hover:-translate-y-0.5"
        >
          <LucideCalendar class="w-4 h-4 shrink-0" />
          Book a Meeting
        </a>
        <NuxtLink
          to="/projects"
          class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 bg-white/5 border border-white/12 text-text-secondary no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:-translate-y-0.5"
        >
          <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
          Explore Magnum Opus
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

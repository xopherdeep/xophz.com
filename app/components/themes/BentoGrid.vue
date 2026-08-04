<script setup lang="ts">
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase, ArrowUpRight as LucideArrowUpRight } from '@lucide/vue'

const { identity, personas, skillTags, stats, specialties, projects, socialLinks } = useProfileData()

const featuredProjects = computed(() => projects.slice(0, 3))
</script>

<template>
  <section class="bento w-full min-h-[calc(100dvh-152px)] flex items-center justify-center px-4 py-6" aria-label="Home">
    <div class="w-full max-w-[1100px] grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(100px,1fr)] gap-3">

      <!-- Identity tile (spans 2 cols, 2 rows) -->
      <XCard class="col-span-2 row-span-2 items-center justify-center gap-4 p-6 md:p-8" v-motion="{ initial: { opacity: 0, scale: 0.95 }, enter: { opacity: 1, scale: 1, transition: { duration: 400 } } }">
        <div class="p-[2px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]">
          <div class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-bg border-[3px] border-bg overflow-hidden">
            <NuxtImg :src="identity.avatar" :alt="identity.name" width="100" height="100" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="text-center flex flex-col gap-1.5">
          <h1 class="font-display text-2xl md:text-3xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">{{ identity.name }}</h1>
          <p class="text-sm font-medium text-accent-2">{{ identity.title }}</p>
          <p class="text-[0.78rem] leading-[1.6] text-text-secondary max-w-[32ch] mx-auto mt-1">{{ identity.tagline }}</p>
        </div>
        <ul class="flex flex-wrap gap-1.5 justify-center list-none p-0 mt-1">
          <li v-for="tag in skillTags.slice(0, 4)" :key="tag">
            <XBadge variant="accent">{{ tag }}</XBadge>
          </li>
        </ul>
      </XCard>

      <!-- Personas tile (2 cols, 2 rows) -->
      <XCard class="col-span-2 row-span-2 gap-3 p-5" v-motion="{ initial: { opacity: 0, x: 15 }, enter: { opacity: 1, x: 0, transition: { delay: 100 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">CREATIVE SPECTRUM &amp; PERSONAS</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
          <XCard
            v-for="p in personas"
            :key="p.key"
            :href="p.link"
            interactive
            padding="p-3"
            variant="subtle"
            class="group justify-between"
            :style="{ '--pc': p.color }"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center bg-white/5 text-[color:var(--pc)] border border-white/10">
                <component :is="p.icon" class="w-3.5 h-3.5" />
              </span>
              <LucideArrowUpRight class="w-3 h-3 text-text-muted shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary" />
            </div>
            <div>
              <p class="text-[0.78rem] font-bold text-text-primary truncate">{{ p.name }}</p>
              <p class="text-[0.6rem] font-medium text-[color:var(--pc)] truncate mb-0.5">{{ p.subtitle }}</p>
              <p class="text-[0.65rem] leading-[1.4] text-text-muted line-clamp-2">{{ p.desc }}</p>
            </div>
          </XCard>
        </div>
      </XCard>

      <!-- Projects tile (2 cols, 1 row) -->
      <XCard class="col-span-2 gap-3 p-5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 200 } } }">
        <div class="flex items-center justify-between">
          <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">MAGNUM OPUS</p>
          <NuxtLink to="/projects" class="text-[0.62rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100">View all →</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <XCard v-for="p in featuredProjects" :key="p.key" variant="subtle" padding="p-2.5" interactive class="flex-row items-center gap-2.5">
            <span class="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_var(--pc)]" :style="{ backgroundColor: p.color, '--pc': p.color }" />
            <div class="min-w-0">
              <p class="text-[0.72rem] font-semibold text-text-primary truncate">{{ p.name }}</p>
              <p class="text-[0.6rem] text-text-muted truncate">{{ p.tag }}</p>
            </div>
          </XCard>
        </div>
      </XCard>

      <!-- Connect tile (2 cols, 1 row) -->
      <XCard class="col-span-2 gap-2.5 p-5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 250 } } }">
        <div class="flex items-center justify-between">
          <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">CONNECT &amp; SOCIALS</p>
          <NuxtLink to="/connect" class="text-[0.62rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100">All links →</NuxtLink>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <a v-for="link in socialLinks.slice(0, 8)" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 py-1.5 rounded-lg px-2 text-text-secondary no-underline transition-all duration-200 hover:bg-white/8 hover:text-text-primary" :style="{ '--lc': link.color }">
            <component :is="link.icon" class="w-3.5 h-3.5 shrink-0 text-[color:var(--lc)]" />
            <span class="text-[0.68rem] font-medium truncate">{{ link.label }}</span>
          </a>
        </div>
      </XCard>

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
        <XCard
          to="/projects"
          interactive
          padding="px-6 py-3"
          variant="glass"
          class="flex-1 flex-row items-center justify-center gap-2 rounded-xl text-xs font-semibold text-text-secondary no-underline hover:text-text-primary"
        >
          <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
          Explore Magnum Opus
        </XCard>
      </div>
    </div>
  </section>
</template>

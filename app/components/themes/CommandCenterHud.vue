<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase } from '@lucide/vue'

const { identity, personas, skillTags, stats, specialties, projects, socialLinks } = useProfileData()
const { x: mouseX, y: mouseY } = useMouse()

const featuredProjects = computed(() => projects.slice(0, 4))
const featuredLinks = computed(() => socialLinks.slice(0, 4))

const parallax = (depth: number) => {
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  const offsetX = ((mouseX.value - centerX) / centerX) * depth
  const offsetY = ((mouseY.value - centerY) / centerY) * depth
  return { transform: `translate(${offsetX}px, ${offsetY}px)` }
}
</script>

<template>
  <section class="hud w-full min-h-[calc(100dvh-152px)] flex items-center justify-center px-4 py-8" aria-label="Home">
    <div class="relative w-full max-w-[1100px] min-h-[520px] flex items-center justify-center">

      <!-- Identity anchor (center) -->
      <div class="relative z-10 flex flex-col items-center gap-4 text-center" :style="parallax(3)" v-motion="{ initial: { opacity: 0, scale: 0.9 }, enter: { opacity: 1, scale: 1, transition: { duration: 500 } } }">
        <div class="p-[2px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]">
          <div class="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full bg-bg border-[3px] border-bg overflow-hidden">
            <NuxtImg :src="identity.headshot" :alt="identity.name" width="110" height="110" class="w-full h-full object-cover" />
          </div>
        </div>
        <h1 class="font-display text-3xl md:text-4xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">{{ identity.name }}</h1>
        <p class="text-xs font-semibold text-accent-2">{{ identity.title }}</p>
        <p class="text-[0.8rem] leading-[1.6] text-text-secondary max-w-[36ch]">{{ identity.tagline }}</p>
      </div>

      <!-- Floating HUD cards (absolute positioned around center) -->

      <!-- Personas card (top-left) -->
      <div class="hidden md:flex absolute top-0 left-0 flex-col gap-2 p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow w-[230px] transition-all duration-300 hover:border-accent/25 hover:bg-white/8" :style="parallax(-6)" v-motion="{ initial: { opacity: 0, x: -30, y: -20 }, enter: { opacity: 1, x: 0, y: 0, transition: { delay: 200 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">CREATIVE SPECTRUM</p>
        <div class="flex flex-col gap-2">
          <component
            v-for="p in personas"
            :key="p.key"
            :is="p.link.startsWith('http') ? 'a' : 'NuxtLink'"
            :href="p.link.startsWith('http') ? p.link : undefined"
            :to="!p.link.startsWith('http') ? p.link : undefined"
            :target="p.link.startsWith('http') ? '_blank' : undefined"
            :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="flex items-center gap-2 text-text-secondary no-underline transition-colors duration-200 hover:text-text-primary group"
            :style="{ '--pc': p.color }"
          >
            <span class="w-5 h-5 rounded flex items-center justify-center bg-white/5 text-[color:var(--pc)] shrink-0">
              <component :is="p.icon" class="w-3 h-3" />
            </span>
            <span class="text-[0.72rem] font-semibold truncate flex-1">{{ p.name }}</span>
          </component>
        </div>
      </div>

      <!-- Stats card (top-right) -->
      <div class="hidden md:flex absolute top-4 right-0 flex-col gap-2 p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow w-[200px] transition-all duration-300 hover:border-accent/25 hover:bg-white/8" :style="parallax(-8)" v-motion="{ initial: { opacity: 0, x: 30, y: -20 }, enter: { opacity: 1, x: 0, y: 0, transition: { delay: 300 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">BY THE NUMBERS</p>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="font-display text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">{{ stat.value }}</p>
            <p class="text-[0.6rem] text-text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Featured projects card (bottom-left) -->
      <div class="hidden md:flex absolute bottom-0 left-4 flex-col gap-2 p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow w-[230px] transition-all duration-300 hover:border-accent/25 hover:bg-white/8" :style="parallax(-5)" v-motion="{ initial: { opacity: 0, x: -30, y: 20 }, enter: { opacity: 1, x: 0, y: 0, transition: { delay: 400 } } }">
        <div class="flex items-center justify-between">
          <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">PROJECTS</p>
          <NuxtLink to="/projects" class="text-[0.6rem] font-semibold text-accent no-underline opacity-70 hover:opacity-100">View all →</NuxtLink>
        </div>
        <div class="flex flex-col gap-1.5">
          <div v-for="p in featuredProjects" :key="p.key" class="flex items-center gap-2 py-1">
            <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_6px_var(--pc)]" :style="{ backgroundColor: p.color, '--pc': p.color }" />
            <span class="text-[0.72rem] text-text-secondary truncate">{{ p.name }}</span>
          </div>
        </div>
      </div>

      <!-- Connect card (bottom-right) -->
      <div class="hidden md:flex absolute bottom-4 right-0 flex-col gap-2 p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow w-[200px] transition-all duration-300 hover:border-accent/25 hover:bg-white/8" :style="parallax(-7)" v-motion="{ initial: { opacity: 0, x: 30, y: 20 }, enter: { opacity: 1, x: 0, y: 0, transition: { delay: 500 } } }">
        <p class="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-text-muted">CONNECT</p>
        <div class="flex flex-col gap-1">
          <a v-for="link in featuredLinks" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 py-1.5 text-text-secondary no-underline transition-colors duration-200 hover:text-text-primary" :style="{ '--lc': link.color }">
            <component :is="link.icon" class="w-3.5 h-3.5 shrink-0 text-[color:var(--lc)]" />
            <span class="text-[0.72rem] truncate">{{ link.label }}</span>
          </a>
        </div>
      </div>

      <!-- Mobile CTAs (visible on small screens only) -->
      <div class="flex md:hidden absolute -bottom-6 left-0 right-0 gap-2 justify-center px-2">
        <a
          href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-hero text-white no-underline text-xs font-semibold shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
        >
          <LucideCalendar class="w-3.5 h-3.5" />
          Book Meeting
        </a>
        <NuxtLink
          to="/projects"
          class="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/[0.06] text-text-secondary no-underline text-xs font-semibold backdrop-blur-xl"
        >
          <LucideBriefcase class="w-3.5 h-3.5 text-accent" />
          Explore Opus
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

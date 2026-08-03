<script setup lang="ts">
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase, FileText as LucideFileText } from '@lucide/vue'

const { identity, skillTags } = useProfileData()
</script>

<template>
  <section class="cinematic w-full min-h-[calc(100dvh-152px)] flex flex-col items-center justify-center gap-8 px-4" aria-label="Home">
    <!-- Headshot with animated ring -->
    <div class="p-[3px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]" v-motion="{ initial: { opacity: 0, scale: 0.7 }, enter: { opacity: 1, scale: 1, transition: { duration: 600 } } }">
      <div class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-bg flex items-center justify-center border-[3px] border-bg overflow-hidden">
        <NuxtImg :src="identity.headshot" :alt="identity.name" width="150" height="150" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Identity -->
    <div class="text-center flex flex-col gap-3" v-motion="{ initial: { opacity: 0, y: 30 }, enter: { opacity: 1, y: 0, transition: { delay: 200, duration: 500 } } }">
      <p class="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-accent opacity-60">{{ identity.siteLabel }}</p>
      <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-text-primary leading-[1]">{{ identity.name }}</h1>
      <p class="text-lg md:text-xl font-medium text-accent-2 tracking-[0.01em]">{{ identity.title }}</p>
    </div>

    <!-- Tagline -->
    <p class="text-sm md:text-base leading-[1.7] text-text-secondary max-w-[48ch] text-center" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 400 } } }">{{ identity.tagline }}</p>

    <!-- Skill tags -->
    <ul class="flex flex-wrap gap-2 justify-center list-none p-0 max-w-[600px]" aria-label="Skills and roles" v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: 500 } } }">
      <li
        v-for="tag in skillTags"
        :key="tag"
        class="text-[0.7rem] font-medium tracking-[0.06em] px-3 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-text-muted whitespace-nowrap transition-all duration-300 backdrop-blur-md hover:bg-accent/18 hover:border-accent/45 hover:text-text-primary hover:shadow-[0_0_14px_rgba(139,92,246,0.12)]"
      >{{ tag }}</li>
    </ul>

    <!-- Action CTAs -->
    <div class="flex flex-col sm:flex-row gap-3 w-full max-w-[500px] justify-center mt-2" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 650 } } }">
      <a
        href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-gradient-hero border-none text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.55)]"
      >
        <LucideCalendar class="w-4 h-4 shrink-0" />
        Book a Meeting
      </a>
      <NuxtLink
        to="/projects"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-white/15 text-text-secondary backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:shadow-[0_4px_16px_rgba(139,92,246,0.1)] hover:-translate-y-0.5"
      >
        <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
        Explore Opus
      </NuxtLink>
      <NuxtLink
        to="/posts"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-accent/25 text-[#a78bfa] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] no-underline hover:bg-accent/10 hover:border-accent/40 hover:text-[#c4b5fd] hover:shadow-[0_4px_16px_rgba(139,92,246,0.1)] hover:-translate-y-0.5"
      >
        <LucideFileText class="w-4 h-4 shrink-0" />
        Blog
      </NuxtLink>
    </div>
  </section>
</template>

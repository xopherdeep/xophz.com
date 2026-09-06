<script setup lang="ts">
import { Calendar as LucideCalendar, Briefcase as LucideBriefcase, FileText as LucideFileText, ArrowUpRight as LucideArrowUpRight, FileBadge as LucideFileBadge } from '@lucide/vue'
import XAvatar from '~/components/atoms/XAvatar.vue'

const { identity, skillTags, personas } = useProfileData()
</script>

<template>
  <section class="cinematic w-full min-h-[calc(100dvh-152px)] flex flex-col items-center justify-center gap-7 px-4 py-6" aria-label="Home">
    <!-- Headshot with animated ring -->
    <div class="p-[3px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite]" v-motion="{ initial: { opacity: 0, scale: 0.7 }, enter: { opacity: 1, scale: 1, transition: { duration: 600 } } }">
      <div class="w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full bg-bg flex items-center justify-center border-[3px] border-bg overflow-hidden">
        <XAvatar :src="identity.avatar" :alt="identity.name" :size="140" />
      </div>
    </div>

    <!-- Identity -->
    <div class="text-center flex flex-col gap-2.5" v-motion="{ initial: { opacity: 0, y: 30 }, enter: { opacity: 1, y: 0, transition: { delay: 200, duration: 500 } } }">
      <p class="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-accent opacity-60">{{ identity.siteLabel }}</p>
      <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] text-text-primary leading-[1]">{{ identity.name }}</h1>
      <p class="text-base md:text-lg font-medium text-accent-2 tracking-[0.01em]">{{ identity.title }}</p>
    </div>

    <!-- Tagline -->
    <p class="text-sm md:text-base leading-[1.7] text-text-secondary max-w-[50ch] text-center" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 400 } } }">{{ identity.tagline }}</p>

    <!-- Personas / Monikers grid -->
    <div class="w-full max-w-[850px] grid grid-cols-1 sm:grid-cols-3 gap-3.5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 500 } } }">
      <XCard
        v-for="p in personas"
        :key="p.key"
        :href="p.link"
        interactive
        padding="p-4"
        variant="glass"
        class="group justify-between text-left"
        :style="{ '--pc': p.color, '--pc-glow': `${p.color}33` }"
      >
        <div class="flex items-center justify-between">
          <span class="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 text-[color:var(--pc)] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
            <component :is="p.icon" class="w-4.5 h-4.5" />
          </span>
          <LucideArrowUpRight class="w-4 h-4 text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary" />
        </div>
        <div class="mt-4">
          <p class="font-display text-sm font-bold text-text-primary mb-0.5">{{ p.name }}</p>
          <p class="text-[0.62rem] font-semibold text-[color:var(--pc)] mb-1">{{ p.subtitle }}</p>
          <p class="text-[0.72rem] text-text-muted line-clamp-2 leading-[1.4]">{{ p.desc }}</p>
        </div>
      </XCard>
    </div>

    <!-- Actions -->
    <div
      class="flex flex-col sm:flex-row gap-3 w-full max-w-[560px]"
      v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 450 } } }"
    >
      <a
        href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-gradient-hero border-none text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.55)]"
      >
        <LucideCalendar class="w-4 h-4 shrink-0" />
        Book a Meeting
      </a>
      <NuxtLink
        to="/resume"
        class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-white/[0.08] text-text-secondary backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:shadow-[0_4px_16px_rgba(139,92,246,0.1)] hover:-translate-y-0.5"
      >
        <LucideFileBadge class="w-4 h-4 shrink-0 text-accent" />
        Executive Resume
      </NuxtLink>
      <NuxtLink
        to="/projects"
        class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] bg-white/5 border border-white/[0.08] text-text-secondary backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:shadow-[0_4px_16px_rgba(139,92,246,0.1)] hover:-translate-y-0.5"
      >
        <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
        Explore Opus
      </NuxtLink>
    </div>
  </section>
</template>

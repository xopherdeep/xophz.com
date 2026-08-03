<script setup lang="ts">
const { identity, stats, specialties, skills } = useProfileData()

useSeoMeta({
  title: 'About · Xopher "XP" Pollard',
  description: 'Principal Systems Synthesist with 25+ years engineering massive-scale software. CTO, Architect, Founder.',
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[900px] px-4 pt-[80px] pb-[90px] flex flex-col gap-10">

      <!-- Header -->
      <div class="flex items-center gap-5" v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">
        <NuxtImg :src="identity.headshot" :alt="identity.name" width="80" height="80" class="rounded-full object-cover shadow-[0_4px_20px_rgba(139,92,246,0.3)] border-2 border-accent/30 shrink-0" />
        <div>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-[-0.03em]">Who I Am</h1>
          <p class="text-sm text-text-muted mt-1">Builder. Architect. Systems Thinker.</p>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="grid grid-cols-4 gap-3" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }">
        <div v-for="stat in stats" :key="stat.label" class="text-center p-4 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl transition-all duration-200 hover:border-accent/25 hover:bg-white/8">
          <p class="font-display text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">{{ stat.value }}</p>
          <p class="text-[0.7rem] text-text-muted mt-1 tracking-[0.08em] uppercase">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Bio -->
      <div class="bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl p-6 md:p-8 shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 120 } } }">
        <p class="text-sm md:text-base leading-[1.75] text-text-secondary">I've led engineering at Series A through Fortune 500. I've been a co-founder, a solo contributor, a CTO, and everything in between. My superpower is seeing the entire system - code, team, process, and market - as one coherent machine that needs to be tuned.</p>
      </div>

      <!-- Specialties -->
      <div>
        <p class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 160 } } }">WHAT I DO</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="(item, idx) in specialties" :key="item.key" class="group flex gap-4 p-5 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/30 hover:bg-white/8" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 180 + idx * 60 } } }">
            <span class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-accent/15 text-accent-2 transition-all duration-300 group-hover:bg-accent/25 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]">
              <component :is="item.icon" class="w-5 h-5" />
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-[0.92rem] font-semibold text-text-primary mb-1">{{ item.title }}</p>
              <p class="text-[0.8rem] leading-[1.6] text-text-secondary">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills grid -->
      <div>
        <p class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 400 } } }">SKILLS &amp; STACK</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(group, idx) in skills" :key="group.group" class="p-4 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/8" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 420 + idx * 50 } } }">
            <p class="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent mb-2.5">{{ group.group }}</p>
            <ul class="list-none p-0 flex flex-col gap-1.5">
              <li v-for="skill in group.items" :key="skill" class="text-[0.78rem] text-text-secondary flex items-center gap-1.5 before:content-[''] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-accent-2 before:shrink-0">{{ skill }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

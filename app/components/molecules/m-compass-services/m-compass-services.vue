<script setup lang="ts">
import {
  Zap as LucideZap,
  Layers as LucideLayers,
  Building2 as LucideBuilding2,
} from '@lucide/vue'

const consultingFeatures = [
  {
    title: 'Legacy Modernization',
    icon: LucideZap,
    desc: 'Transform monolithic systems into clean, decoupled micro-services and modern Vue/Nuxt frontends without downtime.',
    color: '#06b6d4'
  },
  {
    title: 'Custom Plugin Architecture',
    icon: LucideLayers,
    desc: 'Bespoke WordPress & Vue plugin suites built on the Xophz-COMPASS atomic design pattern and spatial OS mechanics.',
    color: '#8b5cf6'
  },
  {
    title: 'Systems & Cloud Advisory',
    icon: LucideBuilding2,
    desc: '25+ years of distributed systems engineering, AWS cloud optimization, and CTO-level technical leadership.',
    color: '#f59e0b'
  }
]
</script>

<template>
  <section
    class="grid grid-cols-1 md:grid-cols-3 gap-4"
    v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }"
  >
    <div
      v-for="service in consultingFeatures"
      :key="service.title"
      class="xo-card-glow xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-3 transition-all duration-300"
    >
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
        :style="{ backgroundColor: service.color + '15', color: service.color }"
      >
        <component :is="service.icon" class="w-5 h-5" />
      </div>
      <h2 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
        {{ service.title }}
      </h2>
      <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {{ service.desc }}
      </p>
    </div>
  </section>
</template>

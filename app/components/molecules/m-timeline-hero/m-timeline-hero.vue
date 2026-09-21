<script setup lang="ts">
import { useTimelineHeroController } from './m-timeline-hero.controller'
import type { TimelineHeroProps } from './types'

const props = withDefaults(defineProps<TimelineHeroProps>(), {
  totalYears: 36,
  totalRoles: 20,
  activeVentures: 4
})

const { heroStats, canRenderHero } = useTimelineHeroController(props)
</script>

<template>
  <header
    v-if="canRenderHero"
    class="m-timeline-hero pt-8 pb-4"
  >
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <UBadge
            color="primary"
            variant="subtle"
            size="sm"
            class="font-mono"
          >
            Chronological Archive
          </UBadge>
          <span class="text-xs text-zinc-500 dark:text-zinc-400">
            200X to Present
          </span>
        </div>

        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Career <span class="xo-gradient-text">Timeline</span>
        </h1>

        <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Over two decades of systems architecture, enterprise cloud modernization, and sovereign venture engineering
          across {{ totalRoles }} verified career milestones.
        </p>
      </div>

      <!-- Quick Metrics Strip -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="stat in heroStats"
          :key="stat.label"
          class="xo-card-glow rounded-xl p-4 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-1"
        >
          <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {{ stat.label }}
          </span>
          <span class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100">
            {{ stat.value }}
          </span>
          <span class="text-xs text-violet-600 dark:text-violet-400">
            {{ stat.subtitle }}
          </span>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<style scoped lang="scss">
  @use './m-timeline-hero';
</style>

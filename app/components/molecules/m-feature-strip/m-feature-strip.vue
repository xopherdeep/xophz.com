<script setup lang="ts">
import { useFeatureStripController } from './m-feature-strip.controller'

const { featureStats, hasStats } = useFeatureStripController()

const statIcons = ['i-lucide-clock', 'i-lucide-cloud', 'i-lucide-shield', 'i-lucide-sparkles']
const statColors = ['violet', 'cyan', 'emerald', 'amber']
</script>

<template>
  <section v-if="hasStats" class="m-feature-strip py-10">
    <UContainer class="max-w-4xl">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(stat, idx) in featureStats"
          :key="stat.label"
          class="xo-card-glow xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl text-center transition-all duration-300"
          v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 80 * idx } } }"
        >
          <div class="flex items-center justify-center mb-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="[
                `bg-${statColors[idx]}-500/10`,
                `text-${statColors[idx]}-600`,
                `dark:text-${statColors[idx]}-400`
              ]"
            >
              <UIcon :name="statIcons[idx]" class="w-5 h-5" />
            </div>
          </div>
          <p class="text-2xl sm:text-3xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-1 xo-gradient-text">
            {{ stat.value }}
          </p>
          <p class="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 font-body">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-feature-strip';
</style>

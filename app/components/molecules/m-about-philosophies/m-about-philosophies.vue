<script setup lang="ts">
import { useAboutPhilosophiesController } from './m-about-philosophies.controller'

const { philosophies, hasPhilosophies } = useAboutPhilosophiesController()

const colorThemeMap: Record<string, string> = {
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
}

const resolveColorClass = (color?: string) => colorThemeMap[color || 'violet'] || colorThemeMap.violet

const resolveCardLayoutClass = (idx: number) => {
  const isFoundationCard = idx === 6
  return isFoundationCard
    ? 'sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center sm:gap-6'
    : ''
}
</script>

<template>
  <section v-if="hasPhilosophies" class="m-about-philosophies py-10">
    <UContainer class="max-w-[1100px] w-full">
      <h2
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-8"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        Core Philosophies
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, idx) in philosophies"
          :key="item.title"
          class="xo-card-glow xo-shine-on-hover group rounded-2xl p-6 md:p-7 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-4 transition-all duration-300"
          :class="resolveCardLayoutClass(idx)"
          v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 + idx * 100 } } }"
        >
          <!-- Gradient Icon Circle -->
          <div
            class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
            :class="resolveColorClass(item.color)"
          >
            <UIcon :name="item.icon" class="w-6 h-6" />
          </div>

          <div class="flex flex-col gap-1.5">
            <h3 class="font-bold font-display text-base text-zinc-900 dark:text-zinc-100">
              {{ item.title }}
            </h3>

            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-philosophies';
</style>

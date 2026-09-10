<script setup lang="ts">
import { useAboutMilestonesController } from './m-about-milestones.controller'

const { milestones, hasMilestones } = useAboutMilestonesController()
</script>

<template>
  <section v-if="hasMilestones" class="m-about-milestones py-10">
    <UContainer class="max-w-[1100px] w-full">
      <h2
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-8"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        Career Milestones
      </h2>

      <!-- Timeline -->
      <div class="relative pl-10">
        <!-- Connecting Line -->
        <div class="xo-timeline-line" aria-hidden="true" />

        <div class="flex flex-col gap-8">
          <div
            v-for="(item, idx) in milestones"
            :key="item.title"
            class="relative"
            v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: 100 + idx * 120 } } }"
          >
            <!-- Timeline Dot -->
            <div
              class="xo-timeline-dot"
              :class="idx === 0 ? 'xo-timeline-dot--active' : ''"
              :style="{ top: '6px' }"
            />

            <!-- Card -->
            <div class="xo-card-glow rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-2">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 class="font-bold font-display text-base text-zinc-900 dark:text-zinc-100">
                  {{ item.title }}
                </h3>
                <UBadge color="primary" variant="subtle" size="xs" class="w-fit shrink-0">
                  {{ item.period }}
                </UBadge>
              </div>
              <p class="text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400">
                {{ item.role }}
              </p>
              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-milestones';
</style>

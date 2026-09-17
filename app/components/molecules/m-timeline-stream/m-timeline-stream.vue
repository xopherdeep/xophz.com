<script setup lang="ts">
import { useTimelineStreamController } from './m-timeline-stream.controller'
import MTimelineCard from '../m-timeline-card/m-timeline-card.vue'
import type { TimelineStreamProps } from './types'

const props = defineProps<TimelineStreamProps>()

const { hasItems, isEmpty } = useTimelineStreamController(props)
</script>

<template>
  <section class="m-timeline-stream py-6">
    <UContainer class="max-w-[1100px] w-full">
      <!-- Empty State -->
      <div
        v-if="isEmpty"
        class="xo-card-glow rounded-2xl p-10 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] text-center flex flex-col items-center gap-3"
      >
        <UIcon name="i-lucide-search-x" class="w-8 h-8 text-zinc-400" />
        <p class="font-display font-semibold text-zinc-800 dark:text-zinc-200 text-base">
          No positions found
        </p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
          Try adjusting your search query or selecting a different career category.
        </p>
      </div>

      <!-- Chronological Stream -->
      <div v-else class="relative pl-10 sm:pl-12">
        <!-- Connecting Vertical Gradient Line -->
        <div class="m-timeline-stream__line" aria-hidden="true" />

        <div class="flex flex-col gap-6 sm:gap-8">
          <div
            v-for="(item, idx) in items"
            :key="item.id"
            class="relative"
            v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 60 + idx * 40 } } }"
          >
            <!-- Timeline Dot -->
            <div
              class="m-timeline-stream__dot"
              :class="item.isCurrent ? 'm-timeline-stream__dot--active' : ''"
              aria-hidden="true"
            />

            <!-- Timeline Card -->
            <MTimelineCard :item="item" :is-top-active="item.isCurrent" />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-timeline-stream';
</style>

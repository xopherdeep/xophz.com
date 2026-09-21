<script setup lang="ts">
import { useTimelineStreamController } from './m-timeline-stream.controller'
import MTimelineCard from '../m-timeline-card/m-timeline-card.vue'
import type { TimelineStreamProps } from './types'

const props = defineProps<TimelineStreamProps>()

const { isEmpty, hasEraGroups } = useTimelineStreamController(props)
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
        <p class="font-display font-semibold text-zinc-800 dark:text-zinc-200 text-base">No positions found</p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">Try adjusting your search query or selecting a different category.</p>
      </div>

      <!-- Chronological Timeline Stream with Spine & Date Gutter -->
      <div v-else class="relative">
        <div class="m-timeline-stream__line" aria-hidden="true" />

        <div class="flex flex-col gap-8">
          <template v-for="group in (hasEraGroups ? eraGroups : [{ era: null, items }])" :key="group.era?.key || 'all'">
            <!-- Era Waypoint -->
            <div v-if="group.era" class="m-timeline-stream__era-row py-3 mt-4 first:mt-0 border-b border-zinc-200/80 dark:border-white/[0.06]">
              <div class="m-timeline-stream__era-hub" aria-hidden="true" />
              <div class="flex items-center gap-2 flex-wrap">
                <UBadge color="primary" variant="subtle" size="xs" class="font-mono text-[10px]">{{ group.era.period }}</UBadge>
                <h3 class="font-display font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">{{ group.era.title }}</h3>
              </div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">{{ group.era.desc }}</p>
            </div>

            <!-- Milestone Item Row with Date Spine -->
            <div
              v-for="(item, idx) in group.items"
              :id="`role-${item.id}`"
              :key="item.id"
              class="m-timeline-stream__item-row scroll-mt-24"
              v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 25 + idx * 20 } } }"
            >
              <!-- Left Date Gutter -->
              <div class="m-timeline-stream__date-col">
                <span class="font-mono font-bold text-sm text-violet-600 dark:text-violet-400 leading-none">
                  {{ item.startDate.slice(0, 4) }}
                </span>
                <span class="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 shrink-0">
                  {{ item.duration }}
                </span>
              </div>

              <!-- Spine Dot Anchor & Connector Arm -->
              <div class="m-timeline-stream__node-anchor" aria-hidden="true">
                <div
                  class="m-timeline-stream__dot"
                  :class="[
                    item.isCurrent ? 'm-timeline-stream__dot--active' : '',
                    activeId === item.id ? 'ring-4 ring-violet-500/40' : ''
                  ]"
                />
              </div>
              <div class="m-timeline-stream__arm" aria-hidden="true" />

              <!-- Card Content Column -->
              <div class="m-timeline-stream__card-col">
                <MTimelineCard :item :is-top-active="item.isCurrent" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-timeline-stream';
</style>

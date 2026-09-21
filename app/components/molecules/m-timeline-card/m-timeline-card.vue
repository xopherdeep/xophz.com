<script setup lang="ts">
import { useTimelineCardController } from './m-timeline-card.controller'
import type { TimelineCardProps } from './types'

const props = defineProps<TimelineCardProps>()

const { companyInitials, hasCompanyLogo, isCurrentRole, hasSkills, canDisplayLink } = useTimelineCardController(props)
</script>

<template>
  <article
    class="m-timeline-card xo-card-glow rounded-2xl p-5 sm:p-6 bg-white dark:bg-white/[0.03] border backdrop-blur-xl flex flex-col gap-4"
    :class="[isCurrentRole ? 'border-violet-500/40 dark:border-violet-500/30' : 'border-zinc-200/80 dark:border-white/[0.06]']"
  >
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div class="flex items-start gap-3.5">
        <!-- Company Logo or Monogram -->
        <div class="m-timeline-card__logo bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200/60 dark:border-white/[0.08]">
          <img v-if="hasCompanyLogo" :src="item.logoUrl!" :alt="item.company" class="w-full h-full object-contain p-1" loading="lazy">
          <span v-else class="text-xs font-bold font-mono text-violet-600 dark:text-violet-400">
            {{ companyInitials }}
          </span>
        </div>

        <!-- Role & Company Info -->
        <div class="flex flex-col gap-0.5">
          <div class="flex items-center gap-2 flex-wrap">
            <a
              v-if="canDisplayLink"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="font-bold font-display text-base text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors inline-flex items-center gap-1.5 group"
            >
              {{ item.company }}
              <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <span v-else class="font-bold font-display text-base text-zinc-900 dark:text-zinc-100">
              {{ item.company }}
            </span>

            <UBadge v-if="isCurrentRole" color="primary" variant="subtle" size="xs">
              Active Venture
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="xs" class="font-mono text-[10px]">
              {{ item.engagementType }}
            </UBadge>
          </div>

          <p class="text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400">
            {{ item.role }}
          </p>
        </div>
      </div>

      <!-- Period & Duration Badges -->
      <div class="flex sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
        <span class="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          {{ item.period }}
        </span>
        <span class="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {{ item.duration }}
        </span>
      </div>
    </div>

    <!-- Highlight Summary -->
    <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
      {{ item.highlight }}
    </p>

    <!-- Skill Chips & Category Footer -->
    <div class="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-white/[0.04] flex-wrap">
      <div v-if="hasSkills" class="flex items-center gap-1.5 flex-wrap">
        <span
          v-for="skill in item.skills"
          :key="skill"
          class="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
        >
          {{ skill }}
        </span>
      </div>
      <span class="text-[11px] text-zinc-500 dark:text-zinc-400">
        {{ item.category }}
      </span>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use './m-timeline-card';
</style>

<script setup lang="ts">
import { useTimelineFilterController } from './m-timeline-filter.controller'
import type { TimelineFilterProps, TimelineFilterEmits } from './types'

const props = defineProps<TimelineFilterProps>()
const emit = defineEmits<TimelineFilterEmits>()

const {
  categoryOptions,
  isDescending,
  isFiltered,
  selectCategory,
  toggleSortOrder,
  onSearchChange,
  clearFilters
} = useTimelineFilterController(props, emit)
</script>

<template>
  <section class="m-timeline-filter py-4">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-4">
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <!-- Search Input -->
        <div class="w-full md:max-w-xs">
          <UInput
            :model-value="search"
            placeholder="Filter by role, company, skill..."
            icon="i-lucide-search"
            size="sm"
            class="w-full"
            @update:model-value="onSearchChange"
          />
        </div>

        <!-- Right Side: Sort Toggle and Reset Button -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {{ count }} {{ count === 1 ? 'result' : 'results' }}
          </span>

          <UButton
            color="neutral"
            variant="ghost"
            size="xs"
            :icon="isDescending ? 'i-lucide-arrow-down-narrow-wide' : 'i-lucide-arrow-up-narrow-wide'"
            @click="toggleSortOrder"
          >
            {{ isDescending ? 'Newest First' : 'Oldest First' }}
          </UButton>

          <UButton
            v-if="isFiltered"
            color="primary"
            variant="link"
            size="xs"
            icon="i-lucide-x"
            @click="clearFilters"
          >
            Reset
          </UButton>
        </div>
      </div>

      <!-- Category Chips -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in categoryOptions"
          :key="cat"
          type="button"
          class="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-medium"
          :class="[
            category === cat
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/[0.08]'
          ]"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-timeline-filter';
</style>

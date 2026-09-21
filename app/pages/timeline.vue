<script setup lang="ts">
import MTimelineHero from '~/components/molecules/m-timeline-hero/m-timeline-hero.vue'
import MTimelineRail from '~/components/molecules/m-timeline-rail/m-timeline-rail.vue'
import MTimelineFilter from '~/components/molecules/m-timeline-filter/m-timeline-filter.vue'
import MTimelineStream from '~/components/molecules/m-timeline-stream/m-timeline-stream.vue'
import { useTimelineData } from '~/composables/useTimelineData'

useSeoMeta({
  title: 'Career Timeline · Xopher (XP) Pollard',
  ogTitle: 'Career Timeline · Xopher (XP) Pollard',
  description: 'Interactive chronological career archive spanning 25+ years of systems architecture, platform engineering, and venture leadership from 200X to Present.',
  ogDescription: 'Interactive chronological career archive spanning 25+ years of systems architecture, platform engineering, and venture leadership from 200X to Present.',
})

const {
  items,
  eraGroups,
  searchQuery,
  selectedCategory,
  sortOrder,
  viewMode,
  activeItemId,
  scrollToRole,
  stats
} = useTimelineData()
</script>

<template>
  <main class="min-h-dvh flex flex-col timeline-page pb-16">
    <MTimelineHero
      :total-years="stats.totalYears"
      :total-roles="stats.totalRoles"
      :active-ventures="stats.activeVentures"
    />
    <MTimelineRail
      :items="items"
      :active-id="activeItemId"
      @select="scrollToRole"
    />
    <MTimelineFilter
      v-model:search="searchQuery"
      v-model:category="selectedCategory"
      v-model:sort-order="sortOrder"
      v-model:view-mode="viewMode"
      :count="items.length"
      :featured-count="stats.featuredRoles"
      :total-roles="stats.totalRoles"
    />
    <MTimelineStream
      :items="items"
      :era-groups="eraGroups"
      :active-id="activeItemId"
    />
  </main>
</template>

<script setup lang="ts">
import MTimelineHero from '~/components/molecules/m-timeline-hero/m-timeline-hero.vue'
import MTimelineFilter from '~/components/molecules/m-timeline-filter/m-timeline-filter.vue'
import MTimelineStream from '~/components/molecules/m-timeline-stream/m-timeline-stream.vue'
import { useTimelineData } from '~/composables/useTimelineData'

useSeoMeta({
  title: 'Career Timeline · Xopher (XP) Pollard',
  ogTitle: 'Career Timeline · Xopher (XP) Pollard',
  description: 'Interactive chronological career archive spanning 24+ years of systems architecture, platform engineering, and venture leadership from 2002 to present.',
  ogDescription: 'Interactive chronological career archive spanning 24+ years of systems architecture, platform engineering, and venture leadership from 2002 to present.',
})

const { items, searchQuery, selectedCategory, sortOrder, stats } = useTimelineData()
</script>

<template>
  <main class="min-h-dvh flex flex-col timeline-page pb-16">
    <MTimelineHero
      :total-years="stats.totalYears"
      :total-roles="stats.totalRoles"
      :active-ventures="stats.activeVentures"
    />
    <MTimelineFilter
      v-model:search="searchQuery"
      v-model:category="selectedCategory"
      v-model:sort-order="sortOrder"
      :count="items.length"
    />
    <MTimelineStream :items="items" />
  </main>
</template>

<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

const description = `Computer repair, website design, and tech consulting in Tucson, AZ. ${IDENTITY.fullName}: 25+ years helping people and small businesses.`

useSeoMeta({
  title: `${IDENTITY.name} · Computer Repair, Web Design & Tech Consulting in Tucson`,
  ogTitle: `xophz · ${IDENTITY.name}`,
  twitterTitle: `xophz · ${IDENTITY.name}`,
  description,
  ogDescription: description,
  twitterDescription: description,
})
</script>

<template>
  <div class="w-full flex flex-col gap-6 md:gap-12">
    <MHeroBanner />
    <MFeatureStrip />
    <MFeaturedProjects />
    <MHomeCta />
  </div>
</template>

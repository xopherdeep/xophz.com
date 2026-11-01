<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

const description = `${IDENTITY.fullName}: computer repair, website design, and tech consulting in Tucson, AZ and remote. 25+ years of experience. Available for new jobs.`

useSeoMeta({
  title: `${IDENTITY.name} · Systems Architect & Founder`,
  ogTitle: `xophz · ${IDENTITY.name}`,
  twitterTitle: `xophz · ${IDENTITY.name}`,
  description,
  ogDescription: description,
  twitterDescription: description,
})
</script>

<template>
  <div class="w-full flex flex-col">
    <MHeroBanner />
    <MHomePortals />
    <MHomeEnterprise />
    <MHomeCta />
  </div>
</template>

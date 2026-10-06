<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

const description = `Fractional CTO, systems architecture, and agentic AI engineering from ${IDENTITY.fullName}. 25+ years shipping production systems. Tucson, AZ and remote.`

useSeoMeta({
  title: `${IDENTITY.name} · Fractional CTO & Systems Architect`,
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
    <MHomeServices />
    <MHomeSteps />
    <MHomeEnterprise />
    <MHomeCta />
  </div>
</template>

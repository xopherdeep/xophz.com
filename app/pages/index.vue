<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

const description = `${IDENTITY.fullName}: systems architect and founder in Tucson, AZ. Enterprise platforms, sovereign infrastructure, and agentic AI tooling across My Compass Consulting, Chemical X, and Worldwide Webwork.`

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

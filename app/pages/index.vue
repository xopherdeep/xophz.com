<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

const description = `${IDENTITY.fullName}: operations and systems advisor. I find where operations leak money and time and design the fix across people, process, and systems. Based in Tucson, AZ, working remote. Taking new clients.`

useSeoMeta({
  title: `${IDENTITY.name} · Operations & Systems Advisor`,
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

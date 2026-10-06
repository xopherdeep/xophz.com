<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

useSeoMeta({
  title: `About · ${IDENTITY.name}`,
  ogTitle: `About · ${IDENTITY.name}`,
  description: 'Principal Systems Architect, founder, artist, and polymath. 25+ years bridging cloud-first systems architecture, agentic AI, and sovereign digital infrastructure.',
  ogDescription: 'Principal Systems Architect, founder, artist, and polymath. 25+ years bridging cloud-first systems architecture, agentic AI, and sovereign digital infrastructure.',
})
</script>

<template>
  <div class="w-full flex flex-col py-8 gap-8">
    <MAboutHero />
    <MAboutBio />
    <MAboutPhilosophies />
    <MAboutPersonas />
    <MAboutMilestones />
    <MAboutSpecialties />
    <MAboutSkills />
    <MAboutManifesto />
  </div>
</template>

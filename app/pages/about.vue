<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'

useSeoMeta({
  title: `About · ${IDENTITY.name}`,
  ogTitle: `About · ${IDENTITY.name}`,
  description: 'Principal operations and systems advisor. 25+ years diagnosing operational bottlenecks and redesigning workflows, including $1.2M a year in waste removed at a financial firm.',
  ogDescription: 'Principal operations and systems advisor. 25+ years diagnosing operational bottlenecks and redesigning workflows, including $1.2M a year in waste removed at a financial firm.',
})
</script>

<template>
  <div class="w-full flex flex-col py-8 gap-8">
    <MAboutHero />
    <MAboutBio />
    <MAboutMilestones />
    <MAboutSpecialties />
    <MAboutPhilosophies />
    <MAboutSkills />
    <MAboutPersonas />
    <MAboutManifesto />
  </div>
</template>

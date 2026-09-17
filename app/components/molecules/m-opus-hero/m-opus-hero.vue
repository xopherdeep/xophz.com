<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
</script>

<template>
  <OPageHero
    title="Magnum Opus"
    badge-text="Hall of the Gods Ecosystem"
    badge-icon="i-lucide-crown"
    meta-text="12+ Sovereign Platforms"
    glow-primary="violet"
    glow-secondary="cyan"
    :primary-action="{
      label: 'Book Consultation',
      to: 'https://calendar.app.google/Y732Ak5gxuCMVoHo8',
      target: '_blank',
      color: 'primary',
      variant: 'solid',
      icon: 'i-lucide-calendar',
      class: 'shadow-glow-violet'
    }"
    :secondary-action="{
      label: 'Connect with XP',
      to: '/connect',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-arrow-right'
    }"
  >
    <template #description>
      The Hall of the Gods ecosystem. Infrastructure, services, and sovereign platforms built by
      <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Xopher (XP) Pollard</span> across
      <span class="text-cyan-600 dark:text-cyan-400 font-semibold">25+ years</span> of systems synthesis.
    </template>
  </OPageHero>
</template>

<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
</script>

<template>
  <OPageHero
    title="YouMeOS Spark Plugs"
    badge-text="Spatial OS Applications"
    badge-icon="i-lucide-sparkles"
    meta-text="50+ Sovereign Sparks"
    glow-primary="cyan"
    glow-secondary="violet"
    :primary-action="{
      label: 'Launch YouMeOS',
      to: 'https://www.youmeos.com',
      target: '_blank',
      color: 'primary',
      variant: 'solid',
      icon: 'i-lucide-play',
      class: 'shadow-glow-violet'
    }"
    :secondary-action="{
      label: 'Launch PWA Matrix',
      to: 'https://www.youmeos.com/spark/app-launcher/?fullspark=true',
      target: '_blank',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-arrow-up-right'
    }"
  >
    <template #description>
      Modular spatial micro-applications, retro arcade games, and system utilities. Run them inside the
      <span class="text-zinc-900 dark:text-zinc-100 font-semibold">YouMeOS Webtop</span> or open directly in
      <span class="text-cyan-600 dark:text-cyan-400 font-semibold">Standalone PWA Mode</span> to bypass desktop chrome.
    </template>
  </OPageHero>
</template>

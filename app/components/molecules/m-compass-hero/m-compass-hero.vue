<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'

defineProps<{
  purchasedSuccessMessage: string | null
}>()

defineEmits<{
  dismiss: []
}>()
</script>

<template>
  <OPageHero
    title="My Compass Software Suite"
    badge-text="The Software Suite & Advisory"
    badge-icon="i-lucide-compass"
    meta-text="40+ Sovereign Extensions"
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
      label: 'My Compass Consulting',
      to: 'https://www.mycompassconsulting.com',
      target: '_blank',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-arrow-up-right'
    }"
  >
    <template #alert v-if="purchasedSuccessMessage">
      <UAlert
        color="success"
        variant="subtle"
        icon="i-lucide-check-circle-2"
        :title="purchasedSuccessMessage"
        class="mb-6"
        :close-button="{ variant: 'ghost', color: 'success' }"
        @close="$emit('dismiss')"
      />
    </template>

    <template #description>
      The bridge connecting <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Xophz</span>,
      <span class="text-cyan-600 dark:text-cyan-400 font-semibold">My Compass Consulting</span>, and our sovereign plugin architecture.
    </template>
  </OPageHero>
</template>

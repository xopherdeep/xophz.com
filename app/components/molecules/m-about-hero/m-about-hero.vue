<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
import { useAboutHeroController } from './m-about-hero.controller'

const { profile, hasIdentity } = useAboutHeroController()
const { identity } = useProfileData()
</script>

<template>
  <section v-if="hasIdentity" class="m-about-hero py-6">
    <UContainer class="max-w-[1100px] w-full">
      <OPageHero
        :title="profile.name"
        :subtitle="profile.title"
        :avatar="profile.headshot"
        :avatar-alt="profile.name"
        badge-text="Principal Systems Synthesist"
        :meta-text="profile.location"
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
          label: 'Executive Resume',
          to: '/resume',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'i-lucide-arrow-right'
        }"
      >
        <template #meta>
          <span class="flex items-center gap-1 text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-500">
            <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-cyan-400" />
            {{ profile.location }}
          </span>
        </template>

        <template #description>
          {{ identity.tagline }}
        </template>
      </OPageHero>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-hero';
</style>

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
        center-mobile
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
        <template #avatar>
          <div
            class="relative p-[3px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite] shrink-0 shadow-2xl mx-auto md:mx-0"
            v-motion="{ initial: { opacity: 0, scale: 0.85 }, enter: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } } }"
          >
            <div class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-zinc-950 border-[3px] border-zinc-900 overflow-hidden flex items-center justify-center">
              <img
                :src="profile.headshot"
                :alt="profile.name"
                class="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </template>

        <template #meta>
          <span class="flex items-center justify-center md:justify-start gap-1 text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-500">
            <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-cyan-400" />
            {{ profile.location }}
          </span>
        </template>

        <template #subtitle>
          <p class="text-sm sm:text-base font-semibold text-violet-600 dark:text-violet-400 mt-1 text-center md:text-left">
            {{ profile.title }}
          </p>
        </template>

        <template #description>
          <p class="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mt-2 text-center md:text-left">
            {{ identity.tagline }}
          </p>
        </template>
      </OPageHero>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-hero';
</style>

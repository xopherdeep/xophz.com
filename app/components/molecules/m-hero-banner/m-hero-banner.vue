<script setup lang="ts">
import { IDENTITY } from '~/constants/identity'
import { useHeroBannerController } from './m-hero-banner.controller'

const { profile, canDisplayHero, bookingUrl } = useHeroBannerController()
</script>

<template>
  <section
    v-if="canDisplayHero"
    class="m-hero-banner relative pt-12 md:pt-16 pb-6 md:pb-10 overflow-hidden"
  >
    <div
      class="m-hero-banner__mesh"
      aria-hidden="true"
    />
    <UContainer class="max-w-4xl relative z-10">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-14 text-center md:text-left">
        <div class="xo-avatar-glow shrink-0 animate-ios-spring">
          <UAvatar
            :src="profile.avatar"
            :alt="profile.name"
            size="3xl"
            class="ring-2 ring-violet-500/20 shadow-xl w-32 h-32 md:w-40 md:h-40"
          />
        </div>

        <div class="m-hero-banner__stagger flex-1 flex flex-col gap-4">
          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <UBadge
              v-for="tag in profile.tags"
              :key="tag"
              color="primary"
              variant="subtle"
              size="sm"
            >
              {{ tag }}
            </UBadge>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display xo-gradient-text leading-[1.1]">
            {{ profile.name }}
          </h1>

          <p class="-mt-3 text-sm text-zinc-500 dark:text-zinc-400 font-body">
            Call me {{ IDENTITY.nickname }}
          </p>

          <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-body">
            {{ profile.tagline }}
          </p>

          <!-- Concrete credibility: a real origin beats an unsourced metric. -->
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-body">
            {{ profile.origin }}
          </p>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <UButton
              :to="bookingUrl"
              target="_blank"
              icon="i-lucide-calendar"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-glow-violet"
              aria-label="Book a call"
            >
              Book a call
            </UButton>
            <UButton
              to="/resume"
              icon="i-lucide-file-badge"
              color="neutral"
              variant="outline"
              size="lg"
              aria-label="View executive resume"
            >
              Executive resume
            </UButton>
          </div>

          <p class="text-xs text-zinc-500 dark:text-zinc-400 font-body">
            {{ IDENTITY.location }} · Remote · Open for engagements
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-hero-banner';
</style>

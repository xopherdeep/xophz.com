<script setup lang="ts">
import { useHeroBannerController } from './m-hero-banner.controller'

const { profile, canDisplayHero } = useHeroBannerController()
</script>

<template>
  <section v-if="canDisplayHero" class="m-hero-banner relative py-16 md:py-28 overflow-hidden">
    <!-- Gradient mesh background -->
    <div class="m-hero-banner__mesh" aria-hidden="true" />

    <UContainer class="max-w-4xl relative z-10">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-14 text-center md:text-left">
        <!-- Animated Avatar -->
        <div
          class="xo-avatar-glow shrink-0"
          v-motion="{ initial: { opacity: 0, scale: 0.8 }, enter: { opacity: 1, scale: 1, transition: { duration: 500, type: 'spring', stiffness: 200 } } }"
        >
          <UAvatar
            :src="profile.avatar"
            :alt="profile.name"
            size="3xl"
            class="ring-2 ring-violet-500/20 shadow-xl w-32 h-32 md:w-40 md:h-40"
          />
        </div>

        <div class="flex-1 flex flex-col gap-5">
          <!-- Skill Tags -->
          <div
            class="flex flex-wrap justify-center md:justify-start gap-2"
            v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: 150 } } }"
          >
            <UBadge
              v-for="tag in profile.skillTags"
              :key="tag"
              color="primary"
              variant="subtle"
              size="sm"
            >
              {{ tag }}
            </UBadge>
          </div>

          <!-- Name -->
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display xo-gradient-text leading-[1.1]"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 250 } } }"
          >
            {{ profile.name }}
          </h1>

          <!-- Tagline -->
          <p
            class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-body"
            v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 350 } } }"
          >
            {{ profile.tagline }}
          </p>

          <!-- CTAs -->
          <div
            class="flex flex-wrap justify-center md:justify-start gap-3 pt-2"
            v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 450 } } }"
          >
            <UButton
              to="/about"
              icon="i-lucide-user"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-glow-violet"
            >
              Explore Profile
            </UButton>
            <UButton
              to="/projects"
              icon="i-lucide-briefcase"
              color="neutral"
              variant="outline"
              size="lg"
            >
              View Projects
            </UButton>
            <UButton
              to="/resume"
              icon="i-lucide-file-badge"
              color="neutral"
              variant="ghost"
              size="lg"
            >
              Resume
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-hero-banner';
</style>

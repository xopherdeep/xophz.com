<script setup lang="ts">
import { useHeroBannerController } from './m-hero-banner.controller'

const { profile, canDisplayHero } = useHeroBannerController()
</script>

<template>
  <section
    v-if="canDisplayHero"
    class="m-hero-banner relative pt-12 md:pt-16 pb-6 md:pb-10 overflow-hidden"
  >
    <!-- Gradient mesh background -->
    <div
      class="m-hero-banner__mesh"
      aria-hidden="true"
    />

    <UContainer class="max-w-4xl relative z-10">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-14 text-center md:text-left">
        <!-- Animated Avatar -->
        <div class="xo-avatar-glow shrink-0 animate-ios-spring">
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
            class="flex flex-wrap justify-center md:justify-start gap-2 animate-ios-spring"
            :style="{ animationDelay: '40ms' }"
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
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display xo-gradient-text leading-[1.1] animate-ios-spring"
            :style="{ animationDelay: '80ms' }"
          >
            {{ profile.name }}
          </h1>

          <!-- Tagline -->
          <p
            class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-body animate-ios-spring"
            :style="{ animationDelay: '120ms' }"
          >
            {{ profile.tagline }}
          </p>

          <!-- CTAs -->
          <div
            class="flex flex-wrap justify-center md:justify-start gap-3 pt-2 animate-ios-spring"
            :style="{ animationDelay: '160ms' }"
          >
            <UButton
              to="/about"
              icon="i-lucide-user"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-glow-violet"
              aria-label="About Xopher Pollard"
            >
              About Me
            </UButton>
            <UButton
              to="/projects"
              icon="i-lucide-briefcase"
              color="neutral"
              variant="outline"
              size="lg"
              aria-label="View Magnum Opus Projects"
            >
              My Magnum Opus
            </UButton>
            <UButton
              to="/resume"
              icon="i-lucide-file-badge"
              color="neutral"
              variant="ghost"
              size="lg"
              aria-label="View Executive Resume"
            >
              Resume
            </UButton>
            <UButton
              to="/connect"
              icon="i-lucide-mail"
              color="neutral"
              variant="ghost"
              size="lg"
              aria-label="Connect with Xopher"
            >
              Connect with Me
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

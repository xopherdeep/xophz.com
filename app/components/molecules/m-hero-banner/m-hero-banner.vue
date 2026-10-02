<script setup lang="ts">
import { useHeroBannerController } from './m-hero-banner.controller'

const { profile, canDisplayHero, auditCommand, copied, copyAuditCommand } = useHeroBannerController()
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

        <div class="flex-1 flex flex-col gap-4">
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

          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display xo-gradient-text leading-[1.1] animate-ios-spring"
            :style="{ animationDelay: '80ms' }"
          >
            {{ profile.name }}
          </h1>
          <p
            class="-mt-3 text-sm text-zinc-500 dark:text-zinc-400 font-body animate-ios-spring"
            :style="{ animationDelay: '100ms' }"
          >
            Call me Xopher
          </p>

          <!-- Tagline -->
          <p
            class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-body animate-ios-spring"
            :style="{ animationDelay: '120ms' }"
          >
            {{ profile.tagline }}
          </p>

          <!-- Two-Tier CTAs -->
          <div
            class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 animate-ios-spring"
            :style="{ animationDelay: '160ms' }"
          >
            <UButton
              to="/work-with-me"
              icon="i-lucide-handshake"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-glow-violet"
              aria-label="Work with Xopher Pollard"
            >
              Work with me
            </UButton>
            <UButton
              to="/about"
              icon="i-lucide-user"
              color="neutral"
              variant="outline"
              size="lg"
              aria-label="About Xopher Pollard"
            >
              About Me
            </UButton>
            <UButton
              to="/projects"
              icon="i-lucide-briefcase"
              color="neutral"
              variant="ghost"
              size="lg"
              aria-label="View Magnum Opus Projects"
            >
              My Magnum Opus
            </UButton>
            <UButton
              to="/resume"
              icon="i-lucide-file-badge"
              color="neutral"
              variant="outline"
              size="lg"
              aria-label="View Executive Resume"
            >
              Executive Resume
            </UButton>
            <UButton
              to="/projects"
              icon="i-lucide-briefcase"
              color="neutral"
              variant="ghost"
              size="lg"
              aria-label="View Selected Works"
            >
              Selected Works
            </UButton>
          </div>
          <!-- Interactive Terminal Proof Hook -->
          <div
            class="flex flex-col sm:flex-row items-center md:items-start gap-2 pt-1 animate-ios-spring"
            :style="{ animationDelay: '200ms' }"
          >
            <button
              type="button"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 dark:bg-white/[0.06] border border-zinc-800 dark:border-white/[0.1] text-xs font-mono text-zinc-300 dark:text-zinc-200 hover:border-violet-500/60 transition-all cursor-pointer group shadow-sm"
              :aria-label="'Copy command: ' + auditCommand"
              @click="copyAuditCommand"
            >
              <span class="text-violet-400 font-bold">$</span>
              <span>{{ auditCommand }}</span>
              <span
                class="inline-flex items-center gap-1 text-[0.68rem] px-1.5 py-0.5 rounded-md font-sans transition-colors"
                :class="copied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-zinc-400 group-hover:text-zinc-200'"
              >
                <UIcon
                  :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                  class="w-3 h-3"
                />
                {{ copied ? 'Copied' : 'Copy' }}
              </span>
            </button>
            <span class="text-[0.72rem] text-zinc-600 dark:text-zinc-400 self-center">
              Audit any repo for deterministic AI-readiness.
            </span>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
<style scoped lang="scss">
  @use './m-hero-banner';
</style>

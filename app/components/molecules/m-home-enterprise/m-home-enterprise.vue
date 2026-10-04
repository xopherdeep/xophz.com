<script setup lang="ts">
import { useHomeEnterpriseController } from './m-home-enterprise.controller'

const { platforms, hasPlatforms } = useHomeEnterpriseController()
</script>

<template>
  <section
    v-if="hasPlatforms"
    class="m-home-enterprise pb-12 md:pb-16"
    aria-labelledby="home-enterprise-heading"
  >
    <UContainer class="max-w-5xl">
      <div
        class="m-home-enterprise__panel xo-card-glow rounded-3xl p-7 sm:p-9 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-5 animate-ios-spring"
      >
        <div class="flex flex-col gap-2">
          <UBadge
            color="primary"
            variant="subtle"
            size="sm"
            class="self-start"
          >
            The other half of the job
          </UBadge>
          <h2
            id="home-enterprise-heading"
            class="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"
          >
            I also architect large systems for a living
          </h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-body max-w-2xl">
            Alongside local work, I spend my days on distributed platforms, cloud architecture, and
            deterministic AI tooling. If you need an architect rather than a repair, start here.
          </p>
        </div>

        <ul class="flex flex-wrap gap-x-5 gap-y-2.5">
          <li
            v-for="platform in platforms"
            :key="platform.key"
          >
            <a
              :href="platform.url"
              target="_blank"
              rel="noopener noreferrer"
              class="m-home-enterprise__link inline-flex items-center gap-2 text-sm font-body"
              :style="{ '--platform-color': platform.color }"
            >
              <span
                class="m-home-enterprise__dot w-2 h-2 rounded-full shrink-0"
                aria-hidden="true"
              />
              <span class="m-home-enterprise__name font-semibold text-zinc-800 dark:text-zinc-200 transition-colors">
                {{ platform.name }}
              </span>
            </a>
          </li>
        </ul>

        <MAuditCommand hint="Audit any repo for deterministic AI-readiness." />

        <div class="flex flex-wrap items-center gap-3 pt-1">
          <UButton
            to="/resume"
            icon="i-lucide-file-badge"
            color="neutral"
            variant="outline"
            size="md"
          >
            Executive resume
          </UButton>
          <UButton
            to="/projects"
            icon="i-lucide-briefcase"
            color="neutral"
            variant="ghost"
            size="md"
            trailing-icon="i-lucide-arrow-right"
          >
            All projects
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-home-enterprise';
</style>

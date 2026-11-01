<script setup lang="ts">
import { useAboutBioController } from './m-about-bio.controller'

const { bioTitle, hasBio } = useAboutBioController()
</script>

<template>
  <section
    v-if="hasBio"
    class="m-about-bio py-2"
  >
    <UContainer class="max-w-[1100px] w-full">
      <div
        class="xo-card-glow rounded-2xl p-6 sm:p-8 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-4"
        v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }"
      >
        <div class="flex items-center gap-2 text-violet-600 dark:text-violet-400">
          <UIcon
            name="i-lucide-terminal"
            class="w-4 h-4"
          />
          <h2 class="font-display text-sm font-bold tracking-[0.12em] uppercase">
            {{ bioTitle }}
          </h2>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <li class="rounded-xl p-4 bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06]">
            <span class="block font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50">$1.2M / yr</span>
            <span class="text-sm text-zinc-600 dark:text-zinc-400">operational waste removed at J.D. Mellberg Financial</span>
          </li>
          <li class="rounded-xl p-4 bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06]">
            <span class="block font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50">75%</span>
            <span class="text-sm text-zinc-600 dark:text-zinc-400">less ongoing maintenance overhead for client platforms</span>
          </li>
          <li class="rounded-xl p-4 bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06]">
            <span class="block font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50">25+ yrs</span>
            <span class="text-sm text-zinc-600 dark:text-zinc-400">working across product, engineering, and client teams</span>
          </li>
        </ul>

        <p class="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          I look at operations that leak money and time, find the structural bottleneck, and design the fix across
          people, process, and systems. At J.D. Mellberg Financial that meant pulling Five9 telephony, Salesforce CRM,
          and marketing data into one real-time operations view and automating the lead validation that was burning
          spend. As principal at <strong>My Compass Consulting</strong>, I audit client operations and platforms,
          modernize what is slowing them down, and explain the plan in plain English before any work starts.
        </p>

        <p class="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Lately that work includes AI readiness: I wrote <em>Chemical X</em>, an auditing standard that scores how
          safely a team can bring AI tools into its workflow. Outside of client work I make music, art, and side
          projects, which you can find further down this page.
        </p>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-about-bio';
</style>

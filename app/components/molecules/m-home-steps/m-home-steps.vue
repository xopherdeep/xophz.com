<script setup lang="ts">
import { useHomeStepsController } from './m-home-steps.controller'

const { steps, hasSteps } = useHomeStepsController()
</script>

<template>
  <section
    v-if="hasSteps"
    class="m-home-steps pb-12 md:pb-16"
    aria-labelledby="home-steps-heading"
  >
    <UContainer class="max-w-5xl">
      <h2
        id="home-steps-heading"
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-8 text-center md:text-left animate-ios-spring"
      >
        How it works
      </h2>

      <ol class="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-5">
        <li
          v-for="(step, idx) in steps"
          :key="step.title"
          class="m-home-steps__item flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center animate-ios-spring"
          :style="{ animationDelay: `${220 + idx * 45}ms` }"
        >
          <span
            class="m-home-steps__num w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm"
            aria-hidden="true"
          >
            {{ idx + 1 }}
          </span>

          <div class="flex flex-col gap-1">
            <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
              {{ step.title }}
            </h3>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-body">
              {{ step.desc }}
            </p>
          </div>
        </li>
      </ol>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-home-steps';
</style>

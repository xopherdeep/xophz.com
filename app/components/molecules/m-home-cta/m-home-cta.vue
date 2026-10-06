<script setup lang="ts">
import { useHomeCtaController } from './m-home-cta.controller'

const { bookingUrl, emailUrl, canDisplay } = useHomeCtaController()
</script>

<template>
  <section
    v-if="canDisplay"
    class="m-home-cta pt-4 pb-16 md:pb-24"
  >
    <UContainer class="max-w-4xl">
      <div
        class="m-home-cta__card xo-card-glow rounded-3xl p-8 sm:p-12 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-2xl text-center relative overflow-hidden animate-ios-spring"
      >
        <div
          class="m-home-cta__wash absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />

        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <UBadge
            color="primary"
            variant="subtle"
            size="sm"
          >
            Open for engagements
          </UBadge>

          <h2 class="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            Need someone to own the technical direction?
          </h2>

          <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-body max-w-xl">
            Thirty minutes, no charge, and a straight answer about whether I'm the right fit.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <UButton
              :to="bookingUrl"
              target="_blank"
              icon="i-lucide-calendar"
              color="primary"
              variant="solid"
              size="lg"
              class="shadow-glow-violet font-semibold"
              aria-label="Book a call"
            >
              Book a call
            </UButton>
            <UButton
              :to="emailUrl"
              icon="i-lucide-mail"
              color="neutral"
              variant="outline"
              size="lg"
              aria-label="Email me"
            >
              Email me
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-home-cta';
</style>

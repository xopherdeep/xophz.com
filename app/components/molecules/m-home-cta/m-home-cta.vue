<script setup lang="ts">
import { useHomeCtaController } from './m-home-cta.controller'

const { bookingUrl, canDisplay } = useHomeCtaController()
</script>

<template>
  <section v-if="canDisplay" class="m-home-cta pt-4 pb-16 md:pb-24">
    <UContainer class="max-w-4xl">
      <div
        class="m-home-cta__card xo-card-glow rounded-3xl p-8 sm:p-12 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-2xl text-center relative overflow-hidden animate-ios-spring"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.18),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <UBadge color="primary" variant="subtle" size="sm">
            Advisory &amp; Architecture
          </UBadge>

          <h2 class="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            Architecting Durable Platforms &amp; Deterministic AI Systems
          </h2>

          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-body max-w-xl">
            Available for fractional CTO leadership, enterprise architecture audits, and deterministic AI/agentic tooling implementations.
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
              aria-label="Schedule 30-Minute Architecture Review"
            >
              Book Consultation
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
              to="/connect"
              icon="i-lucide-mail"
              color="neutral"
              variant="ghost"
              size="lg"
              aria-label="Direct Inquiries"
            >
              Direct Inquiries
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

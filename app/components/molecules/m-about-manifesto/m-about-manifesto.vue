<script setup lang="ts">
import { useAboutManifestoController } from './m-about-manifesto.controller'

const { manifesto, hasManifesto } = useAboutManifestoController()
</script>

<template>
  <section v-if="hasManifesto" class="m-about-manifesto py-8">
    <UContainer class="max-w-[1100px] w-full">
      <div
        class="relative flex flex-col items-center gap-6 p-8 md:p-12 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-2xl text-center xo-card-glow overflow-hidden"
        v-motion="{ initial: { opacity: 0, scale: 0.98 }, enter: { opacity: 1, scale: 1, transition: { delay: 200 } } }"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none"
        />

        <div class="max-w-[680px] flex flex-col gap-3 relative z-10">
          <p class="text-xs font-bold tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400">
            {{ manifesto.title }}
          </p>
          <blockquote class="font-display text-base md:text-xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed italic">
            "{{ manifesto.quote }}"
          </blockquote>
          <p class="text-xs text-cyan-500 font-semibold mt-1">
            {{ manifesto.author }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3.5 w-full max-w-[560px] relative z-10 mt-2">
          <UButton
            to="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
            target="_blank"
            color="primary"
            variant="solid"
            size="md"
            icon="i-lucide-calendar"
            class="flex-1 justify-center shadow-glow-violet"
          >
            Book a Meeting
          </UButton>

          <UButton
            to="/resume"
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-file-badge"
            class="flex-1 justify-center"
          >
            Executive Resume
          </UButton>

          <UButton
            to="/projects"
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-briefcase"
            class="flex-1 justify-center"
          >
            Magnum Opus
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-manifesto';
</style>

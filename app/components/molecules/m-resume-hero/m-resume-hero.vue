<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
import { useResumeHeroController } from './m-resume-hero.controller'

const {
  identity,
  contactLinks,
  hasHero
} = useResumeHeroController()
</script>

<template>
  <div v-if="hasHero" class="m-resume-hero w-full">
    <OPageHero
      :title="identity.name"
      :subtitle="identity.role"
      badge-text="Executive Curriculum Vitae"
      badge-icon="i-lucide-file-badge"
      meta-text="25+ Years Production Architecture"
      glow-primary="violet"
      glow-secondary="cyan"
    >
      <template #description>
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-y-2.5 gap-x-5 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          <component
            v-for="item in contactLinks"
            :key="item.label"
            :is="item.href ? 'a' : 'span'"
            :href="item.href"
            :target="item.isExternal ? '_blank' : undefined"
            :rel="item.isExternal ? 'noopener noreferrer' : undefined"
            class="flex items-center gap-1.5 no-underline transition-colors"
            :class="item.href ? 'hover:text-zinc-900 dark:hover:text-zinc-100' : ''"
          >
            <UIcon :name="item.icon" class="w-3.5 h-3.5 text-violet-500 shrink-0" />
            <span>{{ item.label }}</span>
          </component>
        </div>
      </template>

      <template #actions>
        <div class="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 print:hidden w-full md:w-auto">
          <UButton
            to="/xp_pollard_resume.pdf"
            external
            download="Xopher_Pollard_Resume.pdf"
            icon="i-lucide-download"
            color="primary"
            variant="solid"
            size="sm"
            class="shadow-glow-violet justify-center"
          >
            Download Resume
          </UButton>
          <UButton
            to="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
            target="_blank"
            icon="i-lucide-calendar"
            color="neutral"
            variant="ghost"
            size="sm"
            class="justify-center"
          >
            Schedule Call
          </UButton>
        </div>
      </template>
    </OPageHero>
  </div>
</template>

<style scoped lang="scss">
@use './m-resume-hero';
</style>

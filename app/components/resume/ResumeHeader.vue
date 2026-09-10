<script setup lang="ts">
import {
  Download as LucideDownload,
  Printer as LucidePrinter,
  Calendar as LucideCalendar,
  Mail as LucideMail,
  MapPin as LucideMapPin,
  Phone as LucidePhone,
  Globe as LucideGlobe
} from '@lucide/vue'
import IconGithub from '~/components/IconGithub.vue'
import IconLinkedin from '~/components/IconLinkedin.vue'

const handlePrint = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <UCard variant="outline" class="flex flex-col gap-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <UBadge color="primary" variant="subtle" size="xs">
            Executive Curriculum Vitae
          </UBadge>
          <span class="text-[0.62rem] font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
            25+ Years Production Architecture
          </span>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
          Xopher "XP" Pollard
        </h1>
        <p class="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase mt-2">
          Principal Systems Architect &amp; Systems Synthesist
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap items-center gap-2.5 print:hidden">
        <UButton
          to="/xp_pollard_resume.pdf"
          download="Xopher_Pollard_Resume.pdf"
          icon="i-lucide-download"
          color="primary"
          variant="solid"
          size="sm"
        >
          Download PDF
        </UButton>
        <UButton
          type="button"
          icon="i-lucide-printer"
          color="neutral"
          variant="outline"
          size="sm"
          @click="handlePrint"
        >
          Print / Save PDF
        </UButton>
        <UButton
          to="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
          target="_blank"
          icon="i-lucide-calendar"
          color="neutral"
          variant="ghost"
          size="sm"
        >
          Schedule Call
        </UButton>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-5 text-xs text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-1.5">
          <LucideMapPin class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>Tucson, AZ (Sonoran Desert / Global)</span>
        </div>
        <a href="tel:520-762-4947" class="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline">
          <LucidePhone class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>520-762-4947</span>
        </a>
        <a href="mailto:hello@xophz.com" class="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline">
          <LucideMail class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>hello@xophz.com</span>
        </a>
        <a href="https://linkedin.com/in/xophz" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline">
          <IconLinkedin class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>linkedin.com/in/xophz</span>
        </a>
        <a href="https://github.com/xopherdeep" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline">
          <IconGithub class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>github.com/xopherdeep</span>
        </a>
        <a href="https://xophz.com" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline">
          <LucideGlobe class="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span>xophz.com</span>
        </a>
      </div>
    </template>
  </UCard>
</template>

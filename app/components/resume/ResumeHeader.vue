<script setup lang="ts">
import {
  Download as LucideDownload,
  Printer as LucidePrinter,
  Calendar as LucideCalendar,
  Mail as LucideMail,
  MapPin as LucideMapPin,
  Phone as LucidePhone,
  Globe as LucideGlobe
} from 'lucide-vue-next'
import IconGithub from '~/components/IconGithub.vue'
import IconLinkedin from '~/components/IconLinkedin.vue'

const handlePrint = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <header class="flex flex-col gap-6 p-6 sm:p-8 bg-white/5 border border-white/[0.08] rounded-2xl backdrop-blur-2xl shadow-glass-shadow">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
            Executive Curriculum Vitae
          </span>
          <span class="text-[0.62rem] font-semibold tracking-[0.12em] uppercase text-text-muted">
            25+ Years Production Architecture
          </span>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-[-0.03em] leading-none">
          Xopher "XP" Pollard
        </h1>
        <p class="text-sm sm:text-base text-accent-2 font-semibold tracking-[0.04em] uppercase mt-2">
          Principal Systems Architect &amp; Systems Synthesist
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap items-center gap-2.5 print:hidden">
        <a
          href="/xp_pollard_resume.pdf"
          download="Xopher_Pollard_Resume.pdf"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-[0.02em] bg-gradient-hero text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(139,92,246,0.5)] no-underline cursor-pointer"
        >
          <LucideDownload class="w-3.5 h-3.5" />
          Download PDF
        </a>
        <button
          type="button"
          @click="handlePrint"
          class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-[0.02em] bg-white/5 border border-white/[0.1] text-text-secondary transition-all duration-200 hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:-translate-y-0.5 cursor-pointer"
        >
          <LucidePrinter class="w-3.5 h-3.5 text-accent" />
          Print / Save PDF
        </button>
        <a
          href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-[0.02em] bg-white/5 border border-white/[0.1] text-text-secondary transition-all duration-200 hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:-translate-y-0.5 no-underline cursor-pointer"
        >
          <LucideCalendar class="w-3.5 h-3.5 text-accent" />
          Schedule Call
        </a>
      </div>
    </div>

    <!-- Contact & Meta row -->
    <div class="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-y-2.5 gap-x-5 text-xs text-text-muted">
      <div class="flex items-center gap-1.5">
        <LucideMapPin class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>Tucson, AZ (Sonoran Desert · Global)</span>
      </div>
      <a href="tel:520-762-4947" class="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors no-underline">
        <LucidePhone class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>520-762-4947</span>
      </a>
      <a href="mailto:hello@xophz.com" class="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors no-underline">
        <LucideMail class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>hello@xophz.com</span>
      </a>
      <a href="https://linkedin.com/in/xophz" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors no-underline">
        <IconLinkedin class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>linkedin.com/in/xophz</span>
      </a>
      <a href="https://github.com/xopherdeep" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors no-underline">
        <IconGithub class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>github.com/xopherdeep</span>
      </a>
      <a href="https://xophz.com" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors no-underline">
        <LucideGlobe class="w-3.5 h-3.5 text-accent shrink-0" />
        <span>xophz.com</span>
      </a>
    </div>
  </header>
</template>

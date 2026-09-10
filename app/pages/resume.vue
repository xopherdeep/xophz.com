<script setup lang="ts">
import {
  Terminal as LucideTerminal,
  Cpu as LucideCpu,
  Layers as LucideLayers,
  Briefcase as LucideBriefcase,
  Award as LucideAward,
} from '@lucide/vue'
import ResumeHeader from '~/components/resume/ResumeHeader.vue'
import ResumeSection from '~/components/resume/ResumeSection.vue'
import ResumeItem from '~/components/resume/ResumeItem.vue'
import ResumeAppsGrid from '~/components/resume/ResumeAppsGrid.vue'
import { useResumeData } from '~/composables/useResumeData'

useSeoMeta({
  title: 'Resume · Xopher "XP" Pollard',
  description: 'Principal Systems Architect and Systems Synthesist with 25+ years experience in distributed cloud systems, sovereign infrastructure, and spatial web platforms.',
})

const { competencies, flagshipApps, experience } = useResumeData()
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative resume-page py-8">
    <UContainer class="max-w-4xl flex flex-col gap-8 print:p-0 print:max-w-none">
      
      <!-- Resume Header -->
      <ResumeHeader />

      <!-- Executive Profile Section -->
      <ResumeSection title="Executive Profile" :icon="LucideTerminal" badge="25+ Years Experience">
        <p class="text-xs sm:text-[0.84rem] leading-relaxed text-zinc-600 dark:text-zinc-300 text-justify">
          A results-driven Principal Systems Architect and Practice Lead with over 25 years of experience designing, modernizing, and orchestrating mission-critical distributed infrastructure. Proven track record deploying automated, multi-tenant cloud and edge networks supporting 25+ production platforms processing 160,000+ aggregate monthly requests with 99.99% availability. Deep technical authority across Kubernetes, Infrastructure as Code (Terraform), event-driven streaming pipelines, sovereign protocol design (w4 Protocol), and modern browser-based spatial rendering engines (WebGPU). Adept at leading cross-functional engineering teams, eliminating technical debt, and translating ambiguous business and scientific requirements into durable, self-healing platforms.
        </p>
      </ResumeSection>

      <!-- Core Architecture Competencies -->
      <ResumeSection title="Core Architecture &amp; Engineering Competencies" :icon="LucideCpu">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="(c, idx) in competencies"
            :key="c.group"
            class="flex flex-col gap-1.5 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl animate-fade-up"
            :style="{ animationDelay: `${60 + idx * 40}ms` }"
          >
            <span class="text-xs font-bold text-violet-600 dark:text-violet-400">
              {{ c.group }}
            </span>
            <span class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {{ c.items }}
            </span>
          </div>
        </div>
      </ResumeSection>

      <!-- Flagship Applications & Sovereign Platforms -->
      <ResumeSection title="Flagship Applications &amp; Sovereign Platforms" :icon="LucideLayers" badge="Live Ecosystem">
        <ResumeAppsGrid :apps="flagshipApps" />
      </ResumeSection>

      <!-- Professional Experience -->
      <ResumeSection title="Professional Experience" :icon="LucideBriefcase">
        <div class="flex flex-col gap-5">
          <ResumeItem
            v-for="job in experience"
            :key="job.company + job.period"
            :role="job.role"
            :company="job.company"
            :location="job.location"
            :period="job.period"
            :bullets="job.bullets"
          />
        </div>
      </ResumeSection>

      <!-- Applied Academic Equivalency -->
      <ResumeSection title="Applied Academic Equivalency &amp; Verification" :icon="LucideAward">
        <p class="text-xs sm:text-[0.84rem] leading-relaxed text-zinc-600 dark:text-zinc-300">
          25+ years of self-directed technical mastery, production systems architecture, and distributed platform design meeting and exceeding formal academic requirements for an advanced degree in Computer Science. Consulting and corporate records verifiable via IRS filings, state corporate registries, and client delivery attestations.
        </p>
      </ResumeSection>

      <!-- Quick Download Card -->
      <div
        class="xo-gradient-border rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl print:hidden animate-fade-up"
      >
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p class="font-display text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Need a PDF copy for your executive team or ATS?
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Formatted to exact Letter specifications with high-contrast vector typography.
            </p>
          </div>
          <UButton
            to="/xp_pollard_resume.pdf"
            download="Xopher_Pollard_Resume.pdf"
            icon="i-lucide-download"
            color="primary"
            variant="solid"
            size="md"
            class="shadow-glow-violet shrink-0"
          >
            Download Resume PDF
          </UButton>
        </div>
      </div>

    </UContainer>
  </main>
</template>

<style>
@media print {
  body {
    background: #ffffff !important;
    color: #111111 !important;
  }
  header, nav, #hamburger-btn, .print\:hidden {
    display: none !important;
  }
  .resume-page {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>

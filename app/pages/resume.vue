<script setup lang="ts">
import {
  Terminal as LucideTerminal,
  Layers as LucideLayers,
  Briefcase as LucideBriefcase,
  Award as LucideAward,
  TrendingUp as LucideTrendingUp,
} from '@lucide/vue'
import ResumeHeader from '~/components/resume/ResumeHeader.vue'
import ResumeSection from '~/components/resume/ResumeSection.vue'
import ResumeItem from '~/components/resume/ResumeItem.vue'
import ResumeAppsGrid from '~/components/resume/ResumeAppsGrid.vue'
import { useResumeData } from '~/composables/useResumeData'
import { IDENTITY } from '~/constants/identity'

useSeoMeta({
  title: `Resume · ${IDENTITY.fullName}`,
  description: 'Principal operations and systems advisor with 25+ years diagnosing operational bottlenecks and redesigning workflows. $1.2M a year in waste removed, 75% less maintenance overhead.',
  ogTitle: `Resume · ${IDENTITY.fullName}`,
  ogDescription: 'Principal operations and systems advisor. $1.2M a year in operational waste removed, 75% less maintenance overhead, 25+ years of cross-functional delivery.',
})

const { outcomes, competencies, flagshipApps, experience } = useResumeData()
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative resume-page py-8">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-8 print:p-0 print:max-w-none">

      <!-- Resume Header -->
      <ResumeHeader />

      <!-- Executive Profile Section -->
      <ResumeSection
        title="Executive Summary"
        :icon="LucideTerminal"
        badge="25+ Yrs Operations &amp; Systems"
      >
        <p class="text-xs sm:text-[0.84rem] leading-relaxed text-zinc-600 dark:text-zinc-300 text-justify">
          Principal operations and systems advisor with 25+ years of finding where operations leak money and time and
          designing the fix across people, process, and systems. Removed an estimated $1.2M a year in operational waste
          at a financial firm by unifying telephony, CRM, and marketing data and automating lead validation. Cut client
          maintenance overhead by 75%. Leads cross-functional work between product, engineering, and client teams, and
          explains it in plain English. Currently advising on AI readiness: where AI tools fit a team's workflow and the
          guardrails they need.
        </p>
      </ResumeSection>

      <!-- Selected Outcomes -->
      <ResumeSection
        title="Selected Outcomes"
        :icon="LucideTrendingUp"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="(o, idx) in outcomes"
            :key="o.label"
            class="flex flex-col gap-1 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl animate-fade-up"
            :style="{ animationDelay: `${60 + idx * 40}ms` }"
          >
            <span class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">{{ o.metric }}</span>
            <span class="text-xs font-bold text-violet-600 dark:text-violet-400">{{ o.label }}</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{{ o.detail }}</span>
          </div>
        </div>
      </ResumeSection>

      <!-- Professional Experience -->
      <ResumeSection
        title="Professional Experience"
        :icon="LucideBriefcase"
      >
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

      <!-- Flagship Applications & Sovereign Platforms -->
      <ResumeSection
        title="Selected Platforms"
        :icon="LucideLayers"
      >
        <ResumeAppsGrid :apps="flagshipApps" />
      </ResumeSection>

      <!-- Education & Credentials -->
      <ResumeSection
        title="Education &amp; Credentials"
        :icon="LucideAward"
      >
        <p class="text-xs sm:text-[0.84rem] leading-relaxed text-zinc-600 dark:text-zinc-300">
          Self-taught; early industry apprentice. OEM Certified Support Specialist (Microsoft / Broadband Network
          Diagnostics). References available on request.
        </p>
      </ResumeSection>

      <!-- Technical Literacy Footnote -->
      <section aria-labelledby="tech-literacy" class="px-1">
        <h2 id="tech-literacy" class="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-zinc-500 dark:text-zinc-400 mb-1">
          Technical literacy
        </h2>
        <p class="text-[0.7rem] leading-relaxed text-zinc-500 dark:text-zinc-400">
          <template v-for="(c, idx) in competencies" :key="c.group">
            <strong class="font-semibold">{{ c.group }}:</strong> {{ c.items }}<span v-if="idx < competencies.length - 1"> </span>
          </template>
        </p>
      </section>

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
            :to="IDENTITY.resumePdfPath"
            external
            :download="IDENTITY.resumeFilename"
            icon="i-lucide-download"
            color="primary"
            variant="solid"
            size="md"
            class="shadow-glow-violet shrink-0"
          >
            Download Resume
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

    header,
    nav,
    #hamburger-btn,
    .print\:hidden {
      display: none !important;
    }

    .resume-page {
      padding: 0 !important;
      margin: 0 !important;
    }
  }
</style>

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
import { IDENTITY } from '~/constants/identity'

useSeoMeta({
  title: `Resume · ${IDENTITY.fullName}`,
  description: 'Principal Systems Architect and Systems Synthesist with 20+ years experience in distributed cloud systems, agentic AI architecture, and sovereign infrastructure.',
  ogTitle: `Resume · ${IDENTITY.fullName}`,
  ogDescription: 'Principal Systems Architect and Systems Synthesist. 20+ years experience designing high-throughput, agent-native platforms.',
})

const { competencies, flagshipApps, experience } = useResumeData()
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
        badge="20+ Yrs Tech &amp; Venture | 12+ Yrs Architecture"
      >
        <p class="text-xs sm:text-[0.84rem] leading-relaxed text-zinc-600 dark:text-zinc-300 text-justify">
          Principal software architect with 20+ years building web platforms and digital systems, including 12+ years in
          enterprise architecture. Experienced bridging frontend applications with distributed backend services,
          containerizing and deploying on AWS, and modernizing monolithic codebases. Currently focused on architecture
          audits and guardrails for teams adopting AI-assisted development, including MCP tooling and deterministic code
          generation.
        </p>
      </ResumeSection>

      <!-- Core Architecture Competencies -->
      <ResumeSection
        title="Core Architecture &amp; Engineering Competencies"
        :icon="LucideCpu"
      >
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
        title="Flagship Applications &amp; Sovereign Platforms"
        :icon="LucideLayers"
        badge="Live Ecosystem"
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

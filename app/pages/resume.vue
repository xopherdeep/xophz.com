<script setup lang="ts">
import {
  Terminal as LucideTerminal,
  Cpu as LucideCpu,
  Layers as LucideLayers,
  Briefcase as LucideBriefcase,
  Award as LucideAward,
  Download as LucideDownload
} from '@lucide/vue'
import ResumeHeader from '~/components/resume/ResumeHeader.vue'
import ResumeSection from '~/components/resume/ResumeSection.vue'
import ResumeItem from '~/components/resume/ResumeItem.vue'
import ResumeAppsGrid from '~/components/resume/ResumeAppsGrid.vue'

useSeoMeta({
  title: 'Resume · Xopher "XP" Pollard',
  description: 'Principal Systems Architect and Systems Synthesist with 25+ years experience in distributed cloud systems, sovereign infrastructure, and spatial web platforms.',
  ogTitle: 'Resume · Xopher "XP" Pollard',
  ogDescription: 'Principal Systems Architect and Systems Synthesist. 25+ years experience designing high-throughput, self-healing platforms.',
})

const competencies = [
  {
    group: 'Cloud-Native & Distributed Systems',
    items: 'Kubernetes, Docker, AWS (20+ core services), GCP, Terraform (IaC), Microservices, Multi-Tenancy, Zero-Trust Networking, Edge Caching, Sovereign Protocols (w4).'
  },
  {
    group: 'High-Throughput Data & Observability',
    items: 'Event-Driven Pipelines, Asynchronous Queuing, Telemetry Streaming, REST & GraphQL APIs, Prometheus, OpenTelemetry, SRE Runbooks, Distributed Caching.'
  },
  {
    group: 'Full-Stack, Graphics & Spatial Computing',
    items: 'TypeScript, Node.js, Python, C#, WebGPU & WebGL Shaders, Vue 3 & Nuxt, React & Next.js, Linux Internals, Distributed State Orchestration.'
  },
  {
    group: 'Agentic Systems & Architecture',
    items: 'Disciplined Atomic Design (Atoms, Molecules, Organisms), Context-Isolated AI Agent Workflows, Prompt Architecture, Automated Self-Healing Runtimes.'
  }
]

const flagshipApps = [
  {
    name: 'YouMeOS',
    category: 'Spatial Operating System',
    tagline: 'Vue 3 + WebGPU Spatial Web OS',
    desc: 'Browser-based spatial computing operating system leveraging custom WebGPU pipelines (HeliOS, NexOS, NoOSphere) for dense volumetric 3D information spaces with steady frame rates.',
    url: 'https://www.youmeos.com',
    color: '#a78bfa'
  },
  {
    name: 'COMPASS Platform & Sparks',
    category: 'Application Engine',
    tagline: 'Bespoke Personal Software Platform',
    desc: 'Bespoke internal application ecosystem and synchronized tool suite (CRM, quest logs, newsroom, telemetry) built on rigid Atomic Design with offline-first zero latency.',
    url: 'https://planner.mycompassconsulting.com',
    color: '#06b6d4'
  },
  {
    name: 'BlackBOX & w4 Protocol',
    category: 'Sovereign Infrastructure',
    tagline: 'Self-Healing Sovereign Server Nodes',
    desc: 'Proprietary sovereign infrastructure nodes featuring automated self-healing runtimes, multi-tenant container orchestration, and w4 Hyper-cube networking protocol.',
    url: 'https://www.buildablox.com',
    color: '#10b981'
  },
  {
    name: 'MRO Planner Wizard',
    category: 'Workflow Ecosystem',
    tagline: 'Enterprise Daily Planning & Onboarding',
    desc: 'Digital planning and onboarding ecosystem engineered to bring structural integrity, automated clarity, and rigid validation to mission-critical daily workflows.',
    url: 'https://planner.mycompassconsulting.com',
    color: '#0ea5e9'
  },
  {
    name: 'Do It For The XP & GlowitheFlow',
    category: 'Gamification & Flow',
    tagline: 'Productivity Mechanics & Creator Economics',
    desc: 'Gamified progression engines translating real grinds into rewarding RPG mechanics, paired with flow-economy creator networks using mutual promotion economics.',
    url: 'https://doit.forthexp.com',
    color: '#f59e0b'
  }
]

const experience = [
  {
    role: 'Managing Practice Lead & Principal Architect',
    company: 'Hall of the Gods, Inc. / My Compass Consulting',
    location: 'Tucson, AZ',
    period: '12/2004 - Present',
    bullets: [
      {
        title: 'Federated Network Operations',
        detail: 'Architected, deployed, and manage multi-tenant edge infrastructure spanning 25+ active production web platforms and utilities, routing 160,000+ monthly requests with automated edge caching and 99.99% uptime.'
      },
      {
        title: 'Sovereign Systems & Platform Engineering',
        detail: 'Designed and delivered scalable, containerized client platforms and workflow engines (including BlackBOX self-healing nodes and developer utilities), reducing ongoing maintenance overhead by 80%.'
      },
      {
        title: 'B2B Systems Advisory',
        detail: 'Directed technical infrastructure engagements for commercial and enterprise clients, conducting full-stack architecture audits, resolving DNS and database bottlenecks, and migrating fragmented on-prem setups into secure cloud environments.'
      },
      {
        title: 'Next-Gen Spatial Computing',
        detail: 'Engineered browser-based spatial operating system prototypes (YouMeOS), stress-testing WebGPU rendering pipelines and complex state coordination for dense volumetric information spaces.'
      }
    ]
  },
  {
    role: 'Principal Systems Architect & Cloud Modernization Lead',
    company: 'Vi',
    location: 'Remote',
    period: '12/2021 - 01/2026',
    bullets: [
      {
        title: 'Cloud Modernization',
        detail: 'Spearheaded enterprise transition from monolithic legacy systems to containerized cloud-native platforms on AWS and Kubernetes, sustaining continuous 99.99% availability without operational disruption.'
      },
      {
        title: 'Observability & Reliability',
        detail: 'Built automated SRE monitoring frameworks and APM telemetry pipelines, cutting incident mean-time-to-resolution (MTTR) by 45% and establishing strict on-call operational runbooks.'
      },
      {
        title: 'DevSecOps Standard',
        detail: 'Implemented multi-repository CI/CD automation and modular Terraform IaC frameworks, accelerating feature delivery velocity while enforcing rigid compliance and security boundaries.'
      }
    ]
  },
  {
    role: 'Senior Software Architect (Data-Intensive Systems)',
    company: 'J.D. Mellberg Financial / Tracking First',
    location: 'Tucson, AZ',
    period: '08/2015 - 10/2019',
    bullets: [
      {
        title: 'High-Throughput Ingestion',
        detail: 'Architected enterprise telemetry pipelines and distributed document databases, parsing and validating millions of transaction records in real time with near-zero latency and strict auditability.'
      },
      {
        title: 'Operational Cost Reduction',
        detail: 'Engineered dynamic analytics transparency layers and automated data validation services, eliminating processing redundancies and saving an estimated $1.2M in annual operational waste.'
      }
    ]
  }
]
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative resume-page">
    <div class="w-full max-w-[920px] px-4 pt-[75px] pb-[100px] flex flex-col gap-6 print:p-0 print:max-w-none">
      
      <!-- Resume Header -->
      <ResumeHeader />

      <!-- Executive Profile Section -->
      <ResumeSection title="Executive Profile" :icon="LucideTerminal" badge="25+ Years Experience">
        <p class="text-xs sm:text-[0.84rem] leading-[1.75] text-text-secondary text-justify">
          A results-driven Principal Systems Architect and Practice Lead with over 25 years of experience designing, modernizing, and orchestrating mission-critical distributed infrastructure. Proven track record deploying automated, multi-tenant cloud and edge networks supporting 25+ production platforms processing 160,000+ aggregate monthly requests with 99.99% availability. Deep technical authority across Kubernetes, Infrastructure as Code (Terraform), event-driven streaming pipelines, sovereign protocol design (w4 Protocol), and modern browser-based spatial rendering engines (WebGPU). Adept at leading cross-functional engineering teams, eliminating technical debt, and translating ambiguous business and scientific requirements into durable, self-healing platforms.
        </p>
      </ResumeSection>

      <!-- Core Architecture Competencies -->
      <ResumeSection title="Core Architecture &amp; Engineering Competencies" :icon="LucideCpu">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="c in competencies"
            :key="c.group"
            class="flex flex-col gap-1 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]"
          >
            <span class="text-xs font-bold text-text-primary text-accent">
              {{ c.group }}
            </span>
            <span class="text-xs text-text-secondary leading-[1.6]">
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
        <p class="text-xs sm:text-[0.84rem] leading-[1.75] text-text-secondary">
          25+ years of self-directed technical mastery, production systems architecture, and distributed platform design meeting and exceeding formal academic requirements for an advanced degree in Computer Science. Consulting and corporate records verifiable via IRS filings, state corporate registries, and client delivery attestations.
        </p>
      </ResumeSection>

      <!-- Quick Download Card at bottom -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/[0.08] backdrop-blur-xl print:hidden">
        <div>
          <p class="font-display text-sm font-bold text-text-primary">
            Need a PDF copy for your executive team or ATS?
          </p>
          <p class="text-xs text-text-muted mt-0.5">
            Formatted to exact Letter specifications with high-contrast vector typography.
          </p>
        </div>
        <a
          href="/xp_pollard_resume.pdf"
          download="Xopher_Pollard_Resume.pdf"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-hero text-white no-underline shadow-[0_4px_16px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 shrink-0"
        >
          <LucideDownload class="w-4 h-4" />
          Download Resume PDF
        </a>
      </div>

    </div>
  </main>
</template>

<style>
@media print {
  body {
    background: #ffffff !important;
    color: #111111 !important;
  }
  header, nav, #hamburger-btn, .print\\:hidden {
    display: none !important;
  }
  .resume-page {
    padding: 0 !important;
    margin: 0 !important;
  }
  .resume-page section,
  .resume-page header {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 6px 0 !important;
  }
}
</style>

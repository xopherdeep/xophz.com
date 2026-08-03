<script setup lang="ts">
import {
  ArrowUpRight as LucideArrowUpRight,
  ShieldCheck as LucideShieldCheck,
  Cpu as LucideCpu,
  Layers as LucideLayers,
  Calendar as LucideCalendar,
  Briefcase as LucideBriefcase,
  Sparkles as LucideSparkles,
  Terminal as LucideTerminal,
} from '@lucide/vue'

const { identity, personas, stats, specialties, skills, skillTags } = useProfileData()

useSeoMeta({
  title: 'About · Xopher "XP" Pollard',
  description: 'Principal Systems Synthesist, 4x Founder, Artist & Polymath. 25+ years bridging cloud-first systems architecture, sovereign digital infrastructure, and creative worldbuilding.',
})

const philosophies = [
  {
    title: 'Structural Integrity First',
    icon: LucideShieldCheck,
    desc: 'Systems should be engineered like modern cathedrals: resilient under extreme load, self-healing under duress, and built without burning the organization down during evolution.',
    color: '#06b6d4'
  },
  {
    title: 'Polymathic Synthesis',
    icon: LucideSparkles,
    desc: 'True breakthroughs happen at the intersection of disciplines. Technical architecture, music production, and visual art inform one another to build software with soul.',
    color: '#8b5cf6'
  },
  {
    title: 'Sovereign Infrastructure',
    icon: LucideCpu,
    desc: 'Decoupled, autonomous nodes and resilient protocols over monolithic vendor lock-in. Empowering creators and ventures with self-sovereign digital foundations.',
    color: '#f59e0b'
  }
]

const milestones = [
  {
    period: '25+ Years Experience',
    title: 'Enterprise Architecture & Leadership',
    role: 'CTO · VP of Engineering · Principal Architect',
    desc: 'Architecting distributed cloud systems, modernizing complex legacy monoliths, and scaling engineering teams from early-stage startups to Fortune 500 enterprises.'
  },
  {
    period: 'Consulting & Advisory',
    title: 'My Compass Consulting',
    role: 'Principal Systems Synthesist',
    desc: 'Serving as the strategic tip of the spear for organizations needing high-integrity technical blueprints, performance optimization, and executive technology direction.'
  },
  {
    period: 'Foundational Ecosystem',
    title: 'Hall of the Gods & Sovereign Webwork',
    role: 'Founder & Worldbuilder',
    desc: 'Pioneering sovereign digital infrastructure (w⁴ Hyper-cube protocol, BlackBOX nodes, YouMeOS) alongside multi-disciplinary creative ventures spanning music and visual art.'
  }
]
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[920px] px-4 pt-[80px] pb-[100px] flex flex-col gap-12">

      <!-- Hero / Identity Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }"
      >
        <div class="relative p-[3px] rounded-full bg-gradient-hero animate-[spinGlow_6s_linear_infinite] shrink-0">
          <div
            class="w-[90px] h-[90px] md:w-[105px] md:h-[105px] rounded-full bg-bg border-[3px] border-bg overflow-hidden"
          >
            <NuxtImg
              :src="identity.headshot"
              :alt="identity.name"
              width="105"
              height="105"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span
              class="text-[0.6rem] font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25"
            >Principal Systems Synthesist</span>
            <span class="text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-text-muted">Sonoran Desert ·
              Global</span>
          </div>
          <h1 class="font-display text-3xl md:text-5xl font-bold text-text-primary tracking-[-0.03em] leading-[1.05]">{{
            identity.name }}</h1>
          <p class="text-sm md:text-base text-accent-2 font-medium mt-1.5">{{ identity.title }}</p>
        </div>
      </div>

      <!-- Stats strip -->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 gap-3"
        v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl transition-all duration-200 hover:border-accent/25 hover:bg-white/8"
        >
          <p class="font-display text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">{{
            stat.value }}</p>
          <p class="text-[0.65rem] text-text-muted mt-1 tracking-[0.08em] uppercase font-semibold">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Extended Executive Bio -->
      <div
        class="flex flex-col gap-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl p-6 md:p-8 shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/8"
        v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 120 } } }"
      >
        <div class="flex items-center gap-2 text-accent">
          <LucideTerminal class="w-4 h-4" />
          <h2 class="font-display text-sm font-bold tracking-[0.12em] uppercase">Executive Overview</h2>
        </div>
        <p class="text-sm md:text-base leading-[1.75] text-text-secondary">
          I am a 25+ year veteran software architect, 4x founder, and executive technology leader based out of the
          Sonoran Desert. As the principal behind <strong>My Compass Consulting</strong>, I specialize in high-stakes
          systems synthesis, carving monolithic legacy systems into resilient, cloud-native architectures without
          disrupting ongoing operations.
        </p>
        <p class="text-sm md:text-base leading-[1.75] text-text-secondary">
          Beyond enterprise advisory, <strong>xophz.com</strong> is the central nexus for my polymathic pursuits:
          sovereign digital infrastructure via the <em>w⁴ Protocol</em>, audio composition as <em>Majora D.</em>, visual
          art and worldbuilding lore under <em>Jesta Sugjester</em>, tech exploration as <em>Midnight Nerd</em>, gaming roots as <em>[HΩG] Tim</em>, and the broader <em>Hall of the Gods</em>
          co-operative webwork.
        </p>
      </div>

      <!-- Architectural & Leadership Philosophy -->
      <div>
        <div
          class="flex items-center gap-2 mb-4"
          v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 140 } } }"
        >
          <p class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted">CORE PHILOSOPHY &amp;
            DIRECTIVES</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="(phil, idx) in philosophies"
            :key="phil.title"
            class="flex flex-col gap-3 p-5 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--phil-color)]/30 hover:bg-white/8"
            :style="{ '--phil-color': phil.color }"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 160 + idx * 50 } } }"
          >
            <span
              class="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 text-[color:var(--phil-color)] border border-white/[0.06]"
            >
              <component
                :is="phil.icon"
                class="w-4.5 h-4.5"
              />
            </span>
            <h3 class="font-display text-sm font-bold text-text-primary">{{ phil.title }}</h3>
            <p class="text-[0.78rem] leading-[1.6] text-text-secondary">{{ phil.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Personas / Creative Spectrum -->
      <div>
        <p
          class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4"
          v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 300 } } }"
        >PERSONAS &amp; CREATIVE SPECTRUM</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <component
            v-for="(p, idx) in personas"
            :key="p.key"
            :is="p.link.startsWith('http') ? 'a' : 'NuxtLink'"
            :href="p.link.startsWith('http') ? p.link : undefined"
            :to="!p.link.startsWith('http') ? p.link : undefined"
            :target="p.link.startsWith('http') ? '_blank' : undefined"
            :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="group flex gap-4 p-5 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-[color:var(--pc)]/40 hover:bg-white/10 hover:-translate-y-0.5 no-underline"
            :style="{ '--pc': p.color }"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 320 + idx * 50 } } }"
          >
            <span
              class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-white/5 text-[color:var(--pc)] border border-white/10 transition-transform duration-300 group-hover:scale-110"
            >
              <component
                :is="p.icon"
                class="w-5 h-5"
              />
            </span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-0.5">
                <p class="text-[0.92rem] font-bold text-text-primary">{{ p.name }}</p>
                <LucideArrowUpRight
                  class="w-3.5 h-3.5 text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary"
                />
              </div>
              <p class="text-[0.65rem] font-semibold text-[color:var(--pc)] mb-1.5">{{ p.subtitle }}</p>
              <p class="text-[0.78rem] leading-[1.6] text-text-secondary">{{ p.desc }}</p>
            </div>
          </component>
        </div>
      </div>

      <!-- Career & Ecosystem Milestones Timeline -->
      <div>
        <p
          class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4"
          v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 480 } } }"
        >CAREER &amp; ECOSYSTEM MILESTONES</p>
        <div class="flex flex-col gap-3">
          <div
            v-for="(m, idx) in milestones"
            :key="m.title"
            class="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl transition-all duration-300 hover:border-accent/25 hover:bg-white/8"
            v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0, transition: { delay: 500 + idx * 50 } } }"
          >
            <div class="sm:w-[190px] shrink-0">
              <span
                class="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-accent px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20"
              >{{ m.period }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-display text-base font-bold text-text-primary">{{ m.title }}</h3>
              <p class="text-[0.68rem] font-semibold text-accent-2 mb-1">{{ m.role }}</p>
              <p class="text-[0.78rem] leading-[1.5] text-text-secondary">{{ m.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Specialties -->
      <div>
        <p
          class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4"
          v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 620 } } }"
        >SYSTEMS &amp; CONSULTING SPECIALTIES</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="(item, idx) in specialties"
            :key="item.key"
            class="group flex gap-4 p-5 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/30 hover:bg-white/8"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 640 + idx * 50 } } }"
          >
            <span
              class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-accent/15 text-accent-2 transition-all duration-300 group-hover:bg-accent/25 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]"
            >
              <component
                :is="item.icon"
                class="w-5 h-5"
              />
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-[0.92rem] font-semibold text-text-primary mb-1">{{ item.title }}</p>
              <p class="text-[0.8rem] leading-[1.6] text-text-secondary">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills grid -->
      <div>
        <p
          class="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-text-muted mb-4"
          v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 780 } } }"
        >SKILLS &amp; STACK</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="(group, idx) in skills"
            :key="group.group"
            class="p-4 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-200 hover:border-accent/25 hover:bg-white/8"
            v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 800 + idx * 40 } } }"
          >
            <p class="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent mb-2.5">{{ group.group }}</p>
            <ul class="list-none p-0 flex flex-col gap-1.5">
              <li
                v-for="skill in group.items"
                :key="skill"
                class="text-[0.78rem] text-text-secondary flex items-center gap-1.5 before:content-[''] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-accent-2 before:shrink-0"
              >{{ skill }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Manifesto & Action CTAs -->
      <div
        class="relative flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-white/5 border border-white/[0.06] backdrop-blur-2xl text-center shadow-glass-shadow overflow-hidden"
        v-motion="{ initial: { opacity: 0, scale: 0.98 }, enter: { opacity: 1, scale: 1, transition: { delay: 920 } } }"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none"
        />
        <div class="max-w-[620px] flex flex-col gap-3 relative z-10">
          <p class="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-accent">THE SYNTHESIS MANIFESTO</p>
          <blockquote class="font-display text-base md:text-xl font-medium text-text-primary leading-[1.5] italic">
            "Code is not merely logic; it is structural poetry. When systems architecture, sovereign infrastructure, and
            creative worldbuilding align, software ceases to be a tool and becomes a living environment."
          </blockquote>
          <p class="text-xs text-accent-2 font-semibold mt-1">~Xophz</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3.5 w-full max-w-[440px] relative z-10 mt-2">
          <a
            href="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 tracking-[0.01em] bg-gradient-hero border-none text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.55)]"
          >
            <LucideCalendar class="w-4 h-4 shrink-0" />
            Book a Meeting
          </a>
          <NuxtLink
            to="/projects"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 tracking-[0.01em] bg-white/5 border border-white/[0.08] text-text-secondary backdrop-blur-md no-underline hover:border-accent/40 hover:text-text-primary hover:bg-accent/10 hover:-translate-y-0.5"
          >
            <LucideBriefcase class="w-4 h-4 shrink-0 text-accent" />
            Magnum Opus
          </NuxtLink>
        </div>
      </div>

    </div>
  </main>
</template>

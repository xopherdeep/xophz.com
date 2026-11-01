<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
import {
  CONSULTING_BOOKING_URL as BOOKING_URL,
  CONSULTING_EMAIL as CONTACT_EMAIL,
  consultingAudience,
  consultingAreas,
  consultingEngagements,
  consultingNextSteps,
  consultingPastWork as pastWork,
} from '~/data/consultingCatalog'
import { IDENTITY } from '~/constants/identity'

const description =
  `Operations and systems consulting from ${IDENTITY.fullName}: an operations check-up, a focused project, or ongoing advisory. Plain language, a written price up front, and a free first call.`

useSeoMeta({
  title: `Consulting · ${IDENTITY.name}`,
  ogTitle: `Consulting · ${IDENTITY.name}`,
  twitterTitle: `Consulting · ${IDENTITY.name}`,
  description,
  ogDescription: description,
  twitterDescription: description,
})

const card = 'rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06]'
const h2 = 'font-display text-xl font-bold text-zinc-900 dark:text-zinc-100'
const h3 = 'font-display text-base font-bold text-zinc-900 dark:text-zinc-100'
const body = 'text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-12">
      <OPageHero
        title="Operations & systems consulting"
        badge-text="Taking new clients"
        badge-icon="i-lucide-compass"
        meta-text="Remote · Based in Tucson, AZ"
        glow-primary="cyan"
        glow-secondary="violet"
      >
        <template #description>
          I help teams fix the processes and systems behind their operations: how work moves, where the numbers
          come from, and which tools are worth keeping. 25+ years of hands-on systems work, explained in plain
          language. I'll tell you what's worth doing, what it costs, and then help you get it done.
        </template>
        <template #actions>
          <UButton
            :to="BOOKING_URL"
            target="_blank"
            color="primary"
            variant="solid"
            size="md"
            icon="i-lucide-calendar"
            class="shadow-glow-violet justify-center"
          >
            Book a free call
          </UButton>
          <UButton
            to="#engagements"
            color="neutral"
            variant="outline"
            size="md"
            trailing-icon="i-lucide-arrow-down"
            class="justify-center"
          >
            Ways to work together
          </UButton>
        </template>
      </OPageHero>

      <!-- Who it's for -->
      <section class="flex flex-col gap-4" aria-labelledby="for-heading">
        <h2 id="for-heading" :class="h2">Who this is for</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li v-for="line in consultingAudience" :key="line" :class="[card, 'flex items-start gap-3 py-4']">
            <UIcon name="i-lucide-check-circle-2" class="w-5 h-5 mt-0.5 shrink-0 text-cyan-500" />
            <span class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{{ line }}</span>
          </li>
        </ul>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Hiring for a full-time role? See the <NuxtLink to="/resume" class="underline">resume</NuxtLink>.
        </p>
      </section>

      <!-- What I help with -->
      <section class="flex flex-col gap-4" aria-labelledby="areas-heading">
        <h2 id="areas-heading" :class="h2">What I can help with</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="area in consultingAreas" :key="area.title" :class="[card, 'flex flex-col gap-2']">
            <UIcon :name="area.icon" class="w-5 h-5 text-violet-500" />
            <h3 :class="h3">{{ area.title }}</h3>
            <p :class="body">{{ area.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Engagement types -->
      <section id="engagements" class="flex flex-col gap-4 scroll-mt-24" aria-labelledby="engagements-heading">
        <div class="flex flex-col gap-1">
          <h2 id="engagements-heading" :class="h2">Three ways to work together</h2>
          <p :class="body">Not sure which one fits? That's what the free call is for.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article
            v-for="e in consultingEngagements"
            :key="e.key"
            :class="[card, 'flex flex-col gap-3 backdrop-blur-xl']"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                :style="{ backgroundColor: e.color + '15', color: e.color }"
              >
                <UIcon :name="e.icon" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <span class="text-[0.65rem] font-bold tracking-widest uppercase" :style="{ color: e.color }">{{ e.name }}</span>
                <h3 :class="h3">{{ e.plainName }}</h3>
              </div>
            </div>
            <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" /> {{ e.length }}
            </p>
            <p :class="body"><span class="font-semibold text-zinc-800 dark:text-zinc-200">Good fit if:</span> {{ e.bestFor }}</p>
            <div class="flex flex-col gap-1.5 mt-auto pt-2 border-t border-zinc-100 dark:border-white/[0.05]">
              <span class="text-xs font-semibold text-zinc-800 dark:text-zinc-200">What you get</span>
              <ul class="flex flex-col gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li v-for="item in e.youGet" :key="item" class="flex items-start gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 shrink-0" :style="{ color: e.color }" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- After booking -->
      <section class="flex flex-col gap-4" aria-labelledby="next-heading">
        <h2 id="next-heading" :class="h2">What happens after you book</h2>
        <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <li v-for="(step, i) in consultingNextSteps" :key="step.title" :class="[card, 'flex flex-col gap-2']">
            <span class="text-xs font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400">Step {{ i + 1 }}</span>
            <h3 :class="h3">{{ step.title }}</h3>
            <p :class="body">{{ step.desc }}</p>
          </li>
        </ol>
      </section>

      <!-- Past work -->
      <section class="flex flex-col gap-4" aria-labelledby="past-heading">
        <h2 id="past-heading" :class="h2">Past work</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article v-for="study in pastWork" :key="study.key" :class="[card, 'flex flex-col gap-2']">
            <h3 :class="h3">{{ study.title }}</h3>
            <p :class="body">{{ study.summary }}</p>
            <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ study.outcome }}</p>
            <UButton
              v-if="study.url"
              :to="study.url"
              target="_blank"
              color="neutral"
              variant="link"
              size="xs"
              trailing-icon="i-lucide-arrow-up-right"
              class="self-start px-0"
            >
              See it
            </UButton>
          </article>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          The full background is on the <NuxtLink to="/resume" class="underline">resume</NuxtLink> and
          <NuxtLink to="/about" class="underline">About</NuxtLink> page.
        </p>
      </section>

      <!-- CTA -->
      <section :class="[card, 'p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left']">
        <div>
          <h2 class="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">Have a process or system that needs fixing?</h2>
          <p :class="body">
            Book a free call, or email <a :href="`mailto:${CONTACT_EMAIL}`" class="underline">{{ CONTACT_EMAIL }}</a>.
          </p>
        </div>
        <UButton :to="BOOKING_URL" target="_blank" color="primary" variant="solid" size="lg" icon="i-lucide-calendar" class="shadow-glow-violet shrink-0">
          Book a free call
        </UButton>
      </section>
    </UContainer>
  </main>
</template>

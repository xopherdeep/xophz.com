<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
import { BOOKING_URL, CONTACT_EMAIL, workServices, workSteps, workCaseStudies } from '~/data/workCatalog'

const description =
  'Computer repair, website design, and tech consulting in Tucson, AZ from Christopher "Xopher" Pollard. 25+ years of experience. Book a quick call.'

useSeoMeta({
  title: 'Work with Me · Xopher Pollard',
  ogTitle: 'Work with Me · Xopher Pollard',
  twitterTitle: 'Work with Me · Xopher Pollard',
  description,
  ogDescription: description,
  twitterDescription: description,
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-10">
      <OPageHero
        title="Work with me"
        badge-text="Open for jobs"
        badge-icon="i-lucide-handshake"
        meta-text="Tucson, AZ · On-site & remote"
        glow-primary="emerald"
        glow-secondary="violet"
      >
        <template #description>
          I'm Christopher "Xopher" Pollard. I fix computers, build websites, and help with tech decisions for people and
          small businesses, with 25+ years of experience. I take jobs as they come, big or small.
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
            Book a call
          </UButton>
          <UButton
            :to="`mailto:${CONTACT_EMAIL}`"
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-mail"
            class="justify-center"
          >
            Email me
          </UButton>
        </template>
      </OPageHero>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-4" aria-labelledby="services-heading">
        <h2 id="services-heading" class="sr-only">Services</h2>
        <div
          v-for="service in workServices"
          :key="service.key"
          class="rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-3"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :style="{ backgroundColor: service.color + '15', color: service.color }"
          >
            <UIcon :name="service.icon" class="w-5 h-5" />
          </div>
          <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">{{ service.title }}</h3>
          <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ service.blurb }}</p>
          <ul class="mt-auto flex flex-col gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            <li v-for="item in service.items" :key="item" class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 shrink-0" :style="{ color: service.color }" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="flex flex-col gap-4" aria-labelledby="how-heading">
        <h2 id="how-heading" class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">How it works</h2>
        <ol class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li
            v-for="(step, i) in workSteps"
            :key="step.title"
            class="rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] flex flex-col gap-2"
          >
            <span class="text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400">Step {{ i + 1 }}</span>
            <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">{{ step.title }}</h3>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ step.desc }}</p>
          </li>
        </ol>
      </section>

      <section class="flex flex-col gap-4" aria-labelledby="work-heading">
        <h2 id="work-heading" class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">Past work</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article
            v-for="study in workCaseStudies"
            :key="study.key"
            class="rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] flex flex-col gap-2"
          >
            <UBadge color="primary" variant="subtle" size="sm" class="self-start">{{ study.category }}</UBadge>
            <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">{{ study.title }}</h3>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ study.summary }}</p>
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
          Looking for the enterprise side? See the <NuxtLink to="/resume" class="underline">resume</NuxtLink> and
          <NuxtLink to="/timeline" class="underline">career timeline</NuxtLink>.
        </p>
      </section>

      <section class="rounded-2xl p-6 md:p-8 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h2 class="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">Got something that needs fixing or building?</h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Book a quick call and we'll see if it's a fit.</p>
        </div>
        <UButton :to="BOOKING_URL" target="_blank" color="primary" variant="solid" size="lg" icon="i-lucide-calendar" class="shadow-glow-violet">
          Book a call
        </UButton>
      </section>
    </UContainer>
  </main>
</template>

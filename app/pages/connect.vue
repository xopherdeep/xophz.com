<script setup lang="ts">
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'
import MConnectChannels from '~/components/molecules/m-connect-channels/m-connect-channels.vue'

useSeoMeta({
  title: 'Connect · Xopher (XP) Pollard',
  ogTitle: 'Connect · Xopher (XP) Pollard',
  description: 'Get in touch with Xopher (XP) Pollard. Book a meeting, find social profiles, or reach out directly.',
  ogDescription: 'Get in touch with Xopher (XP) Pollard. Book a meeting, find social profiles, or reach out directly.',
})

const { openQrd } = useQrdModal()

const { data: recentPosts } = await useAsyncData('recent-posts-connect', () =>
  queryCollection('posts').order('date', 'DESC').limit(3).all()
)

const formatShortDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-8">
      <OPageHero
        title="Connect"
        badge-text="Direct Channels"
        badge-icon="i-lucide-mail"
        meta-text="Advisory, Architecture & Inquiries"
        glow-primary="violet"
        glow-secondary="cyan"
      >
        <template #description>
          Schedule an executive systems consultation, discuss sovereign infrastructure, or connect across our digital networks.
        </template>
        <template #actions>
          <UButton
            to="https://calendar.app.google/Y732Ak5gxuCMVoHo8"
            target="_blank"
            color="primary"
            variant="solid"
            size="md"
            icon="i-lucide-calendar"
            class="shadow-glow-violet justify-center"
          >
            Book Consultation
          </UButton>
          <UButton
            color="primary"
            variant="soft"
            size="md"
            icon="i-lucide-qr-code"
            class="justify-center"
            @click="openQrd"
          >
            My Q'rd
          </UButton>
          <UButton
            to="/resume"
            color="neutral"
            variant="outline"
            size="md"
            trailing-icon="i-lucide-arrow-right"
            class="justify-center"
          >
            Executive Resume
          </UButton>
        </template>
      </OPageHero>

      <!-- Connect Channels Directory (4 Columns) -->
      <MConnectChannels />

      <!-- Recent posts -->
      <div
        v-if="recentPosts && recentPosts.length"
        class="flex flex-col gap-3 pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]"
      >
        <div class="flex items-center justify-between">
          <span class="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
            <UIcon name="i-lucide-file-text" class="w-4 h-4 text-violet-500" />
            Recent Dispatches
          </span>
          <NuxtLink to="/posts" class="text-[0.72rem] font-semibold text-violet-600 dark:text-violet-400 no-underline opacity-80 transition-opacity duration-200 hover:opacity-100">
            View all
          </NuxtLink>
        </div>
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl">
          <NuxtLink
            v-for="post in recentPosts"
            :key="post.path"
            :to="post.path"
            class="flex items-center gap-2.5 px-4 py-3 no-underline border-b border-zinc-100 dark:border-white/[0.04] transition-colors duration-150 cursor-pointer hover:bg-violet-500/5 dark:hover:bg-violet-500/8 group last:border-b-0"
          >
            <span
              class="w-1.5 h-1.5 rounded-full shrink-0"
              :style="{
                backgroundColor: (post.type ?? 'article') === 'short' ? '#06b6d4' : '#8b5cf6',
                boxShadow: `0 0 6px ${(post.type ?? 'article') === 'short' ? '#06b6d4' : '#8b5cf6'}`
              }"
            />
            <span class="flex-1 text-[0.82rem] font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              {{ post.title }}
            </span>
            <time class="text-[0.68rem] text-zinc-400 dark:text-zinc-500 shrink-0">
              {{ formatShortDate(post.date) }}
            </time>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </main>
</template>

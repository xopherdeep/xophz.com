<script setup lang="ts">
const { socialLinks } = useProfileData()

useSeoMeta({
  title: 'Connect · Xopher "XP" Pollard',
  description: 'Get in touch with Xopher "XP" Pollard. Book a meeting, find social profiles, or reach out directly.',
})

const { data: recentPosts } = await useAsyncData('recent-posts-connect', () =>
  queryCollection('posts').order('date', 'DESC').limit(3).all()
)

const formatShortDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const postTypeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[900px] px-4 pt-[80px] pb-[90px] flex flex-col gap-8">

      <!-- Header -->
      <div v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">
        <h1 class="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-[-0.03em]">Connect</h1>
        <p class="text-sm leading-[1.7] text-text-secondary mt-2">Find me where the builders hang out.</p>
      </div>

      <!-- Prominent CTA -->
      <a href="https://calendar.app.google/Y732Ak5gxuCMVoHo8" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-accent/8 border border-accent/25 no-underline transition-all duration-300 backdrop-blur-xl hover:border-accent/50 hover:bg-accent/12 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }">
        <span class="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-accent/20 text-accent transition-all duration-300 group-hover:bg-accent/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <LucideCalendar class="w-6 h-6" />
        </span>
        <div class="flex-1 min-w-0">
          <p class="font-display text-lg font-bold text-text-primary">Book a Meeting</p>
          <p class="text-[0.8rem] text-text-secondary mt-0.5">Schedule a call to discuss architecture, consulting, or collaboration.</p>
        </div>
        <LucideArrowUpRight class="w-5 h-5 text-text-muted shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </a>

      <!-- Social links grid -->
      <nav class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5" aria-label="Social links">
        <a v-for="(link, idx) in socialLinks.filter(l => l.id !== 'link-calendar')" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-text-primary no-underline transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:translate-x-1 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.35),-4px_0_16px_-2px_var(--link-color)]" :style="{ '--link-color': link.color }" v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0, transition: { delay: 100 + idx * 40 } } }">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,var(--link-color),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]" />
          <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[color:var(--link-color)]">
            <component :is="link.icon" class="w-full h-full" />
          </span>
          <span class="flex-1 text-[0.9rem] font-medium">{{ link.label }}</span>
          <LucideArrowUpRight class="w-4 h-4 text-text-muted shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary" />
        </a>
      </nav>

      <!-- Recent posts -->
      <div v-if="recentPosts && recentPosts.length" class="flex flex-col gap-2.5" v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 400 } } }">
        <div class="flex items-center justify-between">
          <span class="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-text-muted">RECENT POSTS</span>
          <NuxtLink to="/posts" class="text-[0.72rem] font-semibold text-accent no-underline opacity-80 transition-opacity duration-200 hover:opacity-100">View all →</NuxtLink>
        </div>
        <div class="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.25)]">
          <NuxtLink v-for="post in recentPosts" :key="post.path" :to="post.path" class="flex items-center gap-2.5 px-3.5 py-3 no-underline border-b border-white/5 transition-colors duration-150 cursor-pointer hover:bg-accent/10 group last:border-b-0">
            <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_6px_var(--rp-color)]" :style="{ backgroundColor: postTypeColor(post.type ?? 'article'), '--rp-color': postTypeColor(post.type ?? 'article') }" />
            <span class="flex-1 text-[0.82rem] font-medium text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-text-primary">{{ post.title }}</span>
            <time class="text-[0.68rem] text-text-muted shrink-0">{{ formatShortDate(post.date) }}</time>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

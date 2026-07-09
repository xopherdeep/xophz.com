<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const normalizedPath = route.path.replace(/\/$/, '') || '/'

const { data: post } = await useAsyncData(`post-${normalizedPath}`, () =>
  queryCollection('posts').path(normalizedPath).first()
)

const { data: allPosts } = await useAsyncData('all-posts-nav', () =>
  queryCollection('posts')
    .order('date', 'DESC')
    .select('title', 'path', 'date', 'type', 'summary')
    .all()
)

const currentIndex = computed(() => {
  if (!allPosts.value || !post.value) return -1
  return allPosts.value.findIndex(p => p.path === post.value!.path)
})

const newerPost = computed(() => {
  const idx = currentIndex.value
  if (idx <= 0 || !allPosts.value) return null
  return allPosts.value[idx - 1]
})

const olderPost = computed(() => {
  const idx = currentIndex.value
  if (!allPosts.value || idx < 0 || idx >= allPosts.value.length - 1) return null
  return allPosts.value[idx + 1]
})

const hasSiblings = computed(() => !!newerPost.value || !!olderPost.value)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useSeoMeta({
  title: `${post.value.title} · xophz.com`,
  description: post.value.summary ?? '',
  ogTitle: `${post.value.title} · xophz.com`,
  ogDescription: post.value.summary ?? '',
})

const formatDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const typeLabel = (type: string) => (type === 'short' ? 'Update' : 'Article')
const typeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')

const postUrl = computed(() => `https://xophz.com${route.path}`)
const encodedTitle = computed(() => encodeURIComponent(post.value?.title ?? ''))
const encodedUrl = computed(() => encodeURIComponent(postUrl.value))

const twitterShareUrl = computed(
  () => `https://twitter.com/intent/tweet?text=${encodedTitle.value}&url=${encodedUrl.value}&via=xopherdeep`
)
const linkedinShareUrl = computed(
  () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`
)
const redditShareUrl = computed(
  () => `https://www.reddit.com/submit?url=${encodedUrl.value}&title=${encodedTitle.value}`
)

const copySuccess = ref(false)
const copyLink = async () => {
  await navigator.clipboard.writeText(postUrl.value)
  copySuccess.value = true
  setTimeout(() => { copySuccess.value = false }, 2000)
}
</script>

<template>
  <div class="pt-[calc(56px+2rem)] px-8 pb-24 max-w-[900px] mx-auto w-full max-md:pt-6 max-md:px-6 max-md:pb-16">
    <nav class="flex mb-8">
      <NuxtLink
        to="/posts"
        class="inline-flex items-center gap-1.5 text-[0.85rem] font-bold tracking-[0.1em] uppercase text-accent no-underline opacity-90 transition-all duration-200 hover:opacity-100 hover:gap-2.5"
        aria-label="Back to posts list"
      >
        <LucideArrowLeft class="w-[18px] h-[18px] stroke-[2.5px]" />
        All Posts
      </NuxtLink>
    </nav>

    <article class="flex flex-col gap-8 animate-[fadeIn_0.4s_ease-out]">
      <header class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span
            class="text-[0.65rem] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border"
            :style="{ color: 'var(--type-color)', backgroundColor: 'color-mix(in srgb, var(--type-color) 15%, transparent)', borderColor: 'color-mix(in srgb, var(--type-color) 30%, transparent)', '--type-color': typeColor(post.type ?? 'article') }"
          >
            {{ typeLabel(post.type ?? 'article') }}
          </span>
          <time class="text-[0.8rem] text-text-muted font-medium" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>

        <h1 class="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-text-primary m-0 max-md:text-4xl">{{ post.title }}</h1>

        <p v-if="post.summary" class="text-[1.1rem] leading-[1.6] text-text-secondary m-0 max-w-[90%]">{{ post.summary }}</p>

        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2">
          <span v-for="tag in post.tags" :key="tag" class="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-text-muted bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">{{ tag }}</span>
        </div>
      </header>

      <div class="bg-white/5 border border-white/12 rounded-[20px] backdrop-blur-[28px] shadow-glass-shadow p-12 leading-[1.8] text-[1.05rem] text-text-primary [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h1]:tracking-[-0.02em] [&_h2]:tracking-[-0.02em] [&_h3]:tracking-[-0.02em] [&_h1]:mt-8 [&_h2]:mt-8 [&_h3]:mt-8 [&_h1]:mb-4 [&_h2]:mb-4 [&_h3]:mb-4 [&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h3]:text-[1.35rem] [&_h3]:font-semibold [&_p]:m-0 [&_p]:mb-5 [&_a]:text-accent [&_a]:no-underline [&_a]:border-b [&_a]:border-[color-mix(in_srgb,#8b5cf6_40%,transparent)] [&_a]:transition-all [&_a]:duration-200 hover:[&_a]:border-[#8b5cf6] hover:[&_a]:bg-[color-mix(in_srgb,#8b5cf6_10%,transparent)] [&_code]:font-['JetBrains_Mono','Fira_Code',monospace] [&_code]:text-[0.9em] [&_code]:bg-accent/12 [&_code]:border [&_code]:border-accent/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[#c4b5fd] [&_pre]:bg-black/50 [&_pre]:border [&_pre]:border-white/5 [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] [&_pre_code]:bg-transparent [&_pre_code]:border-none [&_pre_code]:p-0 [&_pre_code]:text-[0.9rem] [&_pre_code]:text-[#e4e4e7] [&_blockquote]:border-l-[3px] [&_blockquote]:border-accent [&_blockquote]:bg-[linear-gradient(90deg,rgba(139,92,246,0.08)_0%,transparent_100%)] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:my-6 [&_blockquote]:text-text-secondary [&_blockquote]:italic [&_blockquote]:rounded-r-lg [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:my-3 [&_ul]:mb-5 [&_ol]:my-3 [&_ol]:mb-5 [&_li]:mb-2 [&_hr]:border-none [&_hr]:border-t [&_hr]:border-white/10 [&_hr]:my-10 max-md:p-6">
        <ContentRenderer :value="post" />
        <div class="mt-12 pt-8 border-t border-dashed border-white/10 font-display text-text-muted italic text-[1.1rem] leading-[1.5] opacity-80 [&_p]:!m-0 [&_p]:!mb-1">
          <p>Abracadabra,</p>
          <p>— Xopher "XP" Pollard 🧞</p>
        </div>
      </div>

      <footer class="flex flex-col gap-4 pt-4 border-t border-white/5">
        <p class="text-[0.8rem] font-bold tracking-[0.1em] uppercase text-text-muted m-0">Share this post</p>
        <div class="flex flex-wrap gap-3" role="group" aria-label="Share options">
          <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.85rem] font-semibold cursor-pointer no-underline border border-transparent transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06)] bg-[#e4e4e7]/10 border-[#e4e4e7]/15 text-[#e4e4e7] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#e4e4e7]/15 hover:border-[#e4e4e7]/25" aria-label="Share on X / Twitter">
            <IconTwitter class="w-4 h-4 shrink-0" />
            X
          </a>
          <a :href="linkedinShareUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.85rem] font-semibold cursor-pointer no-underline border border-transparent transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06)] bg-[#0a66c2]/15 border-[#0a66c2]/30 text-[#60a5fa] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#0a66c2]/20 hover:border-[#0a66c2]/45" aria-label="Share on LinkedIn">
            <IconLinkedin class="w-4 h-4 shrink-0" />
            LinkedIn
          </a>
          <a :href="redditShareUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.85rem] font-semibold cursor-pointer no-underline border border-transparent transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06)] bg-[#ff4500]/10 border-[#ff4500]/20 text-[#f97316] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#ff4500]/15 hover:border-[#ff4500]/35" aria-label="Share on Reddit">
            <LucideShare2 class="w-4 h-4 shrink-0" />
            Reddit
          </a>
          <button class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.85rem] font-semibold cursor-pointer border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06)]" :class="copySuccess ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#34d399]' : 'bg-accent/10 border-accent/20 text-[#a78bfa] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.2)] hover:bg-accent/15 hover:border-accent/35'" aria-label="Copy link" @click="copyLink">
            <LucideCheck v-if="copySuccess" class="w-4 h-4 shrink-0 stroke-[2.5px]" />
            <LucideCopy v-else class="w-4 h-4 shrink-0" />
            {{ copySuccess ? 'Copied!' : 'Copy Link' }}
          </button>
        </div>
      </footer>

      <nav v-if="hasSiblings" class="mt-4" aria-label="Post navigation">
        <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <NuxtLink v-if="olderPost" :to="olderPost.path" class="flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-[24px] no-underline relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] items-start group hover:border-accent/25 hover:-translate-y-[3px] hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_40px_rgba(139,92,246,0.08),0_0_20px_rgba(139,92,246,0.05)]" :class="{ 'col-span-full': !newerPost }">
            <div class="absolute inset-0 rounded-inherit bg-[linear-gradient(135deg,rgba(139,92,246,0.06)_0%,rgba(6,182,212,0.04)_50%,rgba(245,158,11,0.03)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span class="inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.12em] uppercase text-accent relative z-10">
              <LucideArrowLeft class="w-3.5 h-3.5 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[3px]" />
              Older
            </span>
            <span class="font-display text-[1.1rem] font-bold leading-[1.3] text-text-primary relative z-10 transition-colors duration-250 group-hover:text-[#c4b5fd]">{{ olderPost.title }}</span>
            <span v-if="olderPost.type" class="text-[0.6rem] font-bold tracking-[0.1em] uppercase px-[0.55rem] py-[0.2rem] rounded-full border relative z-10 w-fit" :style="{ color: 'var(--nav-type-color)', backgroundColor: 'color-mix(in srgb, var(--nav-type-color) 12%, transparent)', borderColor: 'color-mix(in srgb, var(--nav-type-color) 25%, transparent)', '--nav-type-color': olderPost.type === 'short' ? '#06b6d4' : '#8b5cf6' }">{{ olderPost.type === 'short' ? 'Update' : 'Article' }}</span>
          </NuxtLink>

          <NuxtLink v-if="newerPost" :to="newerPost.path" class="flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-[24px] no-underline relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] items-end text-right max-md:items-start max-md:text-left group hover:border-accent/25 hover:-translate-y-[3px] hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_40px_rgba(139,92,246,0.08),0_0_20px_rgba(139,92,246,0.05)]" :class="{ 'col-span-full': !olderPost }">
            <div class="absolute inset-0 rounded-inherit bg-[linear-gradient(135deg,rgba(139,92,246,0.06)_0%,rgba(6,182,212,0.04)_50%,rgba(245,158,11,0.03)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span class="inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.12em] uppercase text-accent relative z-10">
              Newer
              <LucideArrowRight class="w-3.5 h-3.5 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]" />
            </span>
            <span class="font-display text-[1.1rem] font-bold leading-[1.3] text-text-primary relative z-10 transition-colors duration-250 group-hover:text-[#c4b5fd]">{{ newerPost.title }}</span>
            <span v-if="newerPost.type" class="text-[0.6rem] font-bold tracking-[0.1em] uppercase px-[0.55rem] py-[0.2rem] rounded-full border relative z-10 w-fit" :style="{ color: 'var(--nav-type-color)', backgroundColor: 'color-mix(in srgb, var(--nav-type-color) 12%, transparent)', borderColor: 'color-mix(in srgb, var(--nav-type-color) 25%, transparent)', '--nav-type-color': newerPost.type === 'short' ? '#06b6d4' : '#8b5cf6' }">{{ newerPost.type === 'short' ? 'Update' : 'Article' }}</span>
          </NuxtLink>
        </div>
      </nav>
    </article>
  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

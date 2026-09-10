<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContextualSearch } from '~/composables/useContextualSearch'
import OPageHero from '~/components/organisms/o-page-hero/o-page-hero.vue'

useSeoMeta({
  title: 'Writing & Devlogs : Xopher "XP" Pollard',
  description: 'Thoughts, systems architecture breakdowns, devlogs, and sovereign philosophy by Xopher "XP" Pollard.',
})

const { data: posts } = await useAsyncData('posts-feed', () =>
  queryCollection('posts').order('date', 'DESC').all()
)

const selectedFolder = ref('all')
const searchQuery = ref('')

const postSearchItems = computed(() =>
  (posts.value || []).map((post: any) => ({
    id: `dispatch-${post.path}`,
    title: post.title,
    subtitle: post.summary || post.date,
    category: 'posts' as const,
    categoryLabel: 'Dispatch',
    icon: 'i-lucide-file-text',
    iconColor: '#a855f7',
    route: post.path,
    keywords: [post.title, post.summary || '', ...(post.tags || []), 'post', 'blog']
  }))
)

useContextualSearch({
  placeholder: 'Search writing, devlogs, dispatches...',
  query: searchQuery,
  categoryLabel: 'Dispatches',
  items: postSearchItems
})

const folders = computed(() => {
  if (!posts.value) return []
  const uniqueFolders = new Set<string>()
  posts.value.forEach(post => {
    const parts = post.path.split('/')
    if (parts.length > 3) {
      uniqueFolders.add(parts[2])
    }
  })
  return Array.from(uniqueFolders).sort()
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  const query = searchQuery.value.toLowerCase().trim()
  
  return posts.value.filter(post => {
    const matchesFolder = selectedFolder.value === 'all' || (() => {
      const parts = post.path.split('/')
      return parts.length > 3 && parts[2] === selectedFolder.value
    })()

    const matchesSearch = !query ||
      post.title.toLowerCase().includes(query) ||
      (post.summary && post.summary.toLowerCase().includes(query)) ||
      (post.tags && post.tags.some((t: string) => t.toLowerCase().includes(query)))

    return matchesFolder && matchesSearch
  })
})

// Two-stage atomic boolean composition
const hasPosts = computed(() => Boolean(posts.value && posts.value.length > 0))
const hasFolders = computed(() => folders.value.length > 0)
const hasFilteredPosts = computed(() => filteredPosts.value.length > 0)
const postCountText = computed(() => `${posts.value?.length || 0}+ Dispatches`)

const selectFolder = (folder: string) => {
  selectedFolder.value = folder
}
</script>

<template>
  <UContainer class="max-w-[1100px] w-full flex flex-col gap-8 py-10">
    <OPageHero
      title="Writing & Devlogs"
      badge-text="Field Notes & Essays"
      badge-icon="i-lucide-book-open"
      :meta-text="postCountText"
      glow-primary="violet"
      glow-secondary="cyan"
      :primary-action="{
        label: 'Connect with XP',
        to: '/connect',
        color: 'primary',
        variant: 'solid',
        icon: 'i-lucide-mail',
        class: 'shadow-glow-violet'
      }"
      :secondary-action="{
        label: 'Executive Resume',
        to: '/resume',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-arrow-right'
      }"
    >
      <template #description>
        Field notes, systems architecture breakdowns, and sovereign digital philosophy by
        <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Xopher "XP" Pollard</span>.
      </template>
    </OPageHero>

    <div v-if="hasPosts" class="flex flex-col gap-6">
      <!-- Topic Filter Pills & Active Search Status -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div v-if="hasFolders" class="flex flex-wrap items-center gap-1.5">
          <span class="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500 shrink-0 mr-1">
            Topic:
          </span>
          <UButton
            :variant="selectedFolder === 'all' ? 'solid' : 'ghost'"
            :color="selectedFolder === 'all' ? 'primary' : 'neutral'"
            size="xs"
            class="rounded-lg transition-all capitalize"
            @click="selectFolder('all')"
          >
            All Topics
          </UButton>
          <UButton
            v-for="folder in folders"
            :key="folder"
            :variant="selectedFolder === folder ? 'solid' : 'ghost'"
            :color="selectedFolder === folder ? 'primary' : 'neutral'"
            size="xs"
            class="rounded-lg transition-all capitalize"
            @click="selectFolder(folder)"
          >
            {{ folder }}
          </UButton>
        </div>
        <div v-if="searchQuery" class="flex items-center gap-2">
          <span class="text-xs text-zinc-500">
            Filtered by "<span class="text-violet-600 dark:text-cyan-400 font-semibold">{{ searchQuery }}</span>"
          </span>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-x"
            @click="searchQuery = ''"
          >
            Clear
          </UButton>
        </div>
      </div>

      <div class="relative">
        <TransitionGroup
          v-if="hasFilteredPosts"
          name="paper-grid"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          role="list"
        >
          <MPostPaperCard
            v-for="(post, index) in filteredPosts"
            :key="post.path"
            :post
            :index
          />
        </TransitionGroup>
        
        <div
          v-else
          class="py-16 px-8 text-center text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-zinc-200 dark:border-white/10 backdrop-blur-xl"
        >
          <p class="m-0 text-sm">No posts found in this category.</p>
        </div>
      </div>
    </div>
    
    <div
      v-else
      class="py-16 px-8 text-center text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-zinc-200 dark:border-white/10 backdrop-blur-xl"
    >
      <p class="m-0 text-sm">No posts yet. Check back soon.</p>
    </div>
  </UContainer>
</template>

<style scoped>
.paper-grid-enter-active,
.paper-grid-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.paper-grid-enter-from,
.paper-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>


<script setup lang="ts">
import { ref, computed } from 'vue'

const { data: posts } = await useAsyncData('posts-feed', () =>
  queryCollection('posts').order('date', 'DESC').all()
)

const formatDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const typeLabel = (type: string) => (type === 'short' ? 'Update' : 'Article')
const typeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')

const selectedFolder = ref('all')

const folders = computed(() => {
  if (!posts.value) return []
  const uniqueFolders = new Set<string>()
  posts.value.forEach(post => {
    // Determine folder from path (e.g. /posts/tech/filename -> 'tech')
    const parts = post.path.split('/')
    if (parts.length > 3) {
      uniqueFolders.add(parts[2])
    }
  })
  return Array.from(uniqueFolders).sort()
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (selectedFolder.value === 'all') return posts.value
  
  return posts.value.filter(post => {
    const parts = post.path.split('/')
    if (parts.length > 3) {
      return parts[2] === selectedFolder.value
    }
    return false
  })
})
</script>

<template>
  <div class="pt-[calc(56px+2rem)] px-8 pb-24 max-w-[900px] mx-auto w-full max-md:pt-8 max-md:px-6 max-md:pb-16">
    <header class="mb-12">
      <h1 class="font-display text-5xl font-extrabold tracking-[-0.04em] text-text-primary m-0 mb-2 max-md:text-[2.2rem]">Posts</h1>
      <p class="text-[1.1rem] text-text-secondary m-0">Thoughts, devlogs, and updates.</p>
    </header>

    <div v-if="posts && posts.length">
      <div v-if="folders.length > 0" class="flex flex-wrap gap-3 mb-8">
        <button 
          @click="selectedFolder = 'all'" 
          class="px-4 py-1.5 rounded-full text-[0.85rem] font-bold tracking-[0.05em] uppercase transition-all duration-200 cursor-pointer border"
          :class="selectedFolder === 'all' ? 'bg-accent/20 text-text-primary border-accent/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:text-text-secondary'"
        >
          All
        </button>
        <button 
          v-for="folder in folders" 
          :key="folder"
          @click="selectedFolder = folder" 
          class="px-4 py-1.5 rounded-full text-[0.85rem] font-bold tracking-[0.05em] uppercase transition-all duration-200 cursor-pointer border"
          :class="selectedFolder === folder ? 'bg-accent/20 text-text-primary border-accent/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:text-text-secondary'"
        >
          {{ folder }}
        </button>
      </div>

      <div class="relative">
        <TransitionGroup name="list" tag="div" v-if="filteredPosts.length" class="flex flex-col gap-6 relative" role="list">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.path"
            :to="post.path"
            class="group relative overflow-hidden flex flex-col gap-4 px-8 py-6 text-text-primary no-underline transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)] max-md:px-6 max-md:py-5 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_40px_rgba(0,0,0,0.35),0_0_20px_rgba(139,92,246,0.06)]"
            :style="{ '--type-color': typeColor(post.type ?? 'article') }"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 opacity-50 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:w-1.5" :style="{ backgroundColor: 'var(--type-color)' }" />
            <div class="flex items-center gap-3">
               <span class="text-[0.7rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border" :style="{ color: 'var(--type-color)', backgroundColor: 'color-mix(in srgb, var(--type-color) 15%, transparent)', borderColor: 'color-mix(in srgb, var(--type-color) 25%, transparent)' }">{{ typeLabel(post.type ?? 'article') }}</span>
              <time class="text-[0.85rem] font-medium text-text-muted" :datetime="post.date">{{ formatDate(post.date) }}</time>
            </div>
            <h2 class="font-display text-2xl font-bold text-text-primary m-0 leading-[1.3]" v-if="post.type !== 'short'">{{ post.title }}</h2>
            <p class="text-base leading-[1.6] text-text-secondary m-0">{{ post.summary }}</p>
          </NuxtLink>
        </TransitionGroup>
        
        <div v-else class="py-16 px-8 text-center text-text-secondary bg-white/5 rounded-2xl border border-dashed border-white/15 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.25)]">
          <p>No posts found in this category.</p>
        </div>
      </div>
    </div>
    
    <div v-else class="py-16 px-8 text-center text-text-secondary bg-white/5 rounded-2xl border border-dashed border-white/15 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.25)]">
      <p>No posts yet. Check back soon.</p>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>

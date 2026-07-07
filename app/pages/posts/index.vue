<script setup lang="ts">
const { data: posts } = await useAsyncData('posts-feed', () =>
  queryCollection('posts').order('date', 'DESC').all()
)

const formatDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const typeLabel = (type: string) => (type === 'short' ? 'Update' : 'Article')
const typeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')
</script>

<template>
  <div class="posts-index-container">
    <header class="page-header">
      <h1 class="page-title">Posts</h1>
      <p class="page-lead">Thoughts, devlogs, and updates.</p>
    </header>

    <div v-if="posts && posts.length" class="post-grid" role="list">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        class="post-card glass-card"
        :style="{ '--type-color': typeColor(post.type ?? 'article') }"
      >
        <div class="card-meta">
          <span class="card-badge">{{ typeLabel(post.type ?? 'article') }}</span>
          <time class="card-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
        <h2 class="card-title" v-if="post.type !== 'short'">{{ post.title }}</h2>
        <p class="card-summary">{{ post.summary }}</p>
      </NuxtLink>
    </div>
    
    <div v-else class="empty-state">
      <p>No posts yet. Check back soon.</p>
    </div>
  </div>
</template>

<style scoped>
.posts-index-container {
  padding: 4rem 2rem 6rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.page-header {
  margin-bottom: 3rem;
}

.page-title {
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-primary, #f4f4f5);
  margin: 0 0 0.5rem;
}

.page-lead {
  font-size: 1.1rem;
  color: var(--text-secondary, #a1a1aa);
  margin: 0;
}

.post-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 2rem;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--type-color);
  opacity: 0.5;
  transition: opacity 0.2s ease, width 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.post-card:hover::before {
  opacity: 1;
  width: 6px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--type-color);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--type-color) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--type-color) 25%, transparent);
}

.card-date {
  font-size: 0.85rem;
  color: var(--text-muted, #71717a);
  font-weight: 500;
}

.card-title {
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.card-summary {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

@media (max-width: 860px) {
  .posts-index-container {
    padding: 2rem 1.5rem 4rem;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .post-card {
    padding: 1.25rem 1.5rem;
  }
}
</style>

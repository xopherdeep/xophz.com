<script setup lang="ts">
const route = useRoute()
const normalizedPath = route.path.replace(/\/$/, '') || '/'

const { data: post } = await useAsyncData(`post-${normalizedPath}`, () =>
  queryCollection('posts').path(normalizedPath).first()
)

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
  <main class="post-shell">
    <div class="orb orb-purple" aria-hidden="true" />
    <div class="orb orb-cyan" aria-hidden="true" />

    <div class="post-content" v-if="post">
      <nav class="post-nav">
        <NuxtLink to="/posts" class="back-link" aria-label="Back to posts">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m12 19-7-7 7-7M5 12h14" />
          </svg>
          All posts
        </NuxtLink>
      </nav>

      <article class="article-body">
        <header class="article-header">
          <div class="article-meta">
            <span
              class="post-type-badge"
              :style="{ '--type-color': typeColor(post.type ?? 'article') }"
            >
              {{ typeLabel(post.type ?? 'article') }}
            </span>
            <time class="post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>

          <h1 class="article-title">{{ post.title }}</h1>

          <p v-if="post.summary" class="article-summary">{{ post.summary }}</p>

          <div v-if="post.tags && post.tags.length" class="tag-row-sm">
            <span v-for="tag in post.tags" :key="tag" class="tag-sm">{{ tag }}</span>
          </div>
        </header>

        <div class="prose glass-card">
          <ContentRenderer :value="post" />
        </div>

        <footer class="article-footer">
          <p class="share-label">Share this post</p>
          <div class="share-row" role="group" aria-label="Share options">
            <a
              id="share-twitter"
              :href="twitterShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-btn share-twitter"
              aria-label="Share on X / Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>

            <a
              id="share-linkedin"
              :href="linkedinShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-btn share-linkedin"
              aria-label="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            <a
              id="share-reddit"
              :href="redditShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-btn share-reddit"
              aria-label="Share on Reddit"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
              Reddit
            </a>

            <button
              id="share-copy"
              class="share-btn share-copy"
              :class="{ copied: copySuccess }"
              aria-label="Copy link"
              @click="copyLink"
            >
              <svg v-if="!copySuccess" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {{ copySuccess ? 'Copied!' : 'Copy link' }}
            </button>
          </div>
        </footer>
      </article>
    </div>
  </main>
</template>

<style scoped>
  .post-shell {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: #0a0a12;
    font-family: var(--font-body, 'Inter', sans-serif);
    color: var(--text-primary, #f4f4f5);
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
    animation: driftOrb 22s ease-in-out infinite;
  }

  .orb-purple {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%);
    top: -5%;
    right: -10%;
    animation-duration: 24s;
  }

  .orb-cyan {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%);
    bottom: 15%;
    left: -8%;
    animation-delay: -10s;
    animation-duration: 28s;
  }

  @keyframes driftOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(24px, -16px) scale(1.04); }
    66% { transform: translate(-16px, 12px) scale(0.97); }
  }

  .post-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 680px;
    padding: 2rem 1.25rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-nav {
    padding-top: 0.5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent, #8b5cf6);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .back-link:hover { opacity: 1; }

  .back-link svg {
    width: 14px;
    height: 14px;
  }

  .article-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .article-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .post-type-badge {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--type-color, #8b5cf6);
    background: color-mix(in srgb, var(--type-color, #8b5cf6) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--type-color, #8b5cf6) 30%, transparent);
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
  }

  .post-date {
    font-size: 0.75rem;
    color: var(--text-muted, #71717a);
    letter-spacing: 0.04em;
  }

  .article-title {
    font-family: var(--font-display, 'Space Grotesk', sans-serif);
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.1;
    color: var(--text-primary, #f4f4f5);
    margin: 0;
  }

  .article-summary {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
  }

  .tag-row-sm {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tag-sm {
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted, #71717a);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.35);
  }

  .prose {
    padding: 2rem 1.75rem;
    line-height: 1.8;
    font-size: 0.95rem;
    color: var(--text-secondary, #a1a1aa);
  }

  .prose :deep(h1),
  .prose :deep(h2),
  .prose :deep(h3) {
    font-family: var(--font-display, 'Space Grotesk', sans-serif);
    color: var(--text-primary, #f4f4f5);
    letter-spacing: -0.02em;
    margin: 1.75rem 0 0.75rem;
  }

  .prose :deep(h2) { font-size: 1.35rem; font-weight: 700; }
  .prose :deep(h3) { font-size: 1.1rem; font-weight: 600; }

  .prose :deep(p) { margin: 0 0 1.1rem; }

  .prose :deep(a) {
    color: var(--accent, #8b5cf6);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, #8b5cf6 40%, transparent);
    transition: text-decoration-color 0.2s ease;
  }

  .prose :deep(a:hover) { text-decoration-color: #8b5cf6; }

  .prose :deep(code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.2);
    padding: 0.1em 0.4em;
    border-radius: 4px;
    color: #c4b5fd;
  }

  .prose :deep(pre) {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 1.25rem 0;
  }

  .prose :deep(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
  }

  .prose :deep(blockquote) {
    border-left: 2px solid #8b5cf6;
    padding-left: 1rem;
    margin: 1.25rem 0;
    color: var(--text-muted, #71717a);
    font-style: italic;
  }

  .prose :deep(ul), .prose :deep(ol) {
    padding-left: 1.5rem;
    margin: 0.75rem 0 1.1rem;
  }

  .prose :deep(li) { margin-bottom: 0.35rem; }

  .prose :deep(hr) {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    margin: 2rem 0;
  }

  .article-footer {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .share-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted, #71717a);
    margin: 0;
  }

  .share-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid transparent;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .share-btn:hover { transform: translateY(-1px); }

  .share-btn svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  .share-twitter {
    background: rgba(228, 228, 231, 0.08);
    border-color: rgba(228, 228, 231, 0.15);
    color: #e4e4e7;
  }

  .share-twitter:hover {
    background: rgba(228, 228, 231, 0.14);
    border-color: rgba(228, 228, 231, 0.25);
  }

  .share-linkedin {
    background: rgba(10, 102, 194, 0.15);
    border-color: rgba(10, 102, 194, 0.3);
    color: #60a5fa;
  }

  .share-linkedin:hover {
    background: rgba(10, 102, 194, 0.22);
    border-color: rgba(10, 102, 194, 0.45);
  }

  .share-reddit {
    background: rgba(255, 69, 0, 0.1);
    border-color: rgba(255, 69, 0, 0.22);
    color: #f97316;
  }

  .share-reddit:hover {
    background: rgba(255, 69, 0, 0.16);
    border-color: rgba(255, 69, 0, 0.35);
  }

  .share-copy {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.22);
    color: #a78bfa;
    font-family: inherit;
  }

  .share-copy:hover {
    background: rgba(139, 92, 246, 0.16);
    border-color: rgba(139, 92, 246, 0.35);
  }

  .share-copy.copied {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.3);
    color: #34d399;
  }
</style>

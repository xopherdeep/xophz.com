<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Posts · xophz.com',
  description: 'Thoughts, devlogs, and updates from Xopher Pollard.',
  ogTitle: 'Posts · xophz.com',
  ogDescription: 'Thoughts, devlogs, and updates from Xopher Pollard.',
})

const { data: posts } = await useAsyncData('posts-feed', () =>
  queryCollection('posts').order('date', 'DESC').all()
)

const formatDate = (raw: string) =>
  new Date(raw).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const typeLabel = (type: string) => (type === 'short' ? 'Update' : 'Article')
const typeColor = (type: string) => (type === 'short' ? '#06b6d4' : '#8b5cf6')

const canvasRef = ref<HTMLCanvasElement | null>(null)
let rafId = 0
const NODE_COUNT = 40
const MAX_DIST = 140
const NODE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b']

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string; pulseOffset: number }

function buildNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 1,
    color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
    pulseOffset: Math.random() * Math.PI * 2,
  }))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  const ctx = canvas.getContext('2d')!
  let nodes: Node[] = []
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; nodes = buildNodes(canvas.width, canvas.height) }
  const draw = (t: number) => {
    const { width: w, height: h } = canvas
    ctx.clearRect(0, 0, w, h)
    for (const node of nodes) { node.x += node.vx; node.y += node.vy; if (node.x < 0 || node.x > w) node.vx *= -1; if (node.y < 0 || node.y > h) node.vy *= -1 }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]; const b = nodes[j]
        const dx = a.x - b.x; const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > MAX_DIST) continue
        const alpha = (1 - dist / MAX_DIST) * 0.18
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        grad.addColorStop(0, a.color); grad.addColorStop(1, b.color)
        ctx.strokeStyle = grad; ctx.globalAlpha = alpha; ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }
    }
    for (const node of nodes) {
      const pulse = Math.sin(t * 0.001 + node.pulseOffset) * 0.4 + 0.6
      ctx.globalAlpha = pulse * 0.75; ctx.fillStyle = node.color
      ctx.shadowColor = node.color; ctx.shadowBlur = 6
      ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0
    }
    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(draw)
  }
  resize()
  window.addEventListener('resize', resize)
  rafId = requestAnimationFrame(draw)
  onUnmounted(() => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) })
})
</script>

<template>
  <main class="page-shell">
    <canvas ref="canvasRef" class="particle-canvas" aria-hidden="true" />
    <div class="orb orb-purple" aria-hidden="true" />
    <div class="orb orb-cyan" aria-hidden="true" />
    <div class="orb orb-amber" aria-hidden="true" />

    <div class="page-content">
      <header class="page-header">
        <NuxtLink to="/" class="back-link" aria-label="Back to home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m12 19-7-7 7-7M5 12h14" />
          </svg>
          xophz.com
        </NuxtLink>
        <h1 class="page-title">Posts</h1>
        <p class="page-lead">Thoughts, devlogs, and updates.</p>
      </header>

      <div v-if="posts && posts.length" class="post-feed" aria-label="Posts">
        <article
          v-for="post in posts"
          :key="post._path"
          class="post-card glass-card"
          :style="{ '--type-color': typeColor(post.type ?? 'article') }"
        >
          <div class="post-meta">
            <span class="post-type-badge">{{ typeLabel(post.type ?? 'article') }}</span>
            <time class="post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>

          <template v-if="post.type === 'short'">
            <p class="post-body-short">{{ post.summary }}</p>
            <div v-if="post.tags && post.tags.length" class="tag-row-sm">
              <span v-for="tag in post.tags" :key="tag" class="tag-sm">{{ tag }}</span>
            </div>
          </template>

          <template v-else>
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-summary">{{ post.summary }}</p>
            <div class="post-footer">
              <div v-if="post.tags && post.tags.length" class="tag-row-sm">
                <span v-for="tag in post.tags" :key="tag" class="tag-sm">{{ tag }}</span>
              </div>
              <NuxtLink :to="post._path" class="read-more-link" :aria-label="`Read ${post.title}`">
                Read more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </template>
        </article>
      </div>

      <div v-else class="empty-state glass-card">
        <p>No posts yet. Check back soon.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .page-shell {
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

  .particle-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: driftOrb 20s ease-in-out infinite;
  }

  .orb-purple {
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    top: -8%;
    left: -12%;
    animation-duration: 22s;
  }

  .orb-cyan {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%);
    bottom: 10%;
    right: -8%;
    animation-delay: -8s;
    animation-duration: 26s;
  }

  .orb-amber {
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 55%;
    animation-delay: -15s;
    animation-duration: 30s;
  }

  @keyframes driftOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(28px, -18px) scale(1.05); }
    66% { transform: translate(-18px, 14px) scale(0.97); }
  }

  .page-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 600px;
    padding: 2rem 1.25rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
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
    width: fit-content;
  }

  .back-link:hover { opacity: 1; }

  .back-link svg {
    width: 14px;
    height: 14px;
  }

  .page-title {
    font-family: var(--font-display, 'Space Grotesk', sans-serif);
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--text-primary, #f4f4f5);
    margin: 0;
  }

  .page-lead {
    font-size: 0.9rem;
    color: var(--text-muted, #71717a);
    margin: 0;
  }

  .post-feed {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 1.25rem;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.35);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .post-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border-left: 2px solid var(--type-color, #8b5cf6);
    transition: border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }

  .post-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }

  .post-meta {
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
    font-size: 0.72rem;
    color: var(--text-muted, #71717a);
    letter-spacing: 0.04em;
  }

  .post-title {
    font-family: var(--font-display, 'Space Grotesk', sans-serif);
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary, #f4f4f5);
    margin: 0;
  }

  .post-summary, .post-body-short {
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
  }

  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
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

  .read-more-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent, #8b5cf6);
    text-decoration: none;
    transition: gap 0.2s ease, opacity 0.2s ease;
    flex-shrink: 0;
  }

  .read-more-link:hover { gap: 0.55rem; opacity: 0.9; }

  .read-more-link svg {
    width: 14px;
    height: 14px;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1.5rem;
    color: var(--text-muted, #71717a);
    font-size: 0.9rem;
  }
</style>

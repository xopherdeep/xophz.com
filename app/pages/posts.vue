<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
  <div class="posts-layout">
    <canvas
      ref="canvasRef"
      class="particle-canvas"
      aria-hidden="true"
    />
    <div
      class="orb orb-purple"
      aria-hidden="true"
    />
    <div
      class="orb orb-cyan"
      aria-hidden="true"
    />
    <div
      class="orb orb-amber"
      aria-hidden="true"
    />

    <div class="layout-container">
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
  .posts-layout {
    min-height: 100dvh;
    display: flex;
    background: #0a0a12;
    font-family: var(--font-body, 'Inter', sans-serif);
    color: var(--text-primary, #f4f4f5);
    position: relative;
    overflow: hidden;
  }

  .particle-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: driftOrb 20s ease-in-out infinite;
  }

  .orb-purple {
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
    top: -8%;
    left: -12%;
    animation-duration: 22s;
  }

  .orb-cyan {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
    bottom: 10%;
    right: -8%;
    animation-delay: -8s;
    animation-duration: 26s;
  }

  .orb-amber {
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
    top: 50%;
    left: 55%;
    animation-delay: -15s;
    animation-duration: 30s;
  }

  @keyframes driftOrb {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }

    33% {
      transform: translate(28px, -18px) scale(1.05);
    }

    66% {
      transform: translate(-18px, 14px) scale(0.97);
    }
  }

  .layout-container {
    display: flex;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    height: 100dvh;
  }

  .main-content {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    position: relative;
    background: transparent;
    display: flex;
    flex-direction: column;
  }

  .main-content::-webkit-scrollbar {
    width: 6px;
  }

  .main-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .main-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  @media (max-width: 860px) {
    .main-content {
      width: 100%;
    }
  }
</style>

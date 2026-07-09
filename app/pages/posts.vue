<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'

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

const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  if (reducedMotion.value) return
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
  <div class="min-h-dvh flex bg-transparent font-body text-text-primary relative overflow-x-hidden">
    <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40" aria-hidden="true" />
    
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_22s_ease-in-out_infinite] w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] -top-[8%] -left-[12%]" aria-hidden="true" />
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_26s_ease-in-out_infinite_-8s] w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] bottom-[10%] -right-[8%]" aria-hidden="true" />
    <div class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_30s_ease-in-out_infinite_-15s] w-[240px] h-[240px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] top-[50%] left-[55%]" aria-hidden="true" />

    <div class="flex w-full max-w-[1440px] mx-auto relative z-10">
      <main class="flex-1 relative bg-transparent flex flex-col md:max-w-full w-full">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

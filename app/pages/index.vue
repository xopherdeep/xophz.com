<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useMediaQuery, useLocalStorage } from '@vueuse/core'

useSeoMeta({
  title: 'Xopher "XP" Pollard',
  description: 'Principal Systems Synthesist · 25+ years building massive-scale software · CTO, Architect, Founder.',
})

// --- Theme state ---
type ThemeKey = 'cinematic' | 'hud' | 'bento' | 'split'
const activeTheme = useLocalStorage<ThemeKey>('xophz-theme', 'cinematic')

// --- Canvas particle network ---
const canvasRef = ref<HTMLCanvasElement | null>(null)
let rafId = 0
const NODE_COUNT = 55
const MAX_DIST = 160
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
  if (!canvas || reducedMotion.value) return
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
  <main class="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Canvas particle network -->
    <canvas
      ref="canvasRef"
      class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />

    <!-- Ambient orbs -->
    <div
      class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_20s_ease-in-out_infinite] w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(139,92,246,0.22)_0%,transparent_70%)] -top-[10%] -left-[15%]"
      aria-hidden="true"
    />
    <div
      class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_24s_ease-in-out_infinite_-7s] w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)] bottom-[5%] -right-[10%]"
      aria-hidden="true"
    />
    <div
      class="fixed rounded-full blur-[80px] pointer-events-none z-0 animate-[driftOrb_28s_ease-in-out_infinite_-14s] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(245,158,21,0.12)_0%,transparent_70%)] top-[50%] left-[60%]"
      aria-hidden="true"
    />

    <!-- Theme content -->
    <div class="relative z-10 w-full pt-[56px] pb-[70px] flex-1 flex flex-col">
      <Transition
        enter-active-class="animate-[fadeUp_0.45s_cubic-bezier(0.16,1,0.3,1)_both]"
        leave-active-class="animate-[fadeDown_0.25s_ease_both]"
        mode="out-in"
      >
        <ThemesCinematicHero
          v-if="activeTheme === 'cinematic'"
          key="cinematic"
        />
        <ThemesCommandCenterHud
          v-else-if="activeTheme === 'hud'"
          key="hud"
        />
        <ThemesBentoGrid
          v-else-if="activeTheme === 'bento'"
          key="bento"
        />
        <ThemesSplitScreen
          v-else-if="activeTheme === 'split'"
          key="split"
        />
      </Transition>
    </div>

    <!-- Theme toggle -->
    <ThemeToggle v-model="activeTheme" />
  </main>
</template>

<style>
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeDown {
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  @keyframes spinGlow {
    0% {
      filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
    }

    50% {
      filter: hue-rotate(30deg) drop-shadow(0 0 14px rgba(6, 182, 212, 0.5));
    }

    100% {
      filter: hue-rotate(0deg) drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
    }
  }

  @keyframes driftOrb {

    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }

    33% {
      transform: translate(30px, -20px) scale(1.06);
    }

    66% {
      transform: translate(-20px, 15px) scale(0.96);
    }
  }
</style>

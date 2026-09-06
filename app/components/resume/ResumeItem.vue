<script setup lang="ts">
interface BulletItem {
  title: string
  detail: string
}

interface Props {
  role: string
  period: string
  company: string
  location?: string
  bullets: BulletItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2.5 pb-4 last:pb-0 border-b last:border-b-0 border-white/[0.04]">
    <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
      <div class="flex flex-wrap items-baseline gap-2">
        <h3 class="font-display text-sm sm:text-base font-bold text-text-primary tracking-[-0.01em]">
          {{ role }}
        </h3>
        <span class="text-xs font-semibold text-accent-2 italic">
          {{ company }}
        </span>
        <span v-if="location" class="text-[0.7rem] text-text-muted">
          ({{ location }})
        </span>
      </div>
      <span class="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-accent px-2 py-0.5 rounded-md bg-accent/10 shrink-0 self-start sm:self-auto">
        {{ period }}
      </span>
    </div>

    <ul class="list-none p-0 m-0 flex flex-col gap-2">
      <li
        v-for="(b, idx) in bullets"
        :key="idx"
        class="text-xs sm:text-[0.82rem] leading-[1.65] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/70"
      >
        <strong class="font-semibold text-text-primary">{{ b.title }}:</strong> {{ b.detail }}
      </li>
    </ul>
  </div>
</template>

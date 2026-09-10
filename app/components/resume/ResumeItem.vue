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
  <div class="flex flex-col gap-2.5 pb-4 last:pb-0 border-b last:border-b-0 border-zinc-100 dark:border-white/[0.04]">
    <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
      <div class="flex flex-wrap items-baseline gap-2">
        <h3 class="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {{ role }}
        </h3>
        <span class="text-xs font-semibold text-cyan-600 dark:text-cyan-400 italic">
          {{ company }}
        </span>
        <span v-if="location" class="text-[0.7rem] text-zinc-400 dark:text-zinc-500">
          ({{ location }})
        </span>
      </div>
      <span class="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md bg-violet-500/10 shrink-0 self-start sm:self-auto">
        {{ period }}
      </span>
    </div>

    <ul class="list-none p-0 m-0 flex flex-col gap-2">
      <li
        v-for="(b, idx) in bullets"
        :key="idx"
        class="text-xs sm:text-[0.82rem] leading-[1.65] text-zinc-600 dark:text-zinc-400 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-violet-500/70"
      >
        <strong class="font-semibold text-zinc-800 dark:text-zinc-200">{{ b.title }}:</strong> {{ b.detail }}
      </li>
    </ul>
  </div>
</template>

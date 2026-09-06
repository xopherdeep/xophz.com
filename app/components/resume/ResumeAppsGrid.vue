<script setup lang="ts">
import { ArrowUpRight as LucideArrowUpRight } from '@lucide/vue'

interface FlagshipApp {
  name: string
  category: string
  tagline: string
  desc: string
  url?: string
  color: string
}

interface Props {
  apps: FlagshipApp[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div
      v-for="app in apps"
      :key="app.name"
      class="group relative flex flex-col justify-between p-4 sm:p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl transition-all duration-300 hover:border-[color:var(--app-c)]/40 hover:bg-white/[0.06]"
      :style="{ '--app-c': app.color }"
    >
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[color:var(--app-c)] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            {{ app.category }}
          </span>
          <a
            v-if="app.url"
            :href="app.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[0.65rem] font-semibold text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors no-underline"
          >
            Visit <LucideArrowUpRight class="w-3 h-3" />
          </a>
        </div>
        <h4 class="font-display text-sm sm:text-base font-bold text-text-primary group-hover:text-[color:var(--app-c)] transition-colors">
          {{ app.name }}
        </h4>
        <p class="text-xs font-medium text-accent-2">
          {{ app.tagline }}
        </p>
        <p class="text-xs text-text-secondary leading-[1.6]">
          {{ app.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

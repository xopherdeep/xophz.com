<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title: string
  icon?: Component
  badge?: string
}

defineProps<Props>()
</script>

<template>
  <section class="flex flex-col gap-4 p-6 sm:p-7 bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl shadow-glass-shadow transition-all duration-300 hover:border-accent/20">
    <div class="flex items-center justify-between pb-3 border-b border-white/[0.08]">
      <div class="flex items-center gap-2.5">
        <component
          :is="icon"
          v-if="icon"
          class="w-4 h-4 text-accent shrink-0"
        />
        <h2 class="font-display text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-text-primary">
          {{ title }}
        </h2>
      </div>
      <span
        v-if="badge"
        class="text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-accent-2 px-2.5 py-0.5 rounded-full bg-accent-2/10 border border-accent-2/20"
      >
        {{ badge }}
      </span>
    </div>
    <div class="flex flex-col gap-3">
      <slot />
    </div>
  </section>
</template>

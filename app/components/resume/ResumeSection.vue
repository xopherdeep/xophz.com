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
  <UCard variant="outline" class="flex flex-col gap-4">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <component
            :is="icon"
            v-if="icon"
            class="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0"
          />
          <h2 class="font-display text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
            {{ title }}
          </h2>
        </div>
        <UBadge
          v-if="badge"
          color="primary"
          variant="subtle"
          size="xs"
        >
          {{ badge }}
        </UBadge>
      </div>
    </template>

    <div class="flex flex-col gap-3">
      <slot />
    </div>
  </UCard>
</template>

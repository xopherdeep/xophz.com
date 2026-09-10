<script setup lang="ts">
interface FlagshipApp {
  name: string
  category: string
  tagline: string
  desc: string
  url?: string
}

interface Props {
  apps: FlagshipApp[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <UCard
      v-for="app in apps"
      :key="app.name"
      variant="outline"
      class="flex flex-col justify-between hover:border-primary-500/50 transition-colors"
    >
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <UBadge
            color="primary"
            variant="subtle"
            size="xs"
          >
            {{ app.category }}
          </UBadge>
          <UButton
            v-if="app.url"
            :to="app.url"
            target="_blank"
            variant="ghost"
            color="neutral"
            size="xs"
            trailing-icon="i-lucide-arrow-up-right"
          >
            Visit
          </UButton>
        </div>
        <h3 class="font-display text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
          {{ app.name }}
        </h3>
        <p class="text-xs font-medium text-primary-600 dark:text-primary-400">
          {{ app.tagline }}
        </p>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {{ app.desc }}
        </p>
      </div>
    </UCard>
  </div>
</template>

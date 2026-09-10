<script setup lang="ts">
import { useConnectChannelsController } from './m-connect-channels.controller'

const { groups, hasGroups } = useConnectChannelsController()
</script>

<template>
  <section v-if="hasGroups" class="m-connect-channels flex flex-col gap-5">
    <!-- Section Title -->
    <div class="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]">
      <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <UIcon name="i-lucide-network" class="w-5 h-5 text-violet-500" />
        Direct Channels & Profiles
      </h2>
    </div>

    <!-- 4-Column Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Direct channels and profile links">
      <div
        v-for="group in groups"
        :key="group.id"
        class="flex flex-col gap-2.5"
      >
        <!-- Column Header -->
        <div class="flex items-center gap-2 px-1 pb-1 border-b border-zinc-200/60 dark:border-white/[0.06]">
          <UIcon :name="group.icon" class="w-4 h-4 shrink-0" :style="{ color: group.color }" />
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            {{ group.title }}
          </h3>
        </div>

        <!-- Links in Column -->
        <nav class="flex flex-col gap-2" :aria-label="group.title">
          <a
            v-for="link in group.links"
            :key="link.id"
            :href="link.href"
            :target="link.href.startsWith('/') ? undefined : '_blank'"
            :rel="link.href.startsWith('/') ? undefined : 'noopener noreferrer'"
            class="xo-shine-on-hover group relative overflow-hidden flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] text-zinc-900 dark:text-zinc-100 no-underline transition-all duration-300 backdrop-blur-xl hover:bg-zinc-50 dark:hover:bg-white/[0.06] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            :style="{ '--link-color': link.color }"
          >
            <!-- Hover glow -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,var(--link-color),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06] dark:group-hover:opacity-[0.08]" />

            <span class="w-4 h-4 shrink-0 flex items-center justify-center" :style="{ color: link.color }">
              <UIcon :name="link.icon" class="w-full h-full" />
            </span>
            <span class="flex-1 text-[0.84rem] font-medium truncate">{{ link.label }}</span>
            <UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5 text-zinc-400 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use './m-connect-channels';
</style>

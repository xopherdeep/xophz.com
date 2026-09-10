<script setup lang="ts">
import { ref } from 'vue'
import { useCommandPalette } from '~/composables/useCommandPalette'

const {
  searchQuery, selectedCategory, selectedIndex, categoryTabs,
  filteredCommands, selectCategory, executeCommand
} = useCommandPalette()

const failedImages = ref<Record<string, boolean>>({})
const onImageError = (id: string) => { failedImages.value[id] = true }
</script>

<template>
  <div class="m-command-dropdown flex flex-col max-h-[540px] w-full min-w-[320px] sm:min-w-[620px]">
    <!-- Category Tabs Ribbon -->
    <div class="flex items-center gap-2 p-3 border-b border-zinc-200/50 dark:border-white/10 overflow-x-auto no-scrollbar">
      <UButton
        v-for="tab in categoryTabs"
        :key="tab.id"
        size="xs"
        :variant="selectedCategory === tab.id ? 'solid' : 'ghost'"
        :color="selectedCategory === tab.id ? 'primary' : 'neutral'"
        :icon="tab.logoUrl && !failedImages['tab-' + tab.id] ? undefined : tab.icon"
        class="rounded-xl shrink-0 text-xs px-3 py-1.5 font-medium transition-all"
        @mousedown.prevent="selectCategory(tab.id)"
      >
        <template v-if="tab.logoUrl && !failedImages['tab-' + tab.id]" #leading>
          <img :src="tab.logoUrl" :alt="tab.label" class="w-3.5 h-3.5 object-contain shrink-0" @error="onImageError('tab-' + tab.id)">
        </template>
        {{ tab.label }}
      </UButton>
    </div>

    <!-- Results List -->
    <div class="flex-1 overflow-y-auto p-3 space-y-1.5 max-h-[380px]">
      <div
        v-for="(cmd, index) in filteredCommands"
        :key="cmd.id"
        class="flex items-center justify-between gap-3.5 p-3 rounded-2xl cursor-pointer transition-all text-left"
        :class="index === selectedIndex
          ? 'bg-violet-500/10 dark:bg-cyan-500/15 border border-violet-500/35 dark:border-cyan-500/35 shadow-sm'
          : 'hover:bg-zinc-100/80 dark:hover:bg-white/5 border border-transparent'"
        @mousedown.prevent="executeCommand(cmd)"
        @mouseenter="selectedIndex = index"
      >
        <div class="flex items-center gap-3.5 min-w-0">
          <img
            v-if="cmd.logoUrl && !failedImages[cmd.id]"
            :src="cmd.logoUrl"
            :alt="cmd.title"
            class="w-10 h-10 object-contain shrink-0 drop-shadow-md pointer-events-none"
            loading="lazy"
            @error="onImageError(cmd.id)"
          >
          <div
            v-else
            class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5"
            :style="{ color: cmd.iconColor || '#62c9ff' }"
          >
            <UIcon :name="cmd.icon" class="w-5 h-5" />
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ cmd.title }}</span>
              <span v-if="cmd.badge" class="text-[0.7rem] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 shrink-0 font-medium">
                {{ cmd.badge }}
              </span>
            </div>
            <span v-if="cmd.subtitle" class="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{{ cmd.subtitle }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 shrink-0">
          <span class="text-[0.7rem] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">{{ cmd.categoryLabel }}</span>
          <span v-if="index === selectedIndex" class="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-cyan-400 bg-violet-500/10 dark:bg-cyan-500/10 px-2 py-1 rounded-lg border border-violet-500/25 dark:border-cyan-500/25">Open <UIcon name="i-lucide-corner-down-left" class="w-3.5 h-3.5" /></span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCommands.length === 0" class="py-12 px-6 text-center flex flex-col items-center gap-2">
        <UIcon name="i-lucide-radar" class="w-10 h-10 text-zinc-400 opacity-50" />
        <p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">No matching commands found for "{{ searchQuery }}"</p>
        <p class="text-xs text-zinc-400">Try searching for "bazaar", "terminal", "dark mode", "resume", or switch categories</p>
      </div>
    </div>

    <!-- Footer Controls -->
    <div class="flex items-center justify-between px-4 py-3 border-t border-zinc-200/50 dark:border-white/10 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-black/30">
      <div class="flex items-center gap-3.5">
        <span class="flex items-center gap-1"><UKbd size="xs">↑</UKbd><UKbd size="xs">↓</UKbd> Navigate</span>
        <span class="flex items-center gap-1"><UKbd size="xs">↵</UKbd> Select</span>
        <span class="flex items-center gap-1"><UKbd size="xs">ESC</UKbd> Close</span>
      </div>
      <span class="text-violet-600 dark:text-cyan-400 font-semibold">{{ filteredCommands.length }} results</span>
    </div>
  </div>
</template>

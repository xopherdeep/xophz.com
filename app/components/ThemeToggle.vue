<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Film as LucideFilm,
  Monitor as LucideMonitor,
  LayoutGrid as LucideLayoutGrid,
  Columns2 as LucideColumns2,
} from '@lucide/vue'

const themes = [
  { key: 'cinematic', label: 'Cinematic', icon: LucideFilm },
  { key: 'hud', label: 'Command Center', icon: LucideMonitor },
  { key: 'bento', label: 'Bento', icon: LucideLayoutGrid },
  { key: 'split', label: 'Split', icon: LucideColumns2 },
]

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const expanded = ref(false)
const toggle = () => { expanded.value = !expanded.value }
const selectTheme = (key: string) => {
  emit('update:modelValue', key)
  expanded.value = false
}

const currentTheme = computed(() => themes.find(t => t.key === props.modelValue))
const currentIndex = computed(() => themes.findIndex(t => t.key === props.modelValue))
</script>

<template>
  <div class="fixed bottom-[90px] right-4 z-[90] md:bottom-8 md:right-8 flex flex-col items-end gap-2">
    <!-- Expanded menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div v-if="expanded" class="flex flex-col gap-1.5 p-2 rounded-2xl bg-[#0c0c18]/80 backdrop-blur-[32px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        <button
          v-for="theme in themes"
          :key="theme.key"
          class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[0.78rem] font-medium cursor-pointer transition-all duration-200 border border-transparent whitespace-nowrap"
          :class="theme.key === modelValue
            ? 'bg-accent/15 border-accent/35 text-text-primary'
            : 'bg-transparent text-text-muted hover:bg-white/8 hover:text-text-secondary'"
          @click="selectTheme(theme.key)"
        >
          <component :is="theme.icon" class="w-4 h-4 shrink-0" />
          {{ theme.label }}
        </button>
      </div>
    </Transition>

    <!-- Toggle pill -->
    <button
      class="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0c0c18]/70 backdrop-blur-[32px] border border-white/[0.08] cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.03)] hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_4px_24px_rgba(139,92,246,0.15)]"
      aria-label="Switch theme view"
      @click="toggle"
    >
      <component v-if="currentTheme" :is="currentTheme.icon" class="w-4 h-4 text-accent transition-transform duration-300" :class="{ 'rotate-180': expanded }" />
      <span class="text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-text-secondary group-hover:text-text-primary transition-colors duration-200">{{ currentTheme?.label }}</span>
    </button>
  </div>
</template>

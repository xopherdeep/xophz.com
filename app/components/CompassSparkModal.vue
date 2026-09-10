<script setup lang="ts">
import {
  X as LucideX,
  Sparkles as LucideSparkles,
  Layers as LucideLayers,
  Terminal as LucideTerminal,
  Calculator as LucideCalculator,
  Clock as LucideClock,
  Activity as LucideActivity,
  Bomb as LucideBomb,
  Compass as LucideCompass,
  ExternalLink as LucideExternalLink,
  Layout as LucideLayout,
  CheckCircle2 as LucideCheckCircle2
} from '@lucide/vue'
import type { Spark } from '../composables/useSparks'

interface Props {
  spark: Spark | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const logoLoadFailed = ref(false)

const iconMap: Record<string, any> = {
  sparkles: LucideSparkles,
  layers: LucideLayers,
  terminal: LucideTerminal,
  calculator: LucideCalculator,
  clock: LucideClock,
  activity: LucideActivity,
  bomb: LucideBomb,
  compass: LucideCompass,
}

const resolveIcon = (iconName?: string) => iconMap[iconName || ''] || LucideSparkles

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) emit('close')
}

useEventListener('keydown', handleKeydown)

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && spark"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 dark:bg-black/80 backdrop-blur-xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        :aria-label="spark.name"
        @click="handleBackdropClick"
      >
        <div
          class="relative w-full max-w-2xl my-auto rounded-3xl bg-white dark:bg-zinc-900/95 border border-zinc-200 dark:border-white/15 p-6 sm:p-8 shadow-glass-lg overflow-hidden backdrop-blur-2xl transition-all"
          :style="{ '--spark-color': spark.color }"
        >
          <!-- Ambient Halo -->
          <div
            class="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 dark:opacity-40"
            :style="{ backgroundColor: spark.color }"
          />
          <div
            class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10 dark:opacity-25"
            :style="{ backgroundColor: spark.color }"
          />

          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer z-20"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <LucideX class="w-4 h-4" />
          </button>

          <!-- Header -->
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-zinc-200 dark:border-white/10">
            <!-- Spark Artwork -->
            <div class="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <img
                v-if="!logoLoadFailed"
                :src="spark.logoUrl"
                :alt="spark.name"
                class="w-full h-full object-contain"
                :style="{ filter: `drop-shadow(0 0 16px ${spark.color}) drop-shadow(0 0 32px color-mix(in srgb, ${spark.color} 50%, transparent))` }"
                @error="logoLoadFailed = true"
              />
              <div
                v-else
                class="w-full h-full rounded-2xl flex items-center justify-center p-3 shadow-xl"
                :style="{ background: spark.gradient }"
              >
                <component :is="resolveIcon(spark.iconName)" class="w-12 h-12 text-white drop-shadow-md" />
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <UBadge color="primary" variant="subtle" size="xs">
                  {{ spark.category }}
                </UBadge>
                <span v-if="spark.group" class="px-2 py-0.5 rounded text-[0.62rem] font-mono font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400">
                  {{ spark.group }}
                </span>
                <span class="px-2.5 py-0.5 rounded text-[0.65rem] font-mono font-bold bg-cyan-50 dark:bg-white/5 border border-cyan-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400">
                  Standalone PWA
                </span>
                <span v-if="spark.tag" class="text-[0.65rem] font-medium text-zinc-400 dark:text-zinc-500">
                  {{ spark.tag }}
                </span>
              </div>

              <h2 class="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                {{ spark.name }}
              </h2>
              <p class="font-mono text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                {{ spark.codename }}
              </p>
            </div>
          </div>

          <!-- Body -->
          <div class="relative z-10 py-5 flex flex-col gap-5">
            <!-- Description -->
            <div>
              <h3 class="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500 mb-1.5">
                Operating Specification
              </h3>
              <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {{ spark.desc }}
              </p>
            </div>

            <!-- Specs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08]">
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Release</span>
                <span class="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {{ spark.version || 'v2.4.0' }}
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Engine</span>
                <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 block truncate" :title="spark.engine || 'Vue 3'">
                  {{ spark.engine || 'Vue 3' }}
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Execution</span>
                <span class="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  PWA (Lite Mode)
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Host Environment</span>
                <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 block">YouMeOS / Eumaeus</span>
              </div>
            </div>

            <!-- Standalone Execution Callout -->
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/30 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div class="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                <LucideCheckCircle2 class="w-4 h-4" />
                <span class="tracking-wide">Direct PWA Mode: Spikes the OS desktop chrome for focused execution.</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="relative z-10 pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <UButton
              :to="spark.webtopUrl"
              target="_blank"
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-layout"
              class="justify-center"
            >
              Open in Webtop
            </UButton>

            <UButton
              :to="spark.pwaUrl"
              target="_blank"
              color="primary"
              variant="solid"
              size="sm"
              icon="i-lucide-arrow-up-right"
              class="justify-center shadow-glow-violet"
            >
              Launch Standalone PWA
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

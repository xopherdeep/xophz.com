<script setup lang="ts">
import { useTimelineRailController } from './m-timeline-rail.controller'
import type { TimelineRailProps, TimelineRailEmits } from './types'

const props = defineProps<TimelineRailProps>()
const emit = defineEmits<TimelineRailEmits>()

const { treeBranches, canRenderTree, handleSelectNode } = useTimelineRailController(props, emit)
</script>

<template>
  <section v-if="canRenderTree" class="m-timeline-rail py-2">
    <UContainer class="max-w-[1100px] w-full">
      <div class="xo-card-glow rounded-2xl p-4 sm:p-5 bg-white/80 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-4 font-mono">
        <!-- Header -->
        <div class="flex items-center justify-between gap-2 px-1 border-b border-zinc-100 dark:border-white/[0.04] pb-2.5">
          <div class="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            <UIcon name="i-lucide-folder-tree" class="w-4 h-4 text-violet-500" />
            <span class="uppercase tracking-wider font-bold text-xs text-zinc-900 dark:text-zinc-100">
              Progression
            </span>
            <span class="text-zinc-400">/</span>
            <span class="text-[11px] text-zinc-500 dark:text-zinc-400">200X &rarr; Present</span>
          </div>
          <span class="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:inline">
            Click file to jump to milestone
          </span>
        </div>

        <!-- File Tree Grid -->
        <div class="m-timeline-rail__tree-container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[700px] md:min-w-0">
            <div
              v-for="branch in treeBranches"
              :key="branch.key"
              class="m-timeline-rail__branch p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.04] flex flex-col gap-2"
            >
              <!-- Folder Name -->
              <div class="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-bold text-xs">
                <UIcon :name="branch.icon" class="w-3.5 h-3.5 shrink-0" />
                <span class="truncate">{{ branch.dirName }}</span>
              </div>

              <!-- Nested Files / Nodes -->
              <div class="flex flex-col gap-1 pl-1">
                <button
                  v-for="node in branch.nodes"
                  :key="node.id"
                  type="button"
                  class="m-timeline-rail__node-btn group flex items-center gap-1.5 py-1 px-1.5 rounded text-left text-[11px] cursor-pointer"
                  :class="[
                    activeId === node.id
                      ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-white/[0.04]'
                  ]"
                  @click="handleSelectNode(node.id)"
                >
                  <span class="text-zinc-400 dark:text-zinc-600 select-none">
                    {{ node.isLast ? '└──' : '├──' }}
                  </span>
                  <span class="truncate flex-1">
                    {{ node.company }}
                  </span>
                  <span class="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                    {{ node.year }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-timeline-rail';
</style>

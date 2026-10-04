<script setup lang="ts">
import { useAuditCommandController } from './m-audit-command.controller'
import type { AuditCommandProps } from './types'

const { command = 'npx chemx audit', hint = '' } = defineProps<AuditCommandProps>()

const { copied, copyLabel, copyIcon, copyCommand } = useAuditCommandController(() => command)
</script>

<template>
  <div class="m-audit-command flex flex-col sm:flex-row sm:items-center gap-2.5">
    <button
      type="button"
      class="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 dark:bg-white/[0.06] border border-zinc-800 dark:border-white/[0.1] text-xs font-mono text-zinc-300 dark:text-zinc-200 hover:border-violet-500/60 transition-all cursor-pointer group shadow-sm"
      :aria-label="`Copy command: ${command}`"
      @click="copyCommand"
    >
      <span
        class="text-violet-400 font-bold"
        aria-hidden="true"
      >$</span>
      <span>{{ command }}</span>
      <span
        class="m-audit-command__badge inline-flex items-center gap-1 text-[0.68rem] px-1.5 py-0.5 rounded-md font-sans transition-colors text-zinc-400 group-hover:text-zinc-200"
        :class="{ 'm-audit-command__badge--copied': copied }"
      >
        <UIcon
          :name="copyIcon"
          class="w-3 h-3"
        />
        {{ copyLabel }}
      </span>
    </button>
    <span
      v-if="hint"
      class="text-[0.72rem] text-zinc-500 dark:text-zinc-400 font-body"
    >
      {{ hint }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  @use './m-audit-command';
</style>

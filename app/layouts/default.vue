<script setup lang="ts">
import MCommandBar from '~/components/molecules/m-command-bar/m-command-bar.vue'
import { MQrdModal } from '~/components/molecules/m-qrd-modal'

const { isOpen, closeQrd } = useQrdModal()
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden">
    <!-- Ambient Background Orbs -->
    <div class="xo-ambient-orb xo-ambient-orb--violet" aria-hidden="true" />
    <div class="xo-ambient-orb xo-ambient-orb--cyan" aria-hidden="true" />
    <div class="xo-ambient-orb xo-ambient-orb--amber" aria-hidden="true" />

    <MAppHeader />
    <UMain class="flex-1 flex flex-col w-full relative z-10 pb-28 md:pb-36">
      <slot />
    </UMain>
    <MAppFooter />

    <!-- Master Floating Search Bar in Bottom Center -->
    <aside
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] sm:w-[88vw] md:w-[720px] max-w-[760px] pointer-events-auto"
      aria-label="Site Command & Search"
    >
      <MCommandBar />
    </aside>

    <!-- Global Q'rd Digital Business Card Modal -->
    <MQrdModal :is-open="isOpen" @close="closeQrd" />
  </div>
</template>

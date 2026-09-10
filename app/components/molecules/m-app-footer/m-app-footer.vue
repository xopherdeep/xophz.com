<script setup lang="ts">
import { useAppFooterController } from './m-app-footer.controller'

const { currentYear, socialLinks, hasSocials, footerNav } = useAppFooterController()
</script>

<template>
  <footer class="m-app-footer relative z-10 border-t border-zinc-200 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl">
    <!-- Gradient accent line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" aria-hidden="true" />

    <UContainer class="max-w-4xl pt-8 pb-28 sm:pb-32">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <!-- Brand Column -->
        <div class="flex flex-col gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 no-underline group w-fit">
            <span class="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <span class="font-display font-bold text-xs text-violet-600 dark:text-violet-400">x</span>
            </span>
            <span class="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">
              xophz<span class="text-violet-600 dark:text-violet-400">.com</span>
            </span>
          </NuxtLink>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
            Principal Systems Synthesist. 25+ years building at scale.
          </p>
        </div>

        <!-- Navigation Column -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-500 mb-1">
            Navigate
          </span>
          <NuxtLink
            v-for="item in footerNav"
            :key="item.to"
            :to="item.to"
            class="text-xs text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors no-underline w-fit"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Social Column -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-500 mb-1">
            Connect
          </span>
          <div v-if="hasSocials" class="flex items-center flex-wrap gap-1">
            <UButton
              v-for="link in socialLinks"
              :key="link.label"
              :to="link.href"
              :icon="link.icon"
              :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
              color="neutral"
              variant="ghost"
              size="xs"
              :aria-label="link.label"
            />
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-[0.65rem] text-zinc-400 dark:text-zinc-500">
          (c) {{ currentYear }} Xopher "XP" Pollard. All rights reserved.
        </p>
        <p class="text-[0.65rem] text-zinc-400 dark:text-zinc-500">
          Built with Nuxt, Vue, and relentless precision.
        </p>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped lang="scss">
@use './m-app-footer';
</style>

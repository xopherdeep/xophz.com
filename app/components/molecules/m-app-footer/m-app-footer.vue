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
        <div class="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 no-underline group w-fit">
            <span class="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <span class="font-display font-bold text-xs text-violet-600 dark:text-violet-400">x</span>
            </span>
            <span class="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">
              xophz<span class="text-violet-600 dark:text-violet-400">.com</span>
            </span>
          </NuxtLink>
          <p class="text-[0.7rem] sm:text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-center sm:text-left sm:max-w-[220px] whitespace-nowrap sm:whitespace-normal">
            <span>Principal Systems Synthesist.</span> <span class="whitespace-nowrap">25+ years building at scale.</span>
          </p>
        </div>

        <!-- Navigation Column -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-600 dark:text-zinc-400 mb-1">
            Navigate
          </span>
          <nav class="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2 w-full overflow-x-auto sm:overflow-visible gap-1" aria-label="Footer Navigation">
            <NuxtLink
              v-for="item in footerNav"
              :key="item.to"
              :to="item.to"
              class="text-[0.7rem] sm:text-xs text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors no-underline whitespace-nowrap"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Social Column -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-600 dark:text-zinc-400 mb-1">
            Connect
          </span>
          <div v-if="hasSocials" class="flex items-center justify-between sm:justify-start sm:flex-wrap sm:gap-1 w-full">
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
      <div class="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/40 flex flex-col items-center text-center gap-1 text-[0.65rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>&copy;&nbsp;&nbsp;{{ currentYear }}&nbsp;Xopher "XP" Pollard.</p>
        <p class="text-zinc-600 dark:text-zinc-400">
          Built with Nuxt, Vue, and relentless precision.
        </p>
        <p>
          Secured in a <a href="https://www.blackboxwhiteglove.com" target="_blank" rel="noopener noreferrer" class="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors no-underline">Black<span class="font-bold">BOX</span></a> &bull; Powered by <NuxtLink to="/my-compass" class="text-sky-600 dark:text-[#62c9ff] hover:underline transition-colors font-medium">My Compass Software Suite</NuxtLink>
        </p>
        <p>
          Tesseracted<sup class="text-[0.55rem]">4</sup> across the <a href="https://www.worldwidewebwork.com" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-[#3dee98] hover:underline transition-colors font-medium">Worldwide Webwork</a> &bull; Forged at <a href="https://www.hallofthegods.com" target="_blank" rel="noopener noreferrer" class="text-amber-700 dark:text-[#d9be6f] hover:underline transition-colors font-medium">Hall of the Gods, Inc.</a>
        </p>
        <p class="text-zinc-600 dark:text-zinc-400">All Rights Reserved.</p>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped lang="scss">
@use './m-app-footer';
</style>

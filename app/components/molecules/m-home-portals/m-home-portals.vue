<script setup lang="ts">
import { useHomePortalsController } from './m-home-portals.controller'

const { portalList, hasPortals } = useHomePortalsController()
</script>

<template>
  <section
    v-if="hasPortals"
    class="m-home-portals pt-2 pb-12 md:pb-16"
    aria-labelledby="home-portals-heading"
  >
    <UContainer class="max-w-5xl">
      <div class="flex flex-col gap-1.5 mb-8 text-center md:text-left animate-ios-spring">
        <h2
          id="home-portals-heading"
          class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50"
        >
          Where I work
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 font-body">
          Four ventures, each with its own home. Start wherever fits.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <a
          v-for="(portal, idx) in portalList"
          :key="portal.key"
          :href="portal.url"
          target="_blank"
          rel="noopener noreferrer"
          class="m-home-portals__card group rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-3 animate-ios-spring"
          :style="{ '--portal-color': portal.color, animationDelay: `${180 + idx * 45}ms` }"
        >
          <div
            class="m-home-portals__wash"
            aria-hidden="true"
          />

          <div class="relative z-10 flex items-start gap-4">
            <div class="m-home-portals__chip w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
              <UIcon
                :name="portal.icon"
                class="w-5 h-5"
              />
            </div>
            <div class="flex flex-col gap-0.5 min-w-0">
              <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
                {{ portal.name }}
              </h3>
              <p class="m-home-portals__role text-xs font-semibold tracking-wide uppercase font-body">
                {{ portal.role }}
              </p>
            </div>
          </div>

          <p class="relative z-10 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-body">
            {{ portal.desc }}
          </p>

          <span class="relative z-10 mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
            {{ portal.linkLabel }}
            <UIcon
              name="i-lucide-arrow-up-right"
              class="w-3.5 h-3.5"
            />
          </span>
        </a>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-home-portals';
</style>

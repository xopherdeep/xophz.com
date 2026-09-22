<script setup lang="ts">
import { useCreativeStripController } from './m-creative-strip.controller'

const { creativeItems, hasCreativeItems } = useCreativeStripController()

const isExternal = (link: string) => link.startsWith('http')
</script>

<template>
  <section v-if="hasCreativeItems" class="m-creative-strip pt-12 pb-20 md:pt-16 md:pb-28 border-t border-zinc-200/40 dark:border-white/[0.04]">
    <UContainer class="max-w-4xl">
      <div class="mb-8 animate-ios-spring">
        <h2 class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">
          Creative Explorations &amp; Sonic Media
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Disciplines in audio architecture, visual narrative, and community networks.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <component
          v-for="(item, idx) in creativeItems"
          :key="item.key"
          :is="isExternal(item.link) ? 'a' : 'NuxtLink'"
          :href="isExternal(item.link) ? item.link : undefined"
          :to="!isExternal(item.link) ? item.link : undefined"
          :target="isExternal(item.link) ? '_blank' : undefined"
          :rel="isExternal(item.link) ? 'noopener noreferrer' : undefined"
          class="xo-card-glow xo-shine-on-hover group rounded-2xl p-5 md:p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 no-underline animate-ios-spring"
          :style="{ '--c-color': item.color, animationDelay: `${350 + idx * 40}ms` }"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/5 text-[color:var(--c-color)] shadow-sm"
              >
                <UIcon :name="item.icon" class="w-4 h-4" />
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
            <p class="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">
              {{ item.name }}
            </p>
            <p class="text-xs font-semibold text-[color:var(--c-color)] mb-2">
              {{ item.subtitle }}
            </p>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
              {{ item.desc }}
            </p>
          </div>
          <div class="mt-4 pt-2 border-t border-zinc-100 dark:border-white/[0.04]">
            <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-primary transition-colors">
              {{ item.linkLabel }}
            </span>
          </div>
        </component>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-creative-strip';
</style>

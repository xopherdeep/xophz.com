<script setup lang="ts">
import { useAboutPersonasController } from './m-about-personas.controller'

const { executiveList, creativeList, hasExecutive, hasCreative } = useAboutPersonasController()

const isExternal = (link: string) => link.startsWith('http')
</script>

<template>
  <section v-if="hasExecutive || hasCreative" class="m-about-personas py-6 space-y-10">
    <UContainer class="max-w-[1100px] w-full">
      <!-- Executive & Systems Architecture -->
      <div v-if="hasExecutive" class="mb-10">
        <h2
          class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-1"
          v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
        >
          Executive &amp; Technical Advisory
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Architectural advisory, high-throughput systems, and applied engineering.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <component
            v-for="(p, idx) in executiveList"
            :key="p.key"
            :is="isExternal(p.link) ? 'a' : 'NuxtLink'"
            :href="isExternal(p.link) ? p.link : undefined"
            :to="!isExternal(p.link) ? p.link : undefined"
            :target="isExternal(p.link) ? '_blank' : undefined"
            :rel="isExternal(p.link) ? 'noopener noreferrer' : undefined"
            class="xo-card-glow xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 no-underline"
            :style="{ '--pc': p.color }"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 + idx * 50 } } }"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <div
                  class="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white/5 border border-zinc-200/50 dark:border-white/10 text-[color:var(--pc)] transition-transform duration-300 group-hover:scale-110 shadow-sm"
                >
                  <UIcon :name="p.icon" class="w-5 h-5" />
                </div>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="w-4 h-4 text-zinc-400 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </div>
              <p class="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 mb-0.5">
                {{ p.name }}
              </p>
              <p class="text-xs font-semibold text-[color:var(--pc)] mb-2">
                {{ p.subtitle }}
              </p>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {{ p.desc }}
              </p>
            </div>
          </component>
        </div>
      </div>

      <!-- Creative Explorations -->
      <div v-if="hasCreative">
        <h2
          class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-1"
          v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
        >
          Creative Explorations &amp; Sonic Disciplines
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Audio architecture, visual narrative, and community networks.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <component
            v-for="(p, idx) in creativeList"
            :key="p.key"
            :is="isExternal(p.link) ? 'a' : 'NuxtLink'"
            :href="isExternal(p.link) ? p.link : undefined"
            :to="!isExternal(p.link) ? p.link : undefined"
            :target="isExternal(p.link) ? '_blank' : undefined"
            :rel="isExternal(p.link) ? 'noopener noreferrer' : undefined"
            class="xo-card-glow xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 no-underline"
            :style="{ '--pc': p.color }"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 + idx * 50 } } }"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <div
                  class="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white/5 border border-zinc-200/50 dark:border-white/10 text-[color:var(--pc)] transition-transform duration-300 group-hover:scale-110 shadow-sm"
                >
                  <UIcon :name="p.icon" class="w-5 h-5" />
                </div>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="w-4 h-4 text-zinc-400 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </div>
              <p class="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 mb-0.5">
                {{ p.name }}
              </p>
              <p class="text-xs font-semibold text-[color:var(--pc)] mb-2">
                {{ p.subtitle }}
              </p>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {{ p.desc }}
              </p>
            </div>
          </component>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-personas';
</style>

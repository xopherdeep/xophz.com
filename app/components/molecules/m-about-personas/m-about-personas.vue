<script setup lang="ts">
import { useAboutPersonasController } from './m-about-personas.controller'

const { personaItems, hasPersonas } = useAboutPersonasController()

const isExternal = (link: string) => link.startsWith('http')
</script>

<template>
  <section v-if="hasPersonas" class="m-about-personas py-6">
    <UContainer class="max-w-[1100px] w-full">
      <h2
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-6"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        Personas &amp; Creative Spectrum
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <component
          v-for="(p, idx) in personaItems"
          :key="p.key"
          :is="isExternal(p.link) ? 'a' : 'NuxtLink'"
          :href="isExternal(p.link) ? p.link : undefined"
          :to="!isExternal(p.link) ? p.link : undefined"
          :target="isExternal(p.link) ? '_blank' : undefined"
          :rel="isExternal(p.link) ? 'noopener noreferrer' : undefined"
          class="xo-card-glow xo-shine-on-hover group rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex gap-4 transition-all duration-300 no-underline"
          :style="{ '--pc': p.color }"
          v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 + idx * 60 } } }"
        >
          <div
            class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center bg-white/5 border border-zinc-200/50 dark:border-white/10 text-[color:var(--pc)] transition-transform duration-300 group-hover:scale-110 shadow-sm"
          >
            <UIcon :name="p.icon" class="w-6 h-6" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <p class="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                {{ p.name }}
              </p>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-zinc-400 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </div>
            <p class="text-xs font-semibold text-[color:var(--pc)] mb-1.5">
              {{ p.subtitle }}
            </p>
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ p.desc }}
            </p>
          </div>
        </component>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-personas';
</style>

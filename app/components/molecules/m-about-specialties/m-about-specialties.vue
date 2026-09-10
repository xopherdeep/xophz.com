<script setup lang="ts">
import { useAboutSpecialtiesController } from './m-about-specialties.controller'

const { specialtyItems, hasSpecialties } = useAboutSpecialtiesController()

const specialtyColors = ['cyan', 'violet', 'amber', 'emerald']
</script>

<template>
  <section v-if="hasSpecialties" class="m-about-specialties py-10">
    <UContainer class="max-w-[1100px] w-full">
      <h2
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-8"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        Specialized Practice Areas
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="(item, idx) in specialtyItems"
          :key="item.title"
          class="xo-card-glow xo-shine-on-hover group rounded-2xl p-6 md:p-7 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-4 transition-all duration-300"
          v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 80 + idx * 80 } } }"
        >
          <div class="flex items-start justify-between gap-4">
            <h3 class="font-bold font-display text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
              {{ item.title }}
            </h3>

            <!-- Large Icon Circle -->
            <div
              class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
              :class="[
                `bg-${specialtyColors[idx]}-500/10`,
                `text-${specialtyColors[idx]}-600`,
                `dark:text-${specialtyColors[idx]}-400`
              ]"
            >
              <UIcon :name="item.icon" class="w-6 h-6" />
            </div>
          </div>

          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-specialties';
</style>

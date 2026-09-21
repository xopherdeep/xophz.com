<script setup lang="ts">
import { useAboutSkillsController } from './m-about-skills.controller'

const { skillGroups, hasSkills } = useAboutSkillsController()
</script>

<template>
  <section v-if="hasSkills" class="m-about-skills py-6">
    <UContainer class="max-w-[1100px] w-full">
      <h2
        class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50 mb-6"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        Skills &amp; Stack
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        <div
          v-for="(group, idx) in skillGroups"
          :key="group.group"
          class="xo-card-glow rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
          v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0, transition: { delay: 80 + idx * 50 } } }"
        >
          <p class="text-xs font-bold tracking-[0.12em] uppercase text-violet-600 dark:text-violet-400 mb-4">
            {{ group.group }}
          </p>
          <ul class="list-none p-0 flex flex-col gap-2.5">
            <li
              v-for="skill in group.items"
              :key="skill"
              class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-about-skills';
</style>

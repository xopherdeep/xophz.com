<script setup lang="ts">
import { useFeaturedProjectsController } from './m-featured-projects.controller'

const { featuredList, hasProjects } = useFeaturedProjectsController()
</script>

<template>
  <section v-if="hasProjects" class="m-featured-projects py-14">
    <UContainer class="max-w-4xl">
      <!-- Section Header -->
      <div
        class="flex items-center justify-between mb-8"
        v-motion="{ initial: { opacity: 0, x: -15 }, enter: { opacity: 1, x: 0 } }"
      >
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">
            Selected Works
          </h2>
          <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Infrastructure platforms, spatial computing engines, and sovereign tools.
          </p>
        </div>
        <UButton
          to="/projects"
          variant="ghost"
          color="primary"
          trailing-icon="i-lucide-arrow-right"
          size="sm"
        >
          All Works
        </UButton>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(proj, idx) in featuredList"
          :key="proj.name"
          class="xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--proj-color)]/40 dark:hover:border-[color:var(--proj-color)]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 flex flex-col justify-between"
          :style="{ '--proj-color': proj.color || '#8b5cf6' }"
          v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 + idx * 80 } } }"
        >
          <div class="flex flex-col gap-3">
            <!-- Header -->
            <div class="flex items-start justify-between gap-3">
              <!-- Color accent dot + name -->
              <div class="flex items-center gap-2.5 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_var(--proj-color)]"
                  :style="{ backgroundColor: proj.color || '#8b5cf6' }"
                />
                <span class="font-bold text-base font-display text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                  {{ proj.name }}
                </span>
              </div>
              <UBadge color="primary" variant="subtle" size="xs" class="shrink-0">
                {{ proj.tag }}
              </UBadge>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
              {{ proj.desc }}
            </p>
          </div>

          <!-- Footer -->
          <div v-if="proj.url" class="flex justify-end mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.04]">
            <UButton
              :to="proj.url"
              target="_blank"
              variant="ghost"
              color="primary"
              size="xs"
              trailing-icon="i-lucide-arrow-up-right"
            >
              Launch
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
@use './m-featured-projects';
</style>

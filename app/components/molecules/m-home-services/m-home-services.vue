<script setup lang="ts">
import { useHomeServicesController } from './m-home-services.controller'

const { services, hasServices } = useHomeServicesController()
</script>

<template>
  <section
    v-if="hasServices"
    class="m-home-services pt-2 pb-10 md:pb-14"
    aria-labelledby="home-services-heading"
  >
    <UContainer class="max-w-5xl">
      <div class="flex flex-col gap-1.5 mb-8 text-center md:text-left animate-ios-spring">
        <h2
          id="home-services-heading"
          class="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50"
        >
          What I can help with
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 font-body">
          On-site in Tucson or remote. I take jobs as they come, big or small.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <article
          v-for="(service, idx) in services"
          :key="service.key"
          class="m-home-services__card xo-card-glow xo-shine-on-hover group rounded-2xl p-6 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-3 transition-all duration-300 animate-ios-spring"
          :style="{ '--service-color': service.color, animationDelay: `${180 + idx * 45}ms` }"
        >
          <div class="m-home-services__chip w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <UIcon
              :name="service.icon"
              class="w-5 h-5"
            />
          </div>

          <h3 class="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
            {{ service.title }}
          </h3>
          <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-body">
            {{ service.blurb }}
          </p>

          <ul class="mt-auto pt-1 flex flex-col gap-1.5">
            <li
              v-for="item in service.items"
              :key="item"
              class="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-body"
            >
              <UIcon
                name="i-lucide-check"
                class="m-home-services__check w-4 h-4 mt-0.5 shrink-0"
              />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-home-services';
</style>

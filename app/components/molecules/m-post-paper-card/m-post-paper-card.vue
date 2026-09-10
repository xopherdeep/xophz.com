<script setup lang="ts">
import type { PostPaperCardProps } from './types'
import { usePostPaperCardController } from './m-post-paper-card.controller'

const props = defineProps<PostPaperCardProps>()
const {
  formattedDate,
  folderName,
  hasTitle,
  hasSummary,
  typeLabel,
  typeBadgeClass,
  accentBarClass
} = usePostPaperCardController(props)
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="m-post-paper-card group xo-shine-on-hover"
  >
    <!-- Book Spine Crease -->
    <div class="m-post-paper-card__spine" aria-hidden="true" />

    <!-- Paper Dog-ear Fold -->
    <div class="m-post-paper-card__dogear" aria-hidden="true" />

    <!-- Top Document Accent Line -->
    <div
      class="m-post-paper-card__accent"
      :class="accentBarClass"
      aria-hidden="true"
    />

    <!-- Document Header / Meta -->
    <header class="m-post-paper-card__header">
      <div class="flex items-center gap-2 min-w-0">
        <span
          class="text-[0.65rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border transition-colors shrink-0"
          :class="typeBadgeClass"
        >
          {{ typeLabel }}
        </span>
        <span class="text-[0.7rem] font-mono tracking-wide text-zinc-500 dark:text-zinc-400 uppercase truncate">
          {{ folderName }}
        </span>
      </div>
      <time
        class="text-[0.75rem] font-medium text-zinc-500 dark:text-zinc-400 font-mono shrink-0"
        :datetime="post.date"
      >
        {{ formattedDate }}
      </time>
    </header>

    <!-- Document Page Content (Centered Title Page) -->
    <div class="m-post-paper-card__body">
      <h2
        v-if="hasTitle"
        class="m-post-paper-card__title group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors"
      >
        {{ post.title }}
      </h2>
      <div
        v-if="hasTitle && hasSummary"
        class="m-post-paper-card__divider"
        aria-hidden="true"
      />
      <p
        v-if="hasSummary"
        class="m-post-paper-card__summary"
      >
        {{ post.summary }}
      </p>
    </div>

    <!-- Document Footer / Marginalia -->
    <footer class="m-post-paper-card__footer">
      <span class="m-post-paper-card__footer-action">
        Read Entry
        <UIcon
          name="i-lucide-arrow-up-right"
          class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
      <span class="text-[0.65rem] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        VOL. {{ (index !== undefined ? String(index + 1).padStart(2, '0') : '01') }}
      </span>
    </footer>
  </NuxtLink>
</template>

<style scoped lang="scss">
@use './m-post-paper-card';
</style>

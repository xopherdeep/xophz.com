<script setup lang="ts">
interface Props {
  src: string
  alt: string
  size?: number | string
  loading?: 'eager' | 'lazy'
}

withDefaults(defineProps<Props>(), {
  size: 110,
  loading: 'eager'
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="size"
    :height="size"
    :loading="loading"
    decoding="async"
    class="w-full h-full object-cover"
  />
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  text?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md'
})
</script>

<template>
  <UAvatar
    :src
    :alt
    :size
    :text
  />
</template>

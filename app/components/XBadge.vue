<script setup lang="ts">
import XBadgeAtom from './atoms/XBadge.vue'

interface Props {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

defineProps<Props>()
</script>

<template>
  <XBadgeAtom
    :variant
    :color
    :size
  >
    <template #leading="scope">
      <slot name="leading" v-bind="scope || {}" />
    </template>
    <template #default="scope">
      <slot v-bind="scope || {}" />
    </template>
    <template #trailing="scope">
      <slot name="trailing" v-bind="scope || {}" />
    </template>
  </XBadgeAtom>
</template>

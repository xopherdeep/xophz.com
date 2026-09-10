<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), {
  variant: 'subtle',
  color: 'primary',
  size: 'sm'
})
</script>

<template>
  <UBadge
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
  </UBadge>
</template>

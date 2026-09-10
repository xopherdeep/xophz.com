<script setup lang="ts">
interface Props {
  as?: string
  href?: string
  to?: string
  target?: string
  rel?: string
  interactive?: boolean
  padding?: string
  variant?: 'outline' | 'subtle' | 'soft' | 'solid'
}

withDefaults(defineProps<Props>(), {
  as: 'div',
  interactive: false,
  variant: 'outline'
})
</script>

<template>
  <UCard
    :as
    :to
    :href
    :target
    :rel
    :variant
    :class="[
      interactive ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500/50 cursor-pointer' : '',
      padding
    ]"
  >
    <template #header="scope">
      <slot name="header" v-bind="scope || {}" />
    </template>
    <template #default="scope">
      <slot v-bind="scope || {}" />
    </template>
    <template #footer="scope">
      <slot name="footer" v-bind="scope || {}" />
    </template>
  </UCard>
</template>

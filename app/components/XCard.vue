<script setup lang="ts">
import XCardAtom from './atoms/XCard.vue'

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

defineProps<Props>()
</script>

<template>
  <XCardAtom
    :as
    :href
    :to
    :target
    :rel
    :interactive
    :padding
    :variant
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
  </XCardAtom>
</template>

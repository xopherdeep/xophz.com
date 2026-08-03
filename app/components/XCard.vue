<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  as?: string
  href?: string
  to?: string
  target?: string
  rel?: string
  interactive?: boolean
  padding?: string
  variant?: 'glass' | 'subtle' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  interactive: false,
  padding: 'p-5',
  variant: 'glass'
})

const linkTarget = computed(() => {
  if (props.target) return props.target
  if (props.href?.startsWith('http') || props.to?.startsWith('http')) return '_blank'
  return undefined
})

const linkRel = computed(() => {
  if (props.rel) return props.rel
  if (linkTarget.value === '_blank') return 'noopener noreferrer'
  return undefined
})

const componentTag = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) {
    if (props.href.startsWith('http')) return 'a'
    return 'NuxtLink'
  }
  return props.as
})
</script>

<template>
  <component
    :is="componentTag"
    :to="to || (href && !href.startsWith('http') ? href : undefined)"
    :href="href && href.startsWith('http') ? href : undefined"
    :target="linkTarget"
    :rel="linkRel"
    class="x-card relative flex flex-col rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-glass-shadow no-underline"
    :class="[
      padding,
      variant === 'glass' ? 'bg-white/[0.04] border border-white/[0.07] hover:border-accent/30' : '',
      variant === 'subtle' ? 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12]' : '',
      variant === 'outline' ? 'bg-transparent border border-white/[0.08] hover:border-accent/40' : '',
      interactive || href || to ? 'hover:bg-white/[0.08] hover:-translate-y-0.5 cursor-pointer' : ''
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.x-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
}
</style>

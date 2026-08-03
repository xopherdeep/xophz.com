<script setup lang="ts">
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

withDefaults(defineProps<Props>(), {
  as: 'div',
  interactive: false,
  padding: 'p-5',
  variant: 'glass'
})
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : as"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    class="x-card relative flex flex-col rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-glass-shadow"
    :class="[
      padding,
      variant === 'glass' ? 'bg-white/[0.04] border border-white/[0.07] hover:border-accent/30' : '',
      variant === 'subtle' ? 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12]' : '',
      variant === 'outline' ? 'bg-transparent border border-white/[0.08] hover:border-accent/40' : '',
      interactive ? 'hover:bg-white/[0.08] hover:-translate-y-0.5 cursor-pointer' : ''
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

<script setup lang="ts">
interface Props {
  variant?: 'accent' | 'muted' | 'outline'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'accent',
  size: 'sm'
})
</script>

<template>
  <span
    class="x-badge inline-flex items-center gap-1.5 rounded-full font-medium tracking-[0.06em] whitespace-nowrap transition-all duration-200"
    :class="[
      size === 'sm' ? 'text-[0.62rem] px-2.5 py-1' : 'text-xs px-3 py-1.5',
      variant === 'accent' ? 'bg-accent/10 border border-accent/20 text-accent' : '',
      variant === 'muted' ? 'bg-white/[0.04] border border-white/[0.06] text-text-muted' : '',
      variant === 'outline' ? 'bg-transparent border border-white/[0.08] text-text-secondary' : ''
    ]"
  >
    <slot />
  </span>
</template>

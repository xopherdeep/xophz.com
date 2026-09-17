import { computed } from 'vue'
import type { TimelineStreamProps } from './types'

export function useTimelineStreamController(props: TimelineStreamProps) {
  // 1. Two-Stage Atomic Booleans
  const hasItems = computed(() => props.items.length > 0)
  const isEmpty = computed(() => !hasItems.value)
  const itemCount = computed(() => props.items.length)

  return {
    hasItems,
    isEmpty,
    itemCount
  }
}

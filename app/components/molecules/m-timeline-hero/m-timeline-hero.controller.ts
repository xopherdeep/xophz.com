import { computed } from 'vue'
import type { TimelineHeroProps, TimelineHeroStat } from './types'

export function useTimelineHeroController(props: TimelineHeroProps) {
  // 1. Reactive Primitives & Computeds
  const heroStats = computed<TimelineHeroStat[]>(() => [
    {
      label: 'Career Span',
      value: `${props.totalYears ?? 24}+ Years`,
      subtitle: '2002 - Present'
    },
    {
      label: 'Verified Positions',
      value: `${props.totalRoles ?? 17} Roles`,
      subtitle: 'Corporate & Founding'
    },
    {
      label: 'Active Ventures',
      value: `${props.activeVentures ?? 3} Active`,
      subtitle: 'Concurrent Leadership'
    }
  ])

  // 2. Two-Stage Atomic Booleans
  const hasValidStats = computed(() => heroStats.value.length > 0)
  const canRenderHero = computed(() => hasValidStats.value)

  return {
    heroStats,
    canRenderHero
  }
}

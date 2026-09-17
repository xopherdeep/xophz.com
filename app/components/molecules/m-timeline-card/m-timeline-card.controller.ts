import { computed } from 'vue'
import type { TimelineCardProps } from './types'

export function useTimelineCardController(props: TimelineCardProps) {
  // 1. Computeds & Initials
  const companyInitials = computed(() => {
    const parts = props.item.company.split(' ')
    if (parts.length > 1 && parts[0] && parts[1]) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return props.item.company.slice(0, 2).toUpperCase()
  })

  // 2. Two-Stage Atomic Booleans
  const hasCompanyLogo = computed(() => Boolean(props.item.logoUrl))
  const isCurrentRole = computed(() => Boolean(props.item.isCurrent))
  const hasSkills = computed(() => props.item.skills.length > 0)
  const canDisplayLink = computed(() => Boolean(props.item.url))

  return {
    companyInitials,
    hasCompanyLogo,
    isCurrentRole,
    hasSkills,
    canDisplayLink
  }
}

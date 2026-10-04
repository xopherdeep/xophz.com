import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { EnterprisePlatform } from './types'

const PLATFORM_LIMIT = 4

export function useHomeEnterpriseController() {
  // 1. Composables & Stores
  const { projects } = useProfileData()

  // 2. Computed State & 2-Stage Booleans
  const platforms = computed<EnterprisePlatform[]>(() =>
    projects
      .filter(p => p.tier === 'engineering')
      .slice(0, PLATFORM_LIMIT)
      .map(p => ({
        key: p.key,
        name: p.name,
        url: p.url,
        color: p.color
      }))
  )

  const hasPlatforms = computed(() => platforms.value.length > 0)

  return {
    platforms,
    hasPlatforms
  }
}

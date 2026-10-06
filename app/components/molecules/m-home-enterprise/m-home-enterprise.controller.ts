import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import { PORTAL_PROJECT_KEYS } from '~/data/portalCatalog'
import type { EnterprisePlatform } from './types'

const PLATFORM_LIMIT = 6

export function useHomeEnterpriseController() {
  // 1. Composables & Stores
  const { projects } = useProfileData()

  // 2. Computed State & 2-Stage Booleans
  // The portal tiles above already carry four ventures; show the rest here
  // so the page reads as depth rather than repetition.
  const platforms = computed<EnterprisePlatform[]>(() =>
    projects
      .filter(p => p.tier === 'engineering' && !PORTAL_PROJECT_KEYS.includes(p.key))
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

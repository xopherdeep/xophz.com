import { computed } from 'vue'
import { portals } from '~/data/portalCatalog'
import type { HomePortalItem } from './types'

export function useHomePortalsController() {
  // 1. Reactive Primitives
  const portalList = portals as readonly HomePortalItem[]

  // 2. Computed State & 2-Stage Booleans
  const hasPortals = computed(() => portalList.length > 0)

  return {
    portalList,
    hasPortals
  }
}

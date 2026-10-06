import { computed } from 'vue'
import { advisoryServices } from '~/data/advisoryCatalog'
import type { HomeServiceItem } from './types'

export function useHomeServicesController() {
  // 1. Reactive Primitives
  const services = advisoryServices as readonly HomeServiceItem[]

  // 2. Computed State & 2-Stage Booleans
  const hasServices = computed(() => services.length > 0)

  return {
    services,
    hasServices
  }
}

import { computed } from 'vue'
import { workServices } from '~/data/workCatalog'
import type { HomeServiceItem } from './types'

export function useHomeServicesController() {
  // 1. Reactive Primitives
  const services = workServices as readonly HomeServiceItem[]

  // 2. Computed State & 2-Stage Booleans
  const hasServices = computed(() => services.length > 0)

  return {
    services,
    hasServices
  }
}

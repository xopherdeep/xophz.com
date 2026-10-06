import { computed } from 'vue'
import { advisorySteps } from '~/data/advisoryCatalog'
import type { HomeStepItem } from './types'

export function useHomeStepsController() {
  // 1. Reactive Primitives
  const steps = advisorySteps as readonly HomeStepItem[]

  // 2. Computed State & 2-Stage Booleans
  const hasSteps = computed(() => steps.length > 0)

  return {
    steps,
    hasSteps
  }
}

import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { FeatureStat } from './types'

export function useFeatureStripController() {
  const { stats } = useProfileData()

  const featureStats = computed<FeatureStat[]>(() =>
    stats.map(s => ({
      value: s.value,
      label: s.label,
      desc: 'Architectural Domain'
    }))
  )

  const hasStats = computed(() => featureStats.value.length > 0)

  return {
    featureStats,
    hasStats
  }
}

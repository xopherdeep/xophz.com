import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { SpecialtyItem } from './types'

export function useAboutSpecialtiesController() {
  const { specialties } = useProfileData()

  const specialtyItems = computed<SpecialtyItem[]>(() =>
    specialties.map(item => ({
      title: item.title,
      desc: item.desc,
      icon: item.icon
    }))
  )

  const hasSpecialties = computed(() => specialtyItems.value.length > 0)

  return {
    specialtyItems,
    hasSpecialties
  }
}

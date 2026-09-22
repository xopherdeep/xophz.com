import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { PersonaItem } from './types'

export function useAboutPersonasController() {
  const { executivePersonas, creativePersonas, personas } = useProfileData()

  const executiveList = computed<PersonaItem[]>(() => executivePersonas)
  const creativeList = computed<PersonaItem[]>(() => creativePersonas)
  const personaItems = computed<PersonaItem[]>(() => personas)
  const hasPersonas = computed(() => personaItems.value.length > 0)
  const hasExecutive = computed(() => executiveList.value.length > 0)
  const hasCreative = computed(() => creativeList.value.length > 0)

  return {
    personaItems,
    executiveList,
    creativeList,
    hasPersonas,
    hasExecutive,
    hasCreative
  }
}

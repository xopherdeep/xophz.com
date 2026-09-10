import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { PersonaItem } from './types'

export function useAboutPersonasController() {
  const { personas } = useProfileData()

  const personaItems = computed<PersonaItem[]>(() => personas)
  const hasPersonas = computed(() => personaItems.value.length > 0)

  return {
    personaItems,
    hasPersonas
  }
}

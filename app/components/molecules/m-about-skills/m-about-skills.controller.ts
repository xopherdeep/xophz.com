import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { SkillGroup } from './types'

export function useAboutSkillsController() {
  const { skills } = useProfileData()

  const skillGroups = computed<SkillGroup[]>(() => skills)
  const hasSkills = computed(() => skillGroups.value.length > 0)

  return {
    skillGroups,
    hasSkills
  }
}

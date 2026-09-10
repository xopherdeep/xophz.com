import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { AboutIdentity } from './types'

export function useAboutHeroController() {
  const { identity } = useProfileData()

  const profile = computed<AboutIdentity>(() => ({
    name: identity.name,
    title: identity.title,
    headshot: identity.headshot,
    location: 'Sonoran Desert / Global'
  }))

  const hasIdentity = computed(() => Boolean(profile.value.name))

  return {
    profile,
    hasIdentity
  }
}

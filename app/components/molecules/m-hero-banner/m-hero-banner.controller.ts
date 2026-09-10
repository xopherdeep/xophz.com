import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import type { HeroProfile } from './types'

export function useHeroBannerController() {
  // 1. Composables & Stores
  const { identity, skillTags } = useProfileData()

  // 2. Computed State & 2-Stage Booleans
  const profile = computed<HeroProfile>(() => ({
    name: identity.name,
    title: identity.title,
    tagline: identity.tagline,
    avatar: identity.avatar,
    skillTags
  }))

  const hasTags = computed(() => profile.value.skillTags.length > 0)
  const isProfileComplete = computed(() => Boolean(profile.value.name && profile.value.title))
  const canDisplayHero = computed(() => isProfileComplete.value && hasTags.value)

  return {
    profile,
    hasTags,
    canDisplayHero
  }
}

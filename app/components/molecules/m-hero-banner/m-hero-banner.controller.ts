import { computed } from 'vue'
import { useProfileData } from '~/composables/useProfileData'
import { BOOKING_URL } from '~/data/workCatalog'
import type { HeroProfile } from './types'

export function useHeroBannerController() {
  // 1. Composables & Stores
  const { identity, heroTags } = useProfileData()

  // 2. Reactive Primitives
  const bookingUrl = BOOKING_URL

  // 3. Computed State & 2-Stage Booleans
  const profile = computed<HeroProfile>(() => ({
    name: identity.name,
    title: identity.title,
    tagline: identity.tagline,
    origin: identity.origin,
    avatar: identity.avatar,
    tags: heroTags
  }))

  const hasTags = computed(() => profile.value.tags.length > 0)
  const isProfileComplete = computed(() => Boolean(profile.value.name && profile.value.title))
  const canDisplayHero = computed(() => isProfileComplete.value && hasTags.value)

  return {
    profile,
    canDisplayHero,
    bookingUrl
  }
}
